import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/Button";
import { Field, Input, Select } from "../components/FormFields";

const relations = ["Self", "Son", "Daughter", "Brother", "Sister", "Relative", "Friend"];

export default function Register() {
  const [step, setStep] = useState(1); // 1 = form, 2 = otp
  const navigate = useNavigate();

  return (
    <AuthLayout
      title={step === 1 ? "Create Your Account" : "Verify Your Email"}
      subtitle={
        step === 1
          ? "Begin your registration — it only takes a couple of minutes."
          : "We've sent a 6-digit verification code to your email address."
      }
    >
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <Field label="Full Name">
            <Input placeholder="Enter your full name" required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Gender">
              <Select defaultValue="">
                <option value="" disabled>Select</option>
                <option>Male</option>
                <option>Female</option>
              </Select>
            </Field>
            <Field label="Creating Profile For">
              <Select defaultValue="">
                <option value="" disabled>Select</option>
                {relations.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Email Address">
            <Input type="email" placeholder="you@example.com" required />
          </Field>
          <Field label="Phone Number">
            <Input type="tel" placeholder="03XX-XXXXXXX" required />
          </Field>
          <Field label="Country">
            <Select defaultValue="Pakistan">
              <option>Pakistan</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Saudi Arabia</option>
              <option>United Arab Emirates</option>
              <option>Other</option>
            </Select>
          </Field>
          <Field label="Username">
            <Input placeholder="Choose a username" required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Password">
              <Input type="password" placeholder="••••••••" required />
            </Field>
            <Field label="Confirm Password">
              <Input type="password" placeholder="••••••••" required />
            </Field>
          </div>

          <label className="flex items-start gap-2 text-xs text-ink-600 mb-6 mt-1">
            <input type="checkbox" required className="mt-0.5 rounded border-ink-900/20 text-maroon-500 focus:ring-maroon-500/40" />
            I agree to the{" "}
            <a href="/terms" className="text-maroon-500 font-semibold hover:underline">Terms & Conditions</a> and{" "}
            <a href="/privacy-policy" className="text-maroon-500 font-semibold hover:underline">Privacy Policy</a>.
          </label>

          <Button type="submit" className="w-full">Create Account</Button>

          <p className="text-center text-sm text-ink-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-maroon-500 font-semibold hover:underline">Login</a>
          </p>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/profile-setup");
          }}
        >
          <div className="flex gap-2 mb-6 justify-between">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                maxLength={1}
                autoFocus={i === 0}
                className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl border border-ink-900/10 bg-white focus:outline-none focus:ring-2 focus:ring-maroon-500/40 focus:border-maroon-500"
              />
            ))}
          </div>
          <Button type="submit" className="w-full">
            <CheckCircle2 size={16} /> Verify & Continue
          </Button>
          <p className="text-center text-sm text-ink-600 mt-6">
            Didn't receive the code?{" "}
            <button type="button" className="text-maroon-500 font-semibold hover:underline">
              Resend OTP
            </button>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
