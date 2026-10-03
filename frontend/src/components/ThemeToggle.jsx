import { useTheme } from "../hooks/useTheme";

const MODES = ["light", "system", "dark"];

export default function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ background: "var(--bg-tertiary)" }}>
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`px-2 py-1 text-xs rounded-md capitalize transition-colors ${
            mode === m ? "bg-accent-600 text-white" : ""
          }`}
          style={mode === m ? {} : { color: "var(--text-secondary)" }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
