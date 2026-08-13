import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2, ArrowLeft } from "lucide-react";
import { fetchJobs } from "../api/jobs";
import { createJob, updateJob, deleteJob } from "../api/admin";
import AdminLogin from "./AdminLogin";
import JobForm from "./JobForm";

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(
    () => sessionStorage.getItem("freshees_admin_key") || ""
  );
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState(null); // null | "new" | jobObject
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  function loadJobs() {
    setLoading(true);
    fetchJobs().then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (adminKey) loadJobs();
  }, [adminKey]);

  if (!adminKey) {
    return <AdminLogin onSuccess={setAdminKey} />;
  }

  async function handleSubmit(job) {
    setSaving(true);
    setFormError("");
    try {
      if (formState !== "new") {
        await updateJob(adminKey, job.jobId, job);
      } else {
        await createJob(adminKey, job);
      }
      setFormState(null);
      loadJobs();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(jobId) {
    if (!confirm(`Delete job ${jobId}? This can't be undone.`)) return;
    await deleteJob(adminKey, jobId);
    loadJobs();
  }

  function logout() {
    sessionStorage.removeItem("freshees_admin_key");
    setAdminKey("");
  }

  return (
    <div className="min-h-screen bg-[#030109] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1 text-sm text-white/50 hover:text-white"
            >
              <ArrowLeft size={16} /> Site
            </Link>
            <h1 className="text-xl font-bold text-white">
              FRESHEES <span className="text-white/40">admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormState("new")}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-white/90"
            >
              <Plus size={15} /> New job
            </button>
            <button
              onClick={logout}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/50 hover:bg-white/10"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-white/50">Loading jobs…</p>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-white/50">No jobs posted yet.</p>
          ) : (
            <div className="overflow-hidden rounded-xl bg-[#1d1d1d]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs text-white/40">
                    <th className="px-4 py-3 font-semibold">Job ID</th>
                    <th className="px-4 py-3 font-semibold">Company</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr
                      key={job.jobId}
                      className="border-b border-white/5 text-white/80 last:border-0"
                    >
                      <td className="px-4 py-3 text-white/50">{job.jobId}</td>
                      <td className="px-4 py-3">{job.company}</td>
                      <td className="px-4 py-3">{job.role}</td>
                      <td className="px-4 py-3">{job.category}</td>
                      <td className="px-4 py-3">{job.location}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setFormState(job)}
                            className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(job.jobId)}
                            className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-red-400"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {formState && (
        <JobForm
          key={formState === "new" ? "new" : formState.jobId}
          initialJob={formState === "new" ? null : formState}
          isEdit={formState !== "new"}
          onCancel={() => {
            setFormState(null);
            setFormError("");
          }}
          onSubmit={handleSubmit}
          saving={saving}
          error={formError}
        />
      )}
    </div>
  );
}