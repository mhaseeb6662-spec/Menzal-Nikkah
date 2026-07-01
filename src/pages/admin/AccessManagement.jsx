import { useState } from "react";
import { CheckCircle2, XCircle, KeyRound } from "lucide-react";
import { accessRequests as initialRequests } from "../../data/adminData";

const statusCls = {
  Approved: "bg-green-500/10 text-green-600",
  Pending: "bg-gold-500/10 text-gold-600",
  Denied: "bg-rose-500/10 text-rose-600",
};

export default function AccessManagement() {
  const [requests, setRequests] = useState(initialRequests);

  const setReqStatus = (id, status) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1 flex items-center gap-2">
        <KeyRound size={24} className="text-maroon-500" /> Access Requests
      </h1>
      <p className="text-ink-600 text-sm mb-8">
        Approve or deny requests from members wanting contact details or hidden photos of another profile.
      </p>

      <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-400 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Requested By</th>
                <th className="px-6 py-3">Requested Profile</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t border-ink-900/5">
                  <td className="px-6 py-4 text-ink-700">{r.fromUser}</td>
                  <td className="px-6 py-4 font-semibold text-ink-900">{r.toName} <span className="text-ink-400 font-normal">({r.toProfile})</span></td>
                  <td className="px-6 py-4 text-ink-600">{r.requestedOn}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCls[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {r.status !== "Approved" && (
                        <button
                          title="Approve"
                          onClick={() => setReqStatus(r.id, "Approved")}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-green-600 hover:bg-green-500/10"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      {r.status !== "Denied" && (
                        <button
                          title="Deny"
                          onClick={() => setReqStatus(r.id, "Denied")}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-600 hover:bg-rose-500/10"
                        >
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
