import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck, Users, Lock, HeadphonesIcon, UserPlus, FileEdit,
  CreditCard, BadgeCheck, Sparkles, ArrowRight,
} from "lucide-react";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ProfileCard from "../components/ProfileCard";
import FilterBoxes from "../components/FilterBoxes";
import Slider from "../components/Slider";
import SuccessStoryCard from "../components/SuccessStoryCard";
import { profiles, cities, castes, educationLevels } from "../data/profiles";
import { successStories } from "../data/successStories";

const features = [
  { icon: ShieldCheck, title: "Verified Profiles", desc: "Every profile is manually reviewed and approved by our admin team before activation." },
  { icon: Users, title: "Family-Oriented Matchmaking", desc: "Built for families, not casual browsing — proposals are handled with respect and seriousness." },
  { icon: Lock, title: "Secure Registration", desc: "Contact numbers and hidden photos stay private until access is mutually approved." },
  { icon: HeadphonesIcon, title: "Professional Support", desc: "Our team is available to guide families through every step of the process." },
];

const steps = [
  { icon: UserPlus, title: "Create Account", desc: "Sign up with your email and verify with a one-time OTP code." },
  { icon: FileEdit, title: "Complete Profile", desc: "Fill in personal, education, career and family details." },
  { icon: CreditCard, title: "Pay Registration Fee", desc: "A one-time fee of PKR 1,000 — no monthly or yearly charges." },
  { icon: ShieldCheck, title: "Admin Verification", desc: "Our team reviews and verifies your submitted information." },
  { icon: BadgeCheck, title: "Profile Activated", desc: "Your verified profile goes live and becomes searchable." },
];

