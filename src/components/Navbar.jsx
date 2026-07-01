import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X, LayoutDashboard } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/active-profiles", label: "Active Profiles" },
  { to: "/search", label: "Search" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon-500 to-rose-500 flex items-center justify-center text-white">
            <Heart size={16} fill="white" />
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold text-ink-900">Nikah Manzil</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-maroon-500 bg-maroon-500/10"
                    : "text-ink-600 hover:text-maroon-500 hover:bg-blush-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <Button to={user.role === "admin" ? "/admin" : "/dashboard"} variant="outline" size="sm">
              <LayoutDashboard size={16} /> Dashboard
            </Button>
          ) : (
            <>
              <Button to="/login" variant="ghost" size="sm">Login</Button>
              <Button to="/register" size="sm">Register Now</Button>
            </>
          )}
        </div>

        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-ink-900"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-ink-900/5 bg-white px-4 py-4">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive ? "text-maroon-500 bg-maroon-500/10" : "text-ink-700"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-ink-900/5">
            {user ? (
              <Button to={user.role === "admin" ? "/admin" : "/dashboard"} variant="outline" className="w-full">
                <LayoutDashboard size={16} /> Dashboard
              </Button>
            ) : (
              <>
                <Button to="/login" variant="outline" className="w-full">Login</Button>
                <Button to="/register" className="w-full">Register Now</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
