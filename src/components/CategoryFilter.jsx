export default function CategoryFilter({ categories, active, onSelect }) {
  const chips = ["All", ...categories];
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => {
        const isActive = (c === "All" && !active) || c === active;
        return (
          <button
            key={c}
            onClick={() => onSelect(c === "All" ? "" : c)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "border-fresh bg-fresh text-white"
                : "border-line bg-white text-ink/70 hover:border-fresh/50"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
