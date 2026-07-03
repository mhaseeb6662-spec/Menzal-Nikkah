import { profiles } from "../data/profiles";
import ProfileCard from "../components/ProfileCard";
import SectionHeading from "../components/SectionHeading";

export default function ActiveProfiles() {
  const active = profiles.filter((p) => p.verified);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <SectionHeading
        eyebrow="Verified & Live"
        title="Active Profiles"
        subtitle="Browse verified profiles currently active on Nikah Manzil, presented in a familiar social-feed style."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6">
        {active.map((p) => (
          <ProfileCard key={p.id} profile={p} />
        ))}
      </div>
    </div>
  );
}