export default function Home() {
  const navigate = useNavigate();
  const [caste, setCaste] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (caste) params.set("caste", caste);
    if (ageMin) params.set("ageMin", ageMin);
    if (ageMax) params.set("ageMax", ageMax);
    if (city) params.set("city", city);
    if (education) params.set("education", education);
    navigate(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div>
      {/* Top banner (e-commerce style) + quick filter boxes, right below navbar */}
  <section className="bg-blush-50 pt-3 sm:pt-5 md:pt-6">
  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
    {/* Banner */}
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-ink-900 h-[180px] xs:h-[200px] sm:h-[250px] md:h-[320px] lg:h-[360px]">
      <img
        src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&q=70"
        alt="Nikah Manzil registration offer"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/70 to-transparent" />

      <div className="relative z-10 flex h-full items-center px-5 sm:px-8 md:px-10 lg:px-14">
        <div className="max-w-xs sm:max-w-md lg:max-w-lg">
          <span className="inline-block text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-gold-400 mb-2">
            Limited Time Offer
          </span>

          <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white">
            One-Time Registration Just PKR 1,000
          </h2>

          <p className="hidden sm:block mt-3 text-sm md:text-base text-white/75 leading-relaxed">
            No monthly fees, no hidden charges — verified profiles only.
          </p>

          <Button
            to="/register"
            variant="gold"
            size="sm"
            className="mt-4 md:mt-6 w-fit"
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>

    {/* Filter Box */}
    <div className="relative z-20 -mt-5 sm:-mt-8 md:-mt-10 lg:-mt-12 px-1 sm:px-3">
      <div className="rounded-2xl bg-white border border-ink-900/5 shadow-xl p-4 sm:p-6 md:p-8">
        <FilterBoxes
          castesList={castes}
          cities={cities}
          educationLevels={educationLevels}
          caste={caste}
          setCaste={setCaste}
          ageMin={ageMin}
          setAgeMin={setAgeMin}
          ageMax={ageMax}
          setAgeMax={setAgeMax}
          city={city}
          setCity={setCity}
          education={education}
          setEducation={setEducation}
          onSubmit={handleSearch}
        />
      </div>
    </div>
  </div>
</section>

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=70"
          alt="Nikah Manzil"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/85 to-ink-900" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(196,64,107,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(184,146,74,0.25), transparent 50%)",
          }}
        />
        <svg
          className="absolute -right-24 -top-24 w-[520px] h-[520px] opacity-[0.08] pointer-events-none"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="95" fill="none" stroke="#B8924A" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#B8924A" strokeWidth="1" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="#B8924A" strokeWidth="0.75" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-6"
          >
            <Sparkles size={14} /> Trusted by Serious Families
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] max-w-4xl mx-auto"
          >
            Find Your Perfect <span className="bg-gradient-to-r from-rose-400 to-gold-400 bg-clip-text text-transparent">Life Partner</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-white/70 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Trusted matrimonial platform for serious families — verified
            profiles, respectful matchmaking and complete privacy protection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-row flex-nowrap items-center justify-center gap-2.5 sm:gap-4"
          >
            <Button
              to="/register"
              variant="gold"
              size="lg"
              className="!px-4 !py-2.5 !text-xs sm:!px-8 sm:!py-4 sm:!text-lg whitespace-nowrap"
            >
              Register Now <ArrowRight size={18} className="hidden sm:inline" />
            </Button>
            <Button
              to="/search"
              variant="outline"
              size="lg"
              className="!border-white/40 !text-white hover:!bg-white hover:!text-ink-900 !px-4 !py-2.5 !text-xs sm:!px-8 sm:!py-4 sm:!text-lg whitespace-nowrap"
            >
              Browse Profiles
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              ["1,248+", "Registered Families"],
              ["864", "Active Profiles"],
              ["132", "Success Stories"],
              ["100%", "Verified Process"],
            ].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">{num}</p>
                <p className="text-white/50 text-xs sm:text-sm mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-blush-50 to-transparent" />
      </section>

      {/* Features / trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="Why Families Trust Us"
          title="Built On Trust, Privacy & Respect"
          subtitle="Everything about our platform is designed to give both families peace of mind."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-ink-900/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="w-12 h-12 rounded-xl bg-maroon-500/10 text-maroon-500 flex items-center justify-center mb-4">
                <Icon size={22} />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink-900 mb-2">{title}</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration steps */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple Process"
            title="Registration In 5 Easy Steps"
            subtitle="A one-time registration fee of PKR 1,000 — no monthly charges, no yearly subscription, no hidden fees."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative text-center px-2"
              >
                <div className="relative mx-auto w-16 h-16 rounded-full bg-blush-100 border-2 border-gold-500/40 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-maroon-500" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-maroon-500 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900 mb-1">{title}</h3>
                <p className="text-sm text-ink-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active profiles slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Meet Our Members"
            title="Active Verified Profiles"
            align="left"
          />
          <Button to="/active-profiles" variant="outline" size="sm" className="shrink-0">
            View All Profiles <ArrowRight size={16} />
          </Button>
        </div>
        <Slider itemBasis="basis-full sm:basis-[48%] lg:basis-[23%]">
          {profiles.slice(0, 8).map((p) => (
            <ProfileCard key={p.id} profile={p} />
          ))}
        </Slider>
      </section>

      {/* Success stories slider */}
      <section className="bg-ink-900 py-16 md:py-24 relative overflow-hidden">
        <svg className="absolute -left-20 -bottom-20 w-96 h-96 opacity-[0.06]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="95" fill="none" stroke="#B8924A" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#B8924A" strokeWidth="1" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Real Families, Real Stories"
            title="Success Stories"
            subtitle="A few of the families who found their perfect match through Nikah Manzil."
            light
          />
          <Slider itemBasis="basis-[88%] sm:basis-[60%] lg:basis-[38%]">
            {successStories.map((s) => (
              <SuccessStoryCard key={s.id} story={s} />
            ))}
          </Slider>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-500 to-rose-600 px-6 sm:px-14 py-14 sm:py-20 text-center">
          <svg className="absolute -right-16 -top-16 w-72 h-72 opacity-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="none" stroke="white" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="1" />
          </svg>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white max-w-2xl mx-auto leading-tight">
            Begin Your Journey Towards A Blessed Marriage
          </h2>
          <p className="text-white/80 mt-4 max-w-xl mx-auto">
            Join hundreds of serious families who trust Nikah Manzil for a
            respectful, verified matchmaking experience.
          </p>
          <div className="mt-8 flex flex-row flex-nowrap items-center justify-center gap-2.5 sm:gap-4">
            <Button
              to="/register"
              variant="white"
              size="lg"
              className="!px-4 !py-2.5 !text-xs sm:!px-8 sm:!py-4 sm:!text-lg whitespace-nowrap"
            >
              Register Now
            </Button>
            <Button
              to="/contact"
              variant="outline"
              size="lg"
              className="!border-white/50 !text-white hover:!bg-white hover:!text-maroon-500 !px-4 !py-2.5 !text-xs sm:!px-8 sm:!py-4 sm:!text-lg whitespace-nowrap"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}