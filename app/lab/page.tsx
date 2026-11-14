import { DesignLab } from "./design-lab";
import "./lab.css";

export const metadata = { title: "컬러·타입 실험실 · Design Atlas" };

export default function LabPage() {
  return <section className="atlas-catalog">
    <header className="atlas-catalog-intro">
      <h1>컬러·타입 실험실</h1>
      <p>색 조합과 글꼴을 고르고 미리보기에서 가독성을 확인하세요.</p>
    </header>
    <DesignLab />
  </section>;
}
