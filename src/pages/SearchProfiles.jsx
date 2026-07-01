import { useMemo, useState } from "react";
import { SlidersHorizontal, Search, X, PlusCircle } from "lucide-react";
import ProfileCard from "../components/ProfileCard";
import SectionHeading from "../components/SectionHeading";
import { Field, Input, Select } from "../components/FormFields";
import Button from "../components/Button";
import { profiles, cities, castes as baseCastes, educationLevels } from "../data/profiles";

export default function SearchProfiles() {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("all");
  const [city, setCity] = useState("");
  const [caste, setCaste] = useState("");
  const [education, setEducation] = useState("");
  const [customCaste, setCustomCaste] = useState("");
  const [castesList, setCastesList] = useState(baseCastes);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const addCustomCaste = () => {
    const val = customCaste.trim();
    if (val && !castesList.includes(val)) {
      setCastesList((prev) => [...prev.slice(0, -1), val, "Other"]);
      setCaste(val);
      setCustomCaste("");
    }
  };

  const results = useMemo(() => {
    return profiles.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
      const matchesGender = gender === "all" || p.gender === gender;
      const matchesCity = !city || p.city === city;
      const matchesCaste = !caste || p.caste === caste;
      const matchesEdu = !education || p.education.includes(education);
      return matchesQuery && matchesGender && matchesCity && matchesCaste && matchesEdu;
    });
  }, [query, gender, city, caste, education]);

  return (
    <div className="bg-blush-50 min-h-screen">
      <div className="bg-white border-b border-ink-900/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Find Your Match"
            title="Search Profiles"
            subtitle="Search by Profile ID or Username, or use advanced filters to narrow your search."
            align="left"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <Input
                className="pl-11 py-3"
                placeholder="Search by Profile ID (e.g. MAT-10001) or Username"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFiltersOpen((s) => !s)}
              className="sm:w-auto"
            >
              <SlidersHorizontal size={16} /> {filtersOpen ? "Hide Filters" : "Advanced Filters"}
            </Button>
          </div>

          {filtersOpen && (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-blush-100 rounded-2xl p-5">
              <Field label="Looking For">
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </Field>
              <Field label="City">
                <Select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Any City</option>
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Caste">
                <Select value={caste} onChange={(e) => setCaste(e.target.value)}>
                  <option value="">Any Caste</option>
                  {castesList.map((c) => <option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Education">
                <Select value={education} onChange={(e) => setEducation(e.target.value)}>
                  <option value="">Any Education</option>
                  {educationLevels.map((e) => <option key={e}>{e}</option>)}
                </Select>
              </Field>
              <Field label="Add New Caste (if not listed)">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type caste..."
                    value={customCaste}
                    onChange={(e) => setCustomCaste(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addCustomCaste}
                    className="shrink-0 w-11 h-11 rounded-xl bg-maroon-500 text-white flex items-center justify-center hover:bg-maroon-600"
                    aria-label="Add caste"
                  >
                    <PlusCircle size={18} />
                  </button>
                </div>
              </Field>
            </div>
          )}

          {(city || caste || education || gender !== "all" || query) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                query && ["Search: " + query, () => setQuery("")],
                gender !== "all" && [gender, () => setGender("all")],
                city && [city, () => setCity("")],
                caste && [caste, () => setCaste("")],
                education && [education, () => setEducation("")],
              ]
                .filter(Boolean)
                .map(([label, clear]) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 bg-maroon-500/10 text-maroon-500 text-xs font-semibold px-3 py-1.5 rounded-full capitalize"
                  >
                    {label}
                    <button onClick={clear} aria-label={`Remove ${label} filter`}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-ink-600 mb-6">
          Showing <span className="font-semibold text-ink-900">{results.length}</span> profile{results.length !== 1 && "s"}
        </p>
        {results.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-ink-900 mb-2">No profiles found</p>
            <p className="text-ink-600 text-sm">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((p) => (
              <ProfileCard key={p.id} profile={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
