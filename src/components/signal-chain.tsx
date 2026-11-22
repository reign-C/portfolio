import type { ChainStep } from "@/lib/content";

type SignalChainProps = {
  steps: ChainStep[];
  label: string;
  pulse?: boolean;
};

export function SignalChain({ steps, label, pulse = false }: SignalChainProps) {
  return (
    <ol className="chain" aria-label={label}>
      {steps.map((step, index) => (
        <li key={`${step.kicker}-${step.title}`} className="chain-step">
          <div className="chain-node">
            <span className="chain-kicker">{step.kicker}</span>
            <span className="chain-title">{step.title}</span>
            <span className="chain-meta">{step.meta}</span>
            {step.via ? <span className="chain-proto">{step.via}</span> : null}
            {pulse && index === 0 ? (
              <span className="chain-pulse" aria-hidden="true" />
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
