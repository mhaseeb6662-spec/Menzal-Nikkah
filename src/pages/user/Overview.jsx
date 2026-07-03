import { useState } from "react";
import {
  MessageCircle, UserCog, MapPin, GraduationCap, Briefcase, Ruler,
  Calendar, Users, BadgeCheck, ListChecks, Info,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getProfileById } from "../../data/profiles";
import Button from "../../components/Button";

export default function Overview() {
  const { user } = useAuth();
  const profile = getProfileById(user?.profileId) ?? getProfileById("MAT-10001");
  const [tab, setTab] = useState("details");

  const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(
    `Assalam-o-Alaikum, I need help regarding my profile ${profile.id} — ${profile.name}.`
  )}`;

  const details = [
    { icon: Calendar, label: "Age", value: `${profile.age} Years` },
    { icon: Ruler, label: "Height", value: profile.height },
    { icon: Users, label: "Marital Status", value: profile.maritalStatus },
    { icon: MapPin, label: "City", value: `${profile.city}, ${profile.country}` },
    { icon: GraduationCap, label: "Education", value: profile.education },
    { icon: Briefcase, label: "Profession", value: profile.profession },
  ];

  return (
    <div className="lg:h-[calc(100vh-9rem)] lg:flex lg:flex-col">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900 mb-1 shrink-0">My Profile</h1>
      <p className="text-ink-600 text-sm mb-6 shrink-0">Your profile information as visible on Nikah Manzil.</p>

      <div className="grid lg:grid-cols-3 gap-6 lg:flex-1 lg:min-h-0">
        {/* Left: photo, identity, quick actions */}
        <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 flex flex-col items-center text-center lg:items-start lg:text-left">
          <img src={profile.photo} alt={profile.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover" />
          <div className="flex items-center gap-2 mt-4 justify-center lg:justify-start">
            <h2 className="font-display text-xl font-semibold text-ink-900">{profile.name}</h2>
            {profile.verified && <BadgeCheck size={18} className="text-gold-600 shrink-0" />}
          </div>
          <p className="text-ink-600 text-xs mt-1.5 flex items-center gap-1.5 justify-center lg:justify-start">
            <BadgeCheck size={13} className="text-maroon-500" /> {profile.id}
          </p>
          <p className="text-ink-600 text-xs mt-1 flex items-center gap-1.5 justify-center lg:justify-start">
            <MapPin size={13} className="text-maroon-500" /> {profile.city}, {profile.country}
          </p>
          <div className="flex flex-col gap-2.5 mt-6 w-full">
            <Button href={waLink} target="_blank" rel="noreferrer" variant="primary" size="sm" className="w-full">
              <MessageCircle size={15} /> Contact On WhatsApp
            </Button>
            <Button to="/dashboard/edit-profile" variant="outline" size="sm" className="w-full">
              <UserCog size={15} /> Edit Profile
            </Button>
          </div>
        </div>

        {/* Right: tabbed details / about — no scrolling needed to see everything */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 flex flex-col lg:min-h-0">
          <div className="flex gap-1 border-b border-ink-900/10 mb-5 shrink-0">
            <TabButton icon={ListChecks} label="Profile Details" active={tab === "details"} onClick={() => setTab("details")} />
            <TabButton icon={Info} label="About" active={tab === "about"} onClick={() => setTab("about")} />
          </div>

          {tab === "details" ? (
            <div className="grid sm:grid-cols-2 gap-5 content-start">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-maroon-500/10 text-maroon-500 flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-ink-600">{label}</p>
                    <p className="text-sm font-semibold text-ink-900 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="lg:overflow-y-auto lg:min-h-0">
              <p className="text-ink-600 text-sm leading-relaxed">{profile.about}</p>
              <div className="mt-4 pt-4 border-t border-ink-900/10">
                <p className="text-xs font-bold uppercase tracking-wide text-rose-500 mb-1.5">
                  Expectations From Partner
                </p>
                <p className="text-ink-600 text-sm leading-relaxed">{profile.expectations}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
        active
          ? "border-maroon-500 text-maroon-500"
          : "border-transparent text-ink-400 hover:text-ink-900"
      }`}
    >
      <Icon size={15} /> {label}
    </button>
  );
}
