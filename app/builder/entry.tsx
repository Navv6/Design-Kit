"use client";

import { useSearchParams } from "next/navigation";
import { ComposerBuilder } from "@/components/composer/builder";
import { COMPOSITION_SAMPLES } from "@/data/composition-samples";
import { BLOCK_LIBRARY } from "@/data/composer";

export function BuilderEntry() {
  const query = useSearchParams();
  const sample = COMPOSITION_SAMPLES.find(item => item.id === query.get("sample"));
  const incomingBlock = BLOCK_LIBRARY.find(block => block.id === query.get("add"))?.id;
  return <ComposerBuilder key={sample?.id ?? "workspace"} sample={sample} incomingBlock={incomingBlock} />;
}
