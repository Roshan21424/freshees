export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by company or role…"
      className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 outline-none focus:ring-2 focus:ring-fresh"
    />
  );
}
