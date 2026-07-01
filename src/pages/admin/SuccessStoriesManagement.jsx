import { useState } from "react";
import { Heart, Trash2, Plus, X } from "lucide-react";
import { successStories as initialStories } from "../../data/successStories";
import { Field, Input, Textarea } from "../../components/FormFields";
import Button from "../../components/Button";

export default function SuccessStoriesManagement() {
  const [stories, setStories] = useState(initialStories);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ husband: "", wife: "", marriageDate: "", story: "" });

  const removeStory = (id) => setStories((prev) => prev.filter((s) => s.id !== id));

  const addStory = (e) => {
    e.preventDefault();
    setStories((prev) => [
      {
        id: Date.now(),
        photo: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=60",
        ...form,
      },
      ...prev,
    ]);
    setForm({ husband: "", wife: "", marriageDate: "", story: "" });
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-3xl font-semibold text-ink-900">Success Stories</h1>
        <Button onClick={() => setShowForm((s) => !s)} size="sm">
          {showForm ? <X size={16} /> : <Plus size={16} />} {showForm ? "Cancel" : "Add Story"}
        </Button>
      </div>
      <p className="text-ink-600 text-sm mb-8">Publish or remove success stories shown on the public site.</p>

      {showForm && (
        <form onSubmit={addStory} className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-6 mb-8">
          <div className="grid sm:grid-cols-2 gap-x-4">
            <Field label="Husband's Name">
              <Input required value={form.husband} onChange={(e) => setForm({ ...form, husband: e.target.value })} />
            </Field>
            <Field label="Wife's Name">
              <Input required value={form.wife} onChange={(e) => setForm({ ...form, wife: e.target.value })} />
            </Field>
          </div>
          <Field label="Marriage Date (e.g. June 2026)">
            <Input required value={form.marriageDate} onChange={(e) => setForm({ ...form, marriageDate: e.target.value })} />
          </Field>
          <Field label="Story">
            <Textarea required value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} />
          </Field>
          <Button type="submit">Publish Story</Button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {stories.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-ink-900/5 shadow-sm p-5 flex gap-4">
            <img src={s.photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/40 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-ink-900 flex items-center gap-1.5">
                {s.husband} <Heart size={12} className="text-rose-500" fill="currentColor" /> {s.wife}
              </p>
              <p className="text-xs text-gold-600 font-bold uppercase tracking-wide mb-1.5">Married — {s.marriageDate}</p>
              <p className="text-xs text-ink-600 line-clamp-2">{s.story}</p>
            </div>
            <button
              onClick={() => removeStory(s.id)}
              className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-rose-600 hover:bg-rose-500/10"
              aria-label="Remove story"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
