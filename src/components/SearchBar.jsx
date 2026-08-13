import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-2/6">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="w-full rounded-full border border-white/10 bg-[#1d1d1d] py-2 pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-fresh"
      />
    </div>
  );
}