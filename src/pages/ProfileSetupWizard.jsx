import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowRight, ArrowLeft, UploadCloud } from "lucide-react";
import StepIndicator from "../components/StepIndicator";
import Button from "../components/Button";
import { Field, Input, Select, Textarea } from "../components/FormFields";
import { cities, castes, educationLevels } from "../data/profiles";

const steps = ["Personal", "Education", "Family", "About", "Photos"];

export default function ProfileSetupWizard() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-blush-50 py-10 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-maroon-500 to-rose-500 flex items-center justify-center text-white">
            <Heart size={16} fill="white" />
          </span>
          <span className="font-display text-2xl font-bold text-ink-900">Nikah Manzil</span>
        </div>

        <StepIndicator steps={steps} current={step} />

        <form
          onSubmit={step === steps.length ? handleFinish : (e) => { e.preventDefault(); next(); }}
          className="bg-white rounded-3xl border border-ink-900/5 shadow-sm p-6 sm:p-10"
        >
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Personal Details</h2>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Date of Birth"><Input type="date" required /></Field>
                <Field label="Height"><Input placeholder="e.g. 5'8&quot;" required /></Field>
                <Field label="Marital Status">
                  <Select defaultValue="Never Married">
                    <option>Never Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </Select>
                </Field>
                <Field label="City">
                  <Select defaultValue="">
                    <option value="" disabled>Select City</option>
                    {cities.map((c) => <option key={c}>{c}</option>)}
                  </Select>
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Education & Career</h2>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Highest Education">
                  <Select defaultValue="">
                    <option value="" disabled>Select</option>
                    {educationLevels.map((e) => <option key={e}>{e}</option>)}
                  </Select>
                </Field>
                <Field label="Field of Study"><Input placeholder="e.g. Computer Science" /></Field>
                <Field label="Profession"><Input placeholder="e.g. Software Engineer" required /></Field>
                <Field label="Monthly Income"><Input placeholder="e.g. PKR 100,000" /></Field>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Family Information</h2>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Field label="Sect"><Input placeholder="e.g. Sunni" required /></Field>
                <Field label="Caste">
                  <Select defaultValue="">
                    <option value="" disabled>Select</option>
                    {castes.map((c) => <option key={c}>{c}</option>)}
                  </Select>
                </Field>
                <Field label="Father's Occupation"><Input placeholder="e.g. Businessman" /></Field>
                <Field label="Mother's Occupation"><Input placeholder="e.g. Homemaker" /></Field>
                <Field label="Number of Brothers"><Input type="number" min="0" defaultValue="0" /></Field>
                <Field label="Number of Sisters"><Input type="number" min="0" defaultValue="0" /></Field>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">About You</h2>
              <Field label="Personal Introduction" hint="A few lines about yourself, your nature and lifestyle.">
                <Textarea placeholder="Tell us about yourself..." required />
              </Field>
              <Field label="Expectations From Partner" hint="What you're looking for in a life partner.">
                <Textarea placeholder="Describe what you're looking for..." required />
              </Field>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-2">Upload Photos</h2>
              <p className="text-sm text-ink-600 mb-6">
                Upload your profile photo. You'll be able to add more photos and mark some as hidden from your dashboard later.
              </p>
              <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-ink-900/15 rounded-2xl py-14 cursor-pointer hover:border-maroon-500/40 transition-colors">
                <UploadCloud size={28} className="text-ink-400" />
                <span className="text-sm text-ink-600 font-semibold">
                  {photo || "Click to upload your main profile photo"}
                </span>
                <span className="text-xs text-ink-400">JPG or PNG, up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0]?.name || "")}
                />
              </label>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-ink-900/10">
            <Button
              type="button"
              variant="ghost"
              onClick={prev}
              disabled={step === 1}
              className={step === 1 ? "invisible" : ""}
            >
              <ArrowLeft size={16} /> Back
            </Button>
            <Button type="submit">
              {step === steps.length ? "Continue To Payment" : "Next Step"} <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
