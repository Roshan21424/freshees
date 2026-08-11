import { useEffect, useState } from "react";
import { fetchJobs, fetchCategories } from "./api/jobs";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import JobCard from "./components/JobCard";
import JobDetailModal from "./components/JobDetailModal";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

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
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-ink">freshees</h1>
            <span className="rounded-full bg-fresh/10 px-2.5 py-1 text-[11px] font-medium text-freshdark">
              No startups. Only big companies.
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/60">
            Jobs for freshers, straight from company career pages.
          </p>

          <div className="mt-4">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="mt-3">
            <CategoryFilter categories={categories} active={category} onSelect={setCategory} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {loading ? (
          <p className="text-sm text-ink/50">Loading jobs…</p>
        ) : jobs.length === 0 ? (
          <p className="text-sm text-ink/50">No jobs match that search yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.jobId} job={job} onClick={() => setSelectedJob(job)} />
            ))}
          </div>
        )}
      </main>

      {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}