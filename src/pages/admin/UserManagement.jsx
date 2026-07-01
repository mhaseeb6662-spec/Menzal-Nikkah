import { useMemo, useState } from "react";
import { Search, CheckCircle2, Ban, Eye } from "lucide-react";
import { adminUsers as initialUsers } from "../../data/adminData";
import { Input, Select } from "../../components/FormFields";
import Button from "../../components/Button";

const statusCls = {
  Active: "bg-green-500/10 text-green-600",
  Pending: "bg-gold-500/10 text-gold-600",
  Suspended: "bg-rose-500/10 text-rose-600",
};

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
      const matchesStatus = status === "all" || u.status === status;
      return matchesQ && matchesStatus;
    });
  }, [users, query, status]);

  const setUserStatus = (id, newStatus) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">User Management</h1>
      <p className="text-ink-600 text-sm mb-8">Approve, suspend, or review registered members.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <Input className="pl-10" placeholder="Search by name or ID..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select className="sm:w-48" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </Select>
      </div>

      <div className="bg-white rounded-2xl border border-ink-900/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-400 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Profile ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-ink-900/5">
                  <td className="px-6 py-4 font-semibold text-ink-900">{u.id}</td>
                  <td className="px-6 py-4 text-ink-700">{u.name}</td>
                  <td className="px-6 py-4 text-ink-600">{u.city}</td>
                  <td className="px-6 py-4 text-ink-600">{u.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCls[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <IconBtn title="View" onClick={() => {}}><Eye size={14} /></IconBtn>
                      {u.status !== "Active" && (
                        <IconBtn title="Approve" tone="green" onClick={() => setUserStatus(u.id, "Active")}>
                          <CheckCircle2 size={14} />
                        </IconBtn>
                      )}
                      {u.status !== "Suspended" && (
                        <IconBtn title="Suspend" tone="rose" onClick={() => setUserStatus(u.id, "Suspended")}>
                          <Ban size={14} />
                        </IconBtn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-ink-400">No users match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children, title, tone = "default", onClick }) {
  const tones = {
    default: "text-ink-600 hover:bg-blush-100",
    green: "text-green-600 hover:bg-green-500/10",
    rose: "text-rose-600 hover:bg-rose-500/10",
  };
  return (
    <button title={title} onClick={onClick} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${tones[tone]}`}>
      {children}
    </button>
  );
}
