import { Heart } from "lucide-react";

export default function SuccessStoryCard({ story }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={story.photo}
          alt={`${story.husband} & ${story.wife}`}
          className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/50"
        />
        <div>
          <p className="font-display text-lg font-semibold text-white">
            {story.husband} <Heart size={13} className="inline text-rose-400 mx-1" fill="currentColor" /> {story.wife}
          </p>
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wide">
            Married — {story.marriageDate}
          </p>
        </div>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">"{story.story}"</p>
    </div>
  );
}
