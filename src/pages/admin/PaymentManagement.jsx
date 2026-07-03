import { useMemo, useState } from "react";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { adminPayments as initialPayments } from "../../data/adminData";
import { Input, Select } from "../../components/FormFields";

const statusCls = {
  Approved: "bg-green-500/10 text-green-600",
  Pending: "bg-gold-500/10 text-gold-600",
  Rejected: "bg-rose-500/10 text-rose-600",
};

export default function PaymentManagement() {
  const [payments, setPayments] = useState(initialPayments);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchesStatus = status === "all" || p.status === status;
      return matchesQ && matchesStatus;
    });
  }, [payments, query, status]);

  const setPaymentStatus = (id, newStatus) =>
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));

  const totalApproved = payments.filter((p) => p.status === "Approved").reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Payment Management</h1>
      <p className="text-ink-600 text-sm mb-6">Review and approve registration fee payments.</p>

      <div className="bg-gradient-to-br from-maroon-500 to-rose-600 rounded-2xl p-6 text-white mb-6 max-w-sm">
        <p className="text-white/80 text-sm">Total Approved Revenue</p>
        <p className="font-display text-3xl font-bold mt-1">PKR {totalApproved.toLocaleString()}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <Input className="pl-10" placeholder="Search by name or transaction ID..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select className="sm:w-48" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </Select>
      </div>

      <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-400 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-ink-900/5">
                  <td className="px-6 py-4 font-semibold text-ink-900">{p.id}</td>
                  <td className="px-6 py-4 text-ink-700">{p.name}</td>
                  <td className="px-6 py-4 text-ink-600">PKR {p.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-ink-600">{p.method}</td>
                  <td className="px-6 py-4 text-ink-600">{p.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCls[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {p.status !== "Approved" && (
                        <button
                          title="Approve"
                          onClick={() => setPaymentStatus(p.id, "Approved")}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-500/10"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      {p.status !== "Rejected" && (
                        <button
                          title="Reject"
                          onClick={() => setPaymentStatus(p.id, "Rejected")}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-600 hover:bg-rose-500/10"
                        >
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-ink-400">No payments match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
