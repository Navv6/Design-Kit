import type { ReactNode } from "react";
import "./feed.css";

export default function FeedLayout({ children }: { children: ReactNode }) {
  return <div className="atlas-catalog atlas-feed-content">{children}</div>;
}
