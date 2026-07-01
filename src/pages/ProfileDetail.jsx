import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin, GraduationCap, Briefcase, Users, Heart, MessageCircle, Lock,
  Ruler, Calendar, BadgeCheck, Image as ImageIcon,
} from "lucide-react";
import { getProfileById } from "../data/profiles";
import VerifiedBadge from "../components/VerifiedBadge";
import Button from "../components/Button";

export default function ProfileDetail() {
  const { id } = useParams();
  const profile = getProfileById(id);
  const [accessRequested, setAccessRequested] = useState(false);

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-2">Profile Not Found</h1>
        <p className="text-ink-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
        <Button to="/search">Search Other Profiles</Button>
      </div>
    );
  }

  const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(
    `Assalam-o-Alaikum, I am interested in Profile ${profile.id} — ${profile.name}.`
  )}`;

  return (
    <div className="bg-blush-50">
      {/* Cover + header */}
      <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden bg-ink-900">
        <img src={profile.coverPhoto} alt="" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 sm:-mt-24 flex flex-col sm:flex-row sm:items-end gap-5 pb-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl shrink-0 bg-blush-200">
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-900">{profile.name}</h1>
              {profile.verified && <VerifiedBadge />}
            </div>
            <p className="text-ink-600 text-sm flex items-center gap-1.5">
              <BadgeCheck size={14} className="text-maroon-500" /> {profile.id}
              <span className="mx-1">•</span>
              <MapPin size={14} className="text-maroon-500" /> {profile.city}, {profile.country}
            </p>
          </div>
          <div className="flex gap-3 pb-2">
            <Button href={waLink} target="_blank" rel="noreferrer" variant="primary">
              <MessageCircle size={16} /> Contact On WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={() => setAccessRequested(true)}
              disabled={accessRequested}
            >
              <Lock size={16} /> {accessRequested ? "Request Sent" : "Request Contact Details"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 pb-16">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="About">
              <p className="text-ink-600 text-sm leading-relaxed">{profile.about}</p>
              <div className="mt-4 pt-4 border-t border-ink-900/10">
                <p className="text-xs font-bold uppercase tracking-wide text-rose-500 mb-1.5">
                  Expectations From Partner
                </p>
                <p className="text-ink-600 text-sm leading-relaxed">{profile.expectations}</p>
              </div>
            </Card>

            <Card title="Personal Details">
              <div className="grid sm:grid-cols-2 gap-4">
                <Info icon={Calendar} label="Age" value={`${profile.age} years`} />
                <Info icon={Ruler} label="Height" value={profile.height} />
                <Info icon={Heart} label="Marital Status" value={profile.maritalStatus} />
                <Info icon={Users} label="Sect / Caste" value={`${profile.sect} — ${profile.caste}`} />
              </div>
            </Card>

            <Card title="Education">
              <Info icon={GraduationCap} label="Qualification" value={profile.education} />
            </Card>

            <Card title="Career">
              <div className="grid sm:grid-cols-2 gap-4">
                <Info icon={Briefcase} label="Profession" value={profile.profession} />
                <Info icon={Briefcase} label="Monthly Income" value={profile.income} />
              </div>
            </Card>

            <Card title="Family Information">
              <div className="grid sm:grid-cols-2 gap-4">
                <Info icon={Users} label="Father's Occupation" value={profile.fatherOccupation} />
                <Info icon={Users} label="Mother's Occupation" value={profile.motherOccupation} />
                <Info icon={Users} label="Brothers" value={String(profile.siblings.brothers)} />
                <Info icon={Users} label="Sisters" value={String(profile.siblings.sisters)} />
              </div>
            </Card>

            <Card title="Photos">
              <div className="grid grid-cols-3 gap-3">
                {profile.gallery.map((src, i) => (
                  <img key={i} src={src} alt="" className="aspect-square object-cover rounded-xl" />
                ))}
                {Array.from({ length: profile.hiddenPhotos }).map((_, i) => (
                  <div
                    key={`hidden-${i}`}
                    className="aspect-square rounded-xl bg-ink-900/90 flex flex-col items-center justify-center text-white/70 gap-1"
                  >
                    <Lock size={18} />
                    <span className="text-[10px] font-semibold">Hidden</span>
                  </div>
                ))}
              </div>
              {profile.hiddenPhotos > 0 && (
                <p className="text-xs text-ink-400 mt-3 flex items-center gap-1.5">
                  <ImageIcon size={13} /> {profile.hiddenPhotos} photo(s) hidden — request access via admin.
                </p>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 sticky top-24">
              <h3 className="font-display text-lg font-semibold text-ink-900 mb-4">Quick Facts</h3>
              <ul className="space-y-3 text-sm">
                <QuickFact label="Profile ID" value={profile.id} />
                <QuickFact label="Religion" value={profile.religion} />
                <QuickFact label="City" value={profile.city} />
                <QuickFact label="Status" value={profile.verified ? "Verified" : "Pending Verification"} />
              </ul>
              <Button to="/search" variant="ghost" className="w-full mt-6">
                ← Back To Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6">
      <h3 className="font-display text-lg font-semibold text-ink-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="w-8 h-8 rounded-lg bg-maroon-500/10 text-maroon-500 flex items-center justify-center shrink-0">
        <Icon size={15} />
      </span>
      <div>
        <p className="text-xs text-ink-400">{label}</p>
        <p className="text-sm font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );
}

function QuickFact({ label, value }) {
  return (
    <li className="flex items-center justify-between border-b border-ink-900/5 pb-2 last:border-0">
      <span className="text-ink-400">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </li>
  );
}
