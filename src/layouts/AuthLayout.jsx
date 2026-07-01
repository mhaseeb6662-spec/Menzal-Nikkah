import { Link } from "react-router-dom";
import { Heart, ShieldCheck, Lock, Users } from "lucide-react";

const points = [
  { icon: ShieldCheck, text: "Every profile manually verified by our admin team" },
  { icon: Lock, text: "Phone numbers & hidden photos stay private" },
  { icon: Users, text: "Trusted by 1,200+ serious families across Pakistan" },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-blush-50">
      {/* Left / brand panel */}
      <div className="hidden lg:flex relative flex-col justify-between bg-ink-900 p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(196,64,107,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(184,146,74,0.25), transparent 50%)",
          }}
        />
        <svg className="absolute -right-24 top-1/3 w-[420px] h-[420px] opacity-[0.08]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="95" fill="none" stroke="#B8924A" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#B8924A" strokeWidth="1" />
        </svg>
        <Link to="/" className="relative flex items-center gap-2 z-10">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon-500 to-rose-500 flex items-center justify-center text-white">
            <Heart size={16} fill="white" />
          </span>
          <span className="font-display text-2xl font-bold text-white">Nikah Manzil</span>
        </Link>
        <div className="relative z-10">
          <h2 className="font-display text-4xl font-semibold text-white leading-tight mb-6">
            Trusted Matrimonial Platform For Serious Families
          </h2>
          <div className="space-y-4">
            {points.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gold-400 shrink-0">
                  <Icon size={16} />
                </span>
                <p className="text-white/80 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-white/40 text-xs">
          © {new Date().getFullYear()} Nikah Manzil. All rights reserved.
        </p>
      </div>
      {/* Right / form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <span className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon-500 to-rose-500 flex items-center justify-center text-white">
              <Heart size={16} fill="white" />
            </span>
            <span className="font-display text-2xl font-bold text-ink-900">Nikah Manzil</span>
          </Link>
          <h1 className="font-display text-3xl font-semibold text-ink-900 mb-2">{title}</h1>
          {subtitle && <p className="text-ink-600 text-sm mb-8">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
