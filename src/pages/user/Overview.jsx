import { Eye, MessageSquare, Heart, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getProfileById } from "../../data/profiles";
import VerifiedBadge from "../../components/VerifiedBadge";
import Button from "../../components/Button";

export default function Overview() {
  const { user } = useAuth();
  const profile = getProfileById(user?.profileId) ?? getProfileById("MAT-10001");
  const stats = [
    { icon: Eye, label: "Profile Views", value: 214 },
    { icon: MessageSquare, label: "Contact Requests", value: 6 },
    { icon: Heart, label: "Interests Received", value: 12 },
  ];
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">
            Welcome back, {profile.name.split(" ")[0]}
          </h1>
          <p className="text-ink-600 text-sm mt-1">Here's what's happening with your profile.</p>
        </div>
        <Button to={`/profile/${profile.id}`} variant="outline">View Public Profile</Button>
      </div>
      <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-2xl object-cover" />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <h2 className="font-display text-xl font-semibold text-ink-900">{profile.name}</h2>
            {profile.verified && <VerifiedBadge />}
          </div>
          <p className="text-ink-600 text-sm mt-1">{profile.id} • {profile.city}, {profile.country}</p>
        </div>
        <div className="w-full sm:w-48">
          <div className="flex justify-between text-xs text-ink-600 mb-1.5">
            <span>Profile Completion</span>
            <span className="font-semibold">85%</span>
          </div>
          <div className="h-2 bg-blush-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-maroon-500 to-rose-500 rounded-full" style={{ width: "85%" }} />
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-maroon-500/10 text-maroon-500 flex items-center justify-center shrink-0">
              <Icon size={20} />
            </span>
            <div>
              <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
              <p className="text-xs text-ink-600">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-br from-maroon-500 to-rose-600 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <ShieldCheck size={28} className="text-gold-300 shrink-0" />
          <div>
            <p className="font-display text-lg font-semibold">
              {profile.verified ? "Your profile is fully verified" : "Your profile is pending verification"}
            </p>
            <p className="text-white/80 text-sm">
              {profile.verified
                ? "Members can now view and contact you."
                : "Complete payment to get your verified badge."}
            </p>
          </div>
        </div>
        {!profile.verified && (
          <Button to="/payment" variant="white">Complete Payment</Button>
        )}
      </div>
    </div>
  );
}
