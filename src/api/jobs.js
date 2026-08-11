const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/jobs";

export async function fetchJobs({ search = "", category = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  const res = await fetch(`${BASE}?${params}`);
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories`);
  return res.json();
}

export async function fetchJob(jobId) {
  const res = await fetch(`${BASE}/${jobId}`);
  if (!res.ok) return null;
  return res.json();
}