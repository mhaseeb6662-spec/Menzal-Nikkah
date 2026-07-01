import { CheckCircle2, Clock, XCircle, CreditCard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getProfileById } from "../../data/profiles";
import Button from "../../components/Button";

const history = [
  { id: "TXN-5001", date: "2026-05-14", amount: 1000, method: "JazzCash", status: "Approved" },
];

const statusMeta = {
  Approved: { icon: CheckCircle2, cls: "text-green-600 bg-green-500/10" },
  Pending: { icon: Clock, cls: "text-gold-600 bg-gold-500/10" },
  Rejected: { icon: XCircle, cls: "text-rose-600 bg-rose-500/10" },
};

export default function PaymentStatus() {
  const { user } = useAuth();
  const profile = getProfileById(user?.profileId) ?? getProfileById("MAT-10001");

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Payment Status</h1>
      <p className="text-ink-600 text-sm mb-8">
        Track your one-time registration fee payment and verification status.
      </p>

      <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            profile.verified ? "bg-green-500/10 text-green-600" : "bg-gold-500/10 text-gold-600"
          }`}>
            <CreditCard size={24} />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink-900">
              {profile.verified ? "Payment Approved" : "No Approved Payment Yet"}
            </p>
            <p className="text-ink-600 text-sm">
              {profile.verified
                ? "Your registration fee has been verified and your profile is active."
                : "Submit your registration fee to get your profile verified."}
            </p>
          </div>
        </div>
        {!profile.verified && <Button to="/payment">Pay Now</Button>}
      </div>

      <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-ink-900/5">
          <h3 className="font-display text-lg font-semibold text-ink-900">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-400 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {(profile.verified ? history : []).map((h) => {
                const Meta = statusMeta[h.status];
                return (
                  <tr key={h.id} className="border-t border-ink-900/5">
                    <td className="px-6 py-4 font-semibold text-ink-900">{h.id}</td>
                    <td className="px-6 py-4 text-ink-600">{h.date}</td>
                    <td className="px-6 py-4 text-ink-600">PKR {h.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-ink-600">{h.method}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${Meta.cls}`}>
                        <Meta.icon size={13} /> {h.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {!profile.verified && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-ink-400 text-sm">
                    No payment records found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
