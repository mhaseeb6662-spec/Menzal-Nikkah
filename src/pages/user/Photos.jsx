import { useState } from "react";
import { UploadCloud, Lock, Unlock, Trash2 } from "lucide-react";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { getProfileById } from "../../data/profiles";

export default function Photos() {
  const { user } = useAuth();
  const profile = getProfileById(user?.profileId) ?? getProfileById("MAT-10001");

  const [photos, setPhotos] = useState(() => [
    ...profile.gallery.map((src) => ({ src, hidden: false })),
    ...Array.from({ length: profile.hiddenPhotos }).map(() => ({
      src: profile.photo,
      hidden: true,
    })),
  ]);

  const toggleHidden = (i) =>
    setPhotos((prev) => prev.map((p, idx) => (idx === i ? { ...p, hidden: !p.hidden } : p)));

  const removePhoto = (i) =>
    setPhotos((prev) => prev.filter((_, idx) => idx !== i));

  const addPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos((prev) => [...prev, { src: url, hidden: false }]);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-900 mb-1">Manage Photos</h1>
      <p className="text-ink-600 text-sm mb-8">
        Upload new photos, or mark existing ones as hidden — hidden photos are
        only visible to members you approve.
      </p>

      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ink-900/15 rounded-2xl py-10 cursor-pointer hover:border-maroon-500/40 transition-colors bg-white mb-8">
        <UploadCloud size={24} className="text-ink-400" />
        <span className="text-sm text-ink-600 font-semibold">Click to upload a new photo</span>
        <span className="text-xs text-ink-400">JPG or PNG, up to 5MB</span>
        <input type="file" accept="image/*" className="hidden" onChange={addPhoto} />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {photos.map((p, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden bg-white border border-ink-900/5 shadow-sm group">
            <div className="aspect-square relative">
              <img
                src={p.src}
                alt=""
                className={`w-full h-full object-cover ${p.hidden ? "opacity-40 blur-[2px]" : ""}`}
              />
              {p.hidden && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={22} className="text-white drop-shadow" />
                </div>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
              <button
                onClick={() => toggleHidden(i)}
                className="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-white bg-white/20 hover:bg-white/30 rounded-lg py-1.5"
              >
                {p.hidden ? <Unlock size={12} /> : <Lock size={12} />}
                {p.hidden ? "Unhide" : "Hide"}
              </button>
              <button
                onClick={() => removePhoto(i)}
                className="w-8 h-8 flex items-center justify-center text-white bg-rose-600/80 hover:bg-rose-600 rounded-lg"
                aria-label="Delete photo"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
