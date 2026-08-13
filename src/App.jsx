import { useEffect, useState } from "react";
import { fetchJobs, fetchCategories } from "./api/jobs";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      fetchJobs({ search, category }).then((data) => {
        setJobs(data);
        setLoading(false);
      });
    }, 250); // debounce search
    return () => clearTimeout(t);
  }, [search, category]);

  return (
    <div className="flex min-h-screen bg-[#030109]">
      <Sidebar
        categories={categories}
        active={category}
        onSelect={setCategory}
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-4">
<div className="flex items-center justify-between gap-4">
  <div>
    <h1 className="text-2xl font-bold  text-white">
      <span className="font-semibold tracking-wide">Jobs</span> for Freshers From{" "}
      <span className="font-semibold tracking-wide">Recognised</span> Companies Only!
    </h1>

    <p className="mt-1 text-sm text-white/50">
       Recognised & Trusted Companies Only
    </p>
  </div>

  <SearchBar value={search} onChange={setSearch} />
</div>
        <div className="mt-5">
          {loading ? (
            <p className="text-sm text-white/50">Loading jobs…</p>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-white/50">
              No jobs match that search yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.jobId} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
