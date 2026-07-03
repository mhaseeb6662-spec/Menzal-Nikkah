import { useState } from "react";
import { Landmark, Smartphone, UploadCloud, CheckCircle2, Clock } from "lucide-react";
import { Field, Input } from "../components/FormFields";
import Button from "../components/Button";
import { paymentAccounts } from "../data/adminData";

const iconFor = (type) => (type === "Bank Account" ? Landmark : Smartphone);

export default function Payment() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-ink-900/5 p-10 text-center">
          <span className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-600 flex items-center justify-center mx-auto mb-5">
            <Clock size={30} />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-900 mb-2">
            Payment Submitted
          </h1>
          <p className="text-ink-600 text-sm mb-6">
            Your payment is under review. Our admin team verifies transactions
            within 24 hours — once approved your profile will be activated
            and marked as <span className="font-semibold text-gold-600">Verified</span>.
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold bg-gold-500/10 text-gold-600 px-4 py-2 rounded-full">
            Status: Pending Approval
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blush-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-rose-500">Final Step</span>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-900 mt-2">
            Registration Fee Payment
          </h1>
          <p className="text-ink-600 text-sm mt-2">
            One-time fee of <span className="font-semibold text-maroon-500">PKR 1,000</span> — no monthly or yearly charges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm border border-ink-900/5 p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-5">Choose A Payment Method</h2>
            <div className="space-y-4">
              {paymentAccounts.map((acc) => {
                const Icon = iconFor(acc.type);
                return (
                  <div key={acc.id} className="flex items-start gap-3 p-4 rounded-xl border border-ink-900/10 hover:border-maroon-500/40 transition-colors">
                    <span className="w-10 h-10 rounded-lg bg-maroon-500/10 text-maroon-500 flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-ink-900 text-sm">{acc.label}</p>
                      <p className="text-xs text-ink-600 mt-0.5">{acc.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-white rounded-3xl shadow-sm border border-ink-900/5 p-6 sm:p-8"
          >
            <h2 className="font-display text-xl font-semibold text-ink-900 mb-5">Submit Payment Proof</h2>
            <Field label="Transaction ID">
              <Input placeholder="Enter transaction / reference ID" required />
            </Field>
            <Field label="Payment Screenshot">
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ink-900/15 rounded-xl py-8 cursor-pointer hover:border-maroon-500/40 transition-colors">
                <UploadCloud size={24} className="text-ink-400" />
                <span className="text-sm text-ink-600">
                  {fileName || "Click to upload screenshot"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                />
              </label>
            </Field>
            <Button type="submit" className="w-full mt-4">
              <CheckCircle2 size={16} /> Submit For Review
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
