import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import ProfileCard from "../components/ProfileCard";
import SectionHeading from "../components/SectionHeading";
import FilterBoxes from "../components/FilterBoxes";
import { Input } from "../components/FormFields";
import { profiles, cities, castes, educationLevels } from "../data/profiles";

export default function SearchProfiles() {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [caste, setCaste] = useState(searchParams.get("caste") || "");
  const [education, setEducation] = useState(searchParams.get("education") || "");
  const [ageMin, setAgeMin] = useState(searchParams.get("ageMin") || "");
  const [ageMax, setAgeMax] = useState(searchParams.get("ageMax") || "");

  const results = useMemo(() => {
    return profiles.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
      const matchesCity = !city || p.city === city;
      const matchesCaste = !caste || p.caste === caste;
      const matchesEdu = !education || p.education.includes(education);
      const matchesAgeMin = !ageMin || p.age >= Number(ageMin);
      const matchesAgeMax = !ageMax || p.age <= Number(ageMax);
      return matchesQuery && matchesCity && matchesCaste && matchesEdu && matchesAgeMin && matchesAgeMax;
    });
  }, [query, city, caste, education, ageMin, ageMax]);

  const clearAll = () => {
    setQuery("");
    setCity("");
    setCaste("");
    setEducation("");
    setAgeMin("");
    setAgeMax("");
  };

  return (
    <div className="bg-blush-50 min-h-screen">
      <div className="bg-white border-b border-ink-900/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Find Your Match"
            title="Search Profiles"
            subtitle="Search by Profile ID or Username, or use the filters below to narrow your search."
            align="left"
          />

          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
            <Input
              className="pl-11 py-3"
              placeholder="Search by Profile ID (e.g. MAT-10001) or Username"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="bg-blush-100 rounded-2xl p-4 sm:p-5">
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
              onSubmit={() => document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" })}
              submitLabel="Show Results"
            />
          </div>

          {(city || caste || education || ageMin || ageMax || query) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {[
                query && ["Search: " + query, () => setQuery("")],
                city && [city, () => setCity("")],
                caste && [caste, () => setCaste("")],
                education && [education, () => setEducation("")],
                (ageMin || ageMax) && [`Age: ${ageMin || "18"}-${ageMax || "70"}`, () => { setAgeMin(""); setAgeMax(""); }],
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
              <button
                onClick={clearAll}
                className="text-xs font-semibold text-ink-400 hover:text-maroon-500 underline ml-1"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <div id="search-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
