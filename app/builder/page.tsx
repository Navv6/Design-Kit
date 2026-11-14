import { ComposerBuilder } from '@/components/composer/builder';
import { COMPOSITION_SAMPLES } from '@/data/composition-samples';
import { BLOCK_LIBRARY } from '@/data/composer';

export const metadata={title:'Page Composer · NAVV6 Design Atlas'};
export default async function BuilderPage({ searchParams }: { searchParams: Promise<{ sample?: string | string[]; add?: string | string[] }> }) {
  const { sample: sampleId, add } = await searchParams;
  const sample = COMPOSITION_SAMPLES.find(item => item.id === sampleId);
  const incomingBlock = BLOCK_LIBRARY.find(block => block.id === add)?.id;
  return <ComposerBuilder key={sample?.id ?? 'workspace'} sample={sample} incomingBlock={incomingBlock} />;
}
