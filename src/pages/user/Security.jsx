import { useState } from "react";
import { KeyRound, ShieldAlert, Trash2 } from "lucide-react";
import Button from "../../components/Button";
import { Field, Input } from "../../components/FormFields";

export default function Security() {
  const [saved, setSaved] = useState(false);
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Security & Account</h1>
      <p className="text-ink-600 text-sm mb-8">Manage your password and account settings.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
        className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 sm:p-8 mb-8"
      >
        <h2 className="font-display text-lg font-semibold text-ink-900 mb-5 flex items-center gap-2">
          <KeyRound size={18} className="text-maroon-500" /> Change Password
        </h2>
        <Field label="Current Password"><Input type="password" placeholder="••••••••" required /></Field>
        <Field label="New Password"><Input type="password" placeholder="••••••••" required /></Field>
        <Field label="Confirm New Password"><Input type="password" placeholder="••••••••" required /></Field>
        <div className="flex items-center gap-4 pt-2">
          <Button type="submit">Update Password</Button>
          {saved && <span className="text-sm text-green-600 font-semibold">Password updated successfully.</span>}
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-rose-500/20 shadow-sm p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-ink-900 mb-2 flex items-center gap-2">
          <ShieldAlert size={18} className="text-rose-500" /> Manage Account
        </h2>
        <p className="text-sm text-ink-600 mb-5">
          Deactivating your account will hide your profile from search
          results until you log in again. This action can be reversed by
          contacting support.
        </p>
        {!confirmDeactivate ? (
          <Button variant="outline" className="!border-rose-500 !text-rose-500 hover:!bg-rose-500 hover:!text-white" onClick={() => setConfirmDeactivate(true)}>
            <Trash2 size={16} /> Deactivate Account
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-rose-500/5 rounded-xl p-4">
            <p className="text-sm text-ink-700 flex-1">Are you sure you want to deactivate your account?</p>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="ghost" onClick={() => setConfirmDeactivate(false)}>Cancel</Button>
              <Button size="sm" className="!bg-rose-600 hover:!bg-rose-700">Yes, Deactivate</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
