export default function Sidebar({ categories, active, onSelect }) {
  const items = ["All", ...categories];

  return (
<aside className="flex w-60 shrink-0 flex-col border-r border-white/10 bg-[#1d1d1d] p-5">
  <h1 className="text-center text-2xl font-bold text-white">
    FRESHEES
  </h1>


  <nav className="mt-4 flex flex-col gap-1">
    {items.map((c) => {
      const isActive = (c === "All" && !active) || c === active;

      return (
        <button
          key={c}
          onClick={() => onSelect(c === "All" ? "" : c)}
          className={`rounded-lg px-3 py-2 text-left text-  font-medium transition ${
            isActive
              ? "bg-[#f9f6ff] text-[#030109]"
              : "text-white/60 hover:bg-white/5"
          }`}
        >
          {c}
        </button>
      );
    })}
  </nav>
</aside>
  );
}