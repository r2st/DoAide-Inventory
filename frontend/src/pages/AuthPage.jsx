import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await register({ email, password, full_name: fullName, business_name: businessName });
      } else {
        await login(email, password);
      }
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg-secondary)" }}>
      <div className="w-full max-w-md p-8 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">I</div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{isRegister ? "Create Account" : "Welcome Back"}</h1>
        </div>

        {error && <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: "var(--danger)", color: "white" }}>{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
              <input type="text" placeholder="Business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
            </>
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }} />
          <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg bg-accent-600 text-white font-medium text-sm hover:bg-accent-700 transition-colors disabled:opacity-50">
            {loading ? "..." : isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => { setIsRegister(!isRegister); setError(""); }} className="font-medium text-accent-600">{isRegister ? "Sign in" : "Create one"}</button>
        </p>
      </div>
    </div>
  );
}
