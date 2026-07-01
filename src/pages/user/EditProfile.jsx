import { useState } from "react";
import { Save } from "lucide-react";
import Button from "../../components/Button";
import { Field, Input, Select, Textarea } from "../../components/FormFields";
import { getProfileById, cities, castes } from "../../data/profiles";
import { useAuth } from "../../context/AuthContext";

export default function EditProfile() {
  const { user } = useAuth();
  const profile = getProfileById(user?.profileId) ?? getProfileById("MAT-10001");
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Edit Profile</h1>
      <p className="text-ink-600 text-sm mb-8">Keep your information accurate and up to date.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
        className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 sm:p-8"
      >
        <div className="grid sm:grid-cols-2 gap-x-4">
          <Field label="Full Name"><Input defaultValue={profile.name} /></Field>
          <Field label="Age"><Input type="number" defaultValue={profile.age} /></Field>
          <Field label="Height"><Input defaultValue={profile.height} /></Field>
          <Field label="Marital Status">
            <Select defaultValue={profile.maritalStatus}>
              <option>Never Married</option><option>Divorced</option><option>Widowed</option>
            </Select>
          </Field>
          <Field label="City">
            <Select defaultValue={profile.city}>{cities.map((c) => <option key={c}>{c}</option>)}</Select>
          </Field>
          <Field label="Caste">
            <Select defaultValue={profile.caste}>{castes.map((c) => <option key={c}>{c}</option>)}</Select>
          </Field>
          <Field label="Education"><Input defaultValue={profile.education} /></Field>
          <Field label="Profession"><Input defaultValue={profile.profession} /></Field>
        </div>
        <Field label="Personal Introduction">
          <Textarea defaultValue={profile.about} />
        </Field>
        <Field label="Expectations From Partner">
          <Textarea defaultValue={profile.expectations} />
        </Field>
        <div className="flex items-center gap-4 pt-4 border-t border-ink-900/10 mt-6">
          <Button type="submit"><Save size={16} /> Save Changes</Button>
          {saved && <span className="text-sm text-green-600 font-semibold">Profile updated successfully.</span>}
        </div>
      </form>
    </div>
  );
}
