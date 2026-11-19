"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import "./otp-verify.css";

export function OtpVerify({ verifyCode, onVerified }: {
  verifyCode?: (code: string) => Promise<boolean>;
  onVerified?: (code: string) => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [status, setStatus] = useState<"idle" | "pending" | "invalid" | "error" | "success">("idle");
  const fields = useRef<(HTMLInputElement | null)[]>([]);
  const busy = useRef(false);
  const messageId = useId();

  function fill(value: string, index: number) {
    const numbers = value.replace(/\D/g, "").slice(0, 6 - index);
    setStatus("idle");
    setDigits(previous => {
      const next = [...previous];
      if (!numbers) next[index] = "";
      for (let offset = 0; offset < numbers.length; offset += 1) next[index + offset] = numbers[offset];
      return next;
    });
    fields.current[Math.min(5, index + numbers.length)]?.focus();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy.current || digits.some(digit => !digit)) return;
    busy.current = true;
    setStatus("pending");
    const code = digits.join("");
    try {
      const valid = verifyCode ? await verifyCode(code) : code === "123456";
      setStatus(valid ? "success" : "invalid");
      if (valid) onVerified?.(code);
      else { fields.current[0]?.focus(); fields.current[0]?.select(); }
    } catch { setStatus("error"); }
    finally { busy.current = false; }
  }

  const locked = status === "pending" || status === "success";
  return <form className="otp-demo" onSubmit={event => void submit(event)} aria-label="인증번호 확인">
    <h3>확인 코드를 입력하세요</h3>
    <p>{verifyCode ? "전달받은 여섯 자리 숫자를 입력하세요." : "데모 코드 123456 · 다른 번호를 입력하면 오류 반응을 볼 수 있습니다."}</p>
    <div className="otp-fields" data-status={status}>
      {digits.map((digit, index) => <input key={index} ref={node => { fields.current[index] = node; }}
        aria-label={`인증번호 ${index + 1}번째 자리`} aria-invalid={status === "invalid"}
        aria-describedby={messageId} value={digit} inputMode="numeric" pattern="[0-9]*"
        autoComplete={index === 0 ? "one-time-code" : "off"} readOnly={locked}
        onFocus={event => event.currentTarget.select()}
        onChange={event => fill(event.target.value, index)}
        onPaste={event => { if (locked) return; event.preventDefault(); fill(event.clipboardData.getData("text"), index); }}
        onKeyDown={event => {
          if (locked) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            fields.current[Math.max(0, Math.min(5, index + (event.key === "ArrowLeft" ? -1 : 1)))]?.focus();
          }
          if (event.key === "Backspace" && !digits[index] && index > 0) {
            event.preventDefault();
            setDigits(previous => previous.map((value, i) => i === index - 1 ? "" : value));
            setStatus("idle"); fields.current[index - 1]?.focus();
          }
        }} />)}
    </div>
    <p id={messageId} role="status">{{
      idle: "코드를 입력한 뒤 확인을 누르세요.", pending: "확인 중입니다.",
      invalid: "코드가 일치하지 않습니다. 다시 입력하세요.", error: "확인에 실패했습니다. 다시 시도하세요.",
      success: "인증이 완료되었습니다.",
    }[status]}</p>
    <div className="otp-actions">
      <button type="submit" disabled={locked || digits.some(digit => !digit)}>확인</button>
      <button type="button" disabled={status === "pending"} onClick={() => {
        setDigits(Array(6).fill("")); setStatus("idle"); fields.current[0]?.focus();
      }}>다시 입력</button>
    </div>
  </form>;
}
