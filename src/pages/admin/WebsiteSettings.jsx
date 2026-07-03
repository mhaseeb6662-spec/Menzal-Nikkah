import { useState } from "react";
import { Landmark, Smartphone, Plus, Trash2, Save } from "lucide-react";
import { paymentAccounts as initialAccounts } from "../../data/adminData";
import { Field, Input, Select } from "../../components/FormFields";
import Button from "../../components/Button";

export default function WebsiteSettings() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [fee, setFee] = useState(1000);
  const [saved, setSaved] = useState(false);
  const [newAcc, setNewAcc] = useState({ type: "Mobile Wallet", label: "", details: "" });

  const removeAccount = (id) => setAccounts((prev) => prev.filter((a) => a.id !== id));

  const addAccount = (e) => {
    e.preventDefault();
    if (!newAcc.label || !newAcc.details) return;
    setAccounts((prev) => [...prev, { id: Date.now(), ...newAcc }]);
    setNewAcc({ type: "Mobile Wallet", label: "", details: "" });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Website Settings</h1>
      <p className="text-ink-600 text-sm mb-8">Manage registration fee and payment accounts shown to members.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
        className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 sm:p-8 mb-8"
      >
        <h2 className="font-display text-lg font-semibold text-ink-900 mb-5">Registration Fee</h2>
        <Field label="One-Time Registration Fee (PKR)">
          <Input type="number" value={fee} onChange={(e) => setFee(e.target.value)} className="max-w-xs" />
        </Field>
        <div className="flex items-center gap-4">
          <Button type="submit"><Save size={16} /> Save Fee</Button>
          {saved && <span className="text-sm text-green-600 font-semibold">Settings saved.</span>}
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-ink-900 mb-5">Payment Accounts</h2>
        <div className="space-y-3 mb-6">
          {accounts.map((acc) => {
            const Icon = acc.type === "Bank Account" ? Landmark : Smartphone;
            return (
              <div key={acc.id} className="flex items-start gap-3 p-4 rounded-xl border border-ink-900/10">
                <span className="w-10 h-10 rounded-lg bg-maroon-500/10 text-maroon-500 flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink-900 text-sm">{acc.label}</p>
                  <p className="text-xs text-ink-600 mt-0.5">{acc.details}</p>
                </div>
                <button
                  onClick={() => removeAccount(acc.id)}
                  className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-rose-600 hover:bg-rose-500/10"
                  aria-label="Remove account"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>

        <form onSubmit={addAccount} className="border-t border-ink-900/10 pt-5">
          <p className="text-sm font-semibold text-ink-800 mb-3">Add New Payment Account</p>
          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <Select value={newAcc.type} onChange={(e) => setNewAcc({ ...newAcc, type: e.target.value })}>
              <option>Bank Account</option>
              <option>Mobile Wallet</option>
            </Select>
            <Input
              placeholder="Label (e.g. JazzCash)"
              value={newAcc.label}
              onChange={(e) => setNewAcc({ ...newAcc, label: e.target.value })}
            />
            <Input
              placeholder="Details / Account number"
              value={newAcc.details}
              onChange={(e) => setNewAcc({ ...newAcc, details: e.target.value })}
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            <Plus size={15} /> Add Account
          </Button>
        </form>
      </div>
    </div>
  );
}
