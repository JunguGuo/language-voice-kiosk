import { Page } from "../components/Page";
import { SCENARIO_GROUPS } from "../lib/data";
import { useNavigate } from "react-router-dom";

export default function Scenarios() {
  const nav = useNavigate();

  return (
    <Page>
      <div className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Consistent page title */}
          <header className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Choose a scene
            </h2>
            <p className="text-sm text-neutral-400">
              Pick a prompt to hear your AI voice in context.
            </p>
          </header>

          {SCENARIO_GROUPS.map((group) => (
            <section key={group.title} className="space-y-4">
              {/* Group subtitle (matches other screens’ hierarchy) */}
              <h3 className="text-lg text-neutral-300">{group.title}</h3>

              {/* Consistent grid with fixed-height cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => nav("/scenario?key=" + item.key)}
                    className="card group text-left hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 h-28 w-full"
                    aria-label={`Choose scene: ${item.label}`}
                  >
                    <div className="flex h-full items-center justify-between">
                      <div className="text-lg font-medium">{item.label}</div>
                      <span className="opacity-50 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Page>
  );
}
