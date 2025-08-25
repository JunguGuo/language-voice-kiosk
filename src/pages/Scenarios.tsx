import { Page } from "../components/Page";
import { LANGUAGE_GROUPS } from "../lib/data";
import { useApp } from "../store/app";
import { useNavigate } from "react-router-dom";

export default function Scenarios() {
  const nav = useNavigate();
  const { languageCode } = useApp();

  // Find the selected language group; fall back to the first group if not found
  const group =
    LANGUAGE_GROUPS.find((g) => g.code === languageCode) ?? LANGUAGE_GROUPS[0];

  // If your data might be empty, guard it:
  if (!group) {
    return (
      <Page>
        <div className="min-h-screen p-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Choose a scene
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              No languages available. Please add a language first.
            </p>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="min-h-screen p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Page title */}
          <header className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Choose a scene
            </h2>
            <p className="text-sm text-neutral-400">
              Pick a prompt to hear your AI voice in context.
            </p>
          </header>

          <section key={group.code} className="space-y-4">
            {/* Group subtitle */}
            <h3 className="text-lg text-neutral-300">{group.title}</h3>

            {/* Scenarios */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <button
                  key={item.key}
                  onClick={() =>
                    nav(`/scenario?lang=${group.code}&key=${item.key}`)
                  }
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
        </div>
      </div>
    </Page>
  );
}
