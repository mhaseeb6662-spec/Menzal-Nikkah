import { Check } from "lucide-react";

export default function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto mb-10 overflow-x-auto scrollbar-thin pb-2">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex items-center flex-1 min-w-[90px]">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 transition-colors ${
                  done
                    ? "bg-maroon-500 border-maroon-500 text-white"
                    : active
                    ? "border-maroon-500 text-maroon-500 bg-white"
                    : "border-ink-900/15 text-ink-400 bg-white"
                }`}
              >
                {done ? <Check size={16} /> : idx}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap ${
                  active || done ? "text-ink-900" : "text-ink-400"
                }`}
              >
                {label}
              </span>
            </div>
            {idx !== steps.length && (
              <div className={`h-0.5 flex-1 mx-1 mb-5 ${done ? "bg-maroon-500" : "bg-ink-900/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
