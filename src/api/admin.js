const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/jobs";

function headers(adminKey) {
  return {
    "Content-Type": "application/json",
    "x-admin-key": adminKey,
  };
}

export async function verifyAdminKey(adminKey) {
  const res = await fetch(`${BASE}/verify-admin`, {
    method: "POST",
    headers: headers(adminKey),
  });
  return res.ok;
}

export async function createJob(adminKey, job) {
  const res = await fetch(`${BASE}`, {
    method: "POST",
    headers: headers(adminKey),
    body: JSON.stringify(job),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create job");
  return data;
}

export async function updateJob(adminKey, jobId, job) {
  const res = await fetch(`${BASE}/${jobId}`, {
    method: "PUT",
    headers: headers(adminKey),
    body: JSON.stringify(job),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update job");
  return data;
}

export async function deleteJob(adminKey, jobId) {
  const res = await fetch(`${BASE}/${jobId}`, {
    method: "DELETE",
    headers: headers(adminKey),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete job");
  return data;
}