/** LAY-001: responsive information hierarchy. */
export function BentoGrid() {
  return (
    <div className="atlas-bento">
      <div className="atlas-bento-main">
        <small>01 / FEATURED PROJECT</small>
        <strong>DeepVi</strong>
        <span>LLM + RAG financial intelligence</span>
        <span className="atlas-pill">AI APPLICATION ↗</span>
      </div>
      <div className="atlas-bento-small">
        <small>02 / STACK</small>
        <strong>Next.js</strong>
        <span>FastAPI · Pinecone</span>
      </div>
      <div className="atlas-bento-small atlas-bento-violet">
        <small>03 / PROCESS</small>
        <strong>Build → Test</strong>
        <span>Ship, learn, refine</span>
      </div>
    </div>
  );
}
