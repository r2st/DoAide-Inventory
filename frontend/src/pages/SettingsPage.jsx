import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "../components/ThemeToggle";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Settings</h1>

      <div className="space-y-6 max-w-2xl">
        <div className="p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Profile</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "var(--text-secondary)" }}>Email</span>
              <span style={{ color: "var(--text-primary)" }}>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-secondary)" }}>Name</span>
              <span style={{ color: "var(--text-primary)" }}>{user?.full_name || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-secondary)" }}>Role</span>
              <span className="capitalize" style={{ color: "var(--text-primary)" }}>{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Business</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "var(--text-secondary)" }}>Business Name</span>
              <span style={{ color: "var(--text-primary)" }}>{user?.business?.name}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-secondary)" }}>Plan</span>
              <span className="capitalize" style={{ color: "var(--text-primary)" }}>{user?.business?.plan}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-secondary)" }}>GSTIN</span>
              <span className="font-mono" style={{ color: "var(--text-primary)" }}>{user?.business?.gstin || "-"}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Appearance</h2>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
