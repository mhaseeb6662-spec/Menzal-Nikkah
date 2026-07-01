import { Link } from "react-router-dom";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";

export default function ProfileCard({ profile, className = "" }) {
  return (
    <Link
      to={`/profile/${profile.id}`}
      className={`group relative block w-full shrink-0 bg-white rounded-2xl overflow-hidden border border-ink-900/5 shadow-sm hover:shadow-2xl hover:shadow-maroon-500/10 transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="relative h-56 overflow-hidden bg-blush-200">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {profile.verified && <VerifiedBadge ribbon />}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-4 text-white font-display text-lg font-semibold drop-shadow">
          {profile.id}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl font-semibold text-ink-900 truncate">
          {profile.name}, <span className="text-ink-600 font-body text-base">{profile.age}</span>
        </h3>
        <div className="mt-2 space-y-1.5 text-sm text-ink-600">
          <p className="flex items-center gap-1.5">
            <MapPin size={14} className="text-rose-500 shrink-0" /> {profile.city}, {profile.country}
          </p>
          <p className="flex items-center gap-1.5 truncate">
            <GraduationCap size={14} className="text-rose-500 shrink-0" /> {profile.education}
          </p>
          <p className="flex items-center gap-1.5 truncate">
            <Briefcase size={14} className="text-rose-500 shrink-0" /> {profile.profession}
          </p>
        </div>
      </div>
    </Link>
  );
}
