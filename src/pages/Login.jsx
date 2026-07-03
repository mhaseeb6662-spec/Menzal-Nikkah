import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/Button";
import { Field, Input } from "../components/FormFields";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [asAdmin, setAsAdmin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, asAdmin });
    navigate(asAdmin ? "/admin" : "/dashboard");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to manage your profile and view your matches."
    >
      <form onSubmit={handleSubmit}>
        <Field label="Email or Username">
          <Input
            type="text"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="••••••••" required />
        </Field>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 text-sm text-ink-600">
            <input type="checkbox" className="rounded border-ink-900/20 text-maroon-500 focus:ring-maroon-500/40" />
            Remember me
          </label>
          <a href="#" className="text-sm font-semibold text-maroon-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <label className="flex items-center gap-2 text-xs text-ink-500 mb-4 bg-blush-100 rounded-lg px-3 py-2.5">
          <input
            type="checkbox"
            checked={asAdmin}
            onChange={(e) => setAsAdmin(e.target.checked)}
            className="rounded border-ink-900/20 text-maroon-500 focus:ring-maroon-500/40"
          />
          Login as Admin (demo)
        </label>

        <Button type="submit" className="w-full">
          <LogIn size={16} /> Login
        </Button>

        <p className="text-center text-sm text-ink-600 mt-5">
          Don't have an account?{" "}
          <a href="/register" className="text-maroon-500 font-semibold hover:underline">Register</a>
        </p>
      </form>
    </AuthLayout>
  );
}
