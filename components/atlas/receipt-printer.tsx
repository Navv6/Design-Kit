"use client";

import { useEffect, useRef, useState } from "react";
import "./riff-interactions.css";

export function ReceiptPrinter({ items = ["필터 커피 · 5,000원", "버터 쿠키 · 3,000원"], total = "8,000원", onConfirm }: {
  items?: readonly string[];
  total?: string;
  onConfirm?: () => Promise<void>;
}) {
  const [phase, setPhase] = useState<"idle" | "printing" | "done" | "error">("idle");
  const attempt = useRef(0);
  useEffect(() => {
    return () => { attempt.current += 1; };
  }, []);
  async function confirm() {
    if (phase === "done") { setPhase("idle"); return; }
    const id = ++attempt.current;
    setPhase("printing");
    try {
      if (onConfirm) await onConfirm();
      else await new Promise<void>(resolve => window.setTimeout(resolve, 700));
      if (id === attempt.current) setPhase("done");
    } catch {
      if (id === attempt.current) setPhase("error");
    }
  }
  return <div className="riff-sample sample-checkout">
    <div className="sample-device"><strong>주문 내역</strong><span>{total}</span></div>
    <div className="sample-paper-slot">
      {phase === "done" && <div className="sample-paper"><strong>결제 완료</strong><ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul><b>합계 {total}</b></div>}
    </div>
    <p role="status">{{ printing: "영수증을 준비하고 있습니다.", done: "영수증이 발행되었습니다.", error: "요청에 실패했습니다. 다시 시도하세요.", idle: onConfirm ? "주문을 확인하세요." : "테스트 결제" }[phase]}</p>
    <button type="button" disabled={phase === "printing"} onClick={() => void confirm()}>
      {phase === "done" ? "초기화" : phase === "error" ? "다시 시도" : onConfirm ? "주문 확인" : "결제 테스트"}
    </button>
  </div>;
}
