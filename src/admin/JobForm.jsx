import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

const EMPTY_JOB = {
  jobId: "",
  company: "",
  role: "",
  roleType: "Full-time",
  location: "",
  salary: "",
  category: "",
  skills: [],
  aboutRole: "",
  responsibilities: [],
  qualifications: [],
  preferredQualifications: [],
  benefits: [],
  aboutCompany: "",
  applyLink: "",
};

// helpers: array-of-strings <-> newline textarea
const toLines = (arr) => (arr || []).join("\n");
const fromLines = (str) =>
  str
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-wide text-white/40">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-white/30";

export default function JobForm({ initialJob, isEdit, onCancel, onSubmit, saving, error }) {
  const [job, setJob] = useState(() =>
    initialJob
      ? {
          ...initialJob,
          skills: initialJob.skills || [],
        }
      : EMPTY_JOB
  );

  function set(field, value) {
    setJob((j) => ({ ...j, [field]: value }));
  }

  function updateSkillGroup(i, field, value) {
    setJob((j) => {
      const skills = [...j.skills];
      skills[i] = { ...skills[i], [field]: value };
      return { ...j, skills };
    });
  }

  function addSkillGroup() {
    setJob((j) => ({ ...j, skills: [...j.skills, { category: "", items: [] }] }));
  }

  function removeSkillGroup(i) {
    setJob((j) => ({ ...j, skills: j.skills.filter((_, idx) => idx !== i) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(job);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-xl bg-[#1d1d1d] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {isEdit ? "Edit job" : "New job"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1 text-white/50 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Job ID (e.g. FR-1042)">
            <input
              className={inputClass}
              value={job.jobId}
              disabled={isEdit}
              onChange={(e) => set("jobId", e.target.value)}
              required
            />
          </Field>
          <Field label="Category (used by filter chips)">
            <input
              className={inputClass}
              value={job.category}
              onChange={(e) => set("category", e.target.value)}
              required
            />
          </Field>

          <Field label="Company">
            <input
              className={inputClass}
              value={job.company}
              onChange={(e) => set("company", e.target.value)}
              required
            />
          </Field>
          <Field label="Role">
            <input
              className={inputClass}
              value={job.role}
              onChange={(e) => set("role", e.target.value)}
              required
            />
          </Field>

          <Field label="Role type">
            <select
              className={inputClass}
              value={job.roleType}
              onChange={(e) => set("roleType", e.target.value)}
            >
              <option>Full-time</option>
              <option>Internship</option>
            </select>
          </Field>
          <Field label="Location">
            <input
              className={inputClass}
              value={job.location}
              onChange={(e) => set("location", e.target.value)}
              required
            />
          </Field>

          <Field label="Salary">
            <input
              className={inputClass}
              placeholder="Not disclosed"
              value={job.salary}
              onChange={(e) => set("salary", e.target.value)}
            />
          </Field>
          <Field label="Apply link">
            <input
              className={inputClass}
              value={job.applyLink}
              onChange={(e) => set("applyLink", e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="mt-3">
          <Field label="About the role (1-2 line crux)">
            <textarea
              className={inputClass}
              rows={2}
              value={job.aboutRole}
              onChange={(e) => set("aboutRole", e.target.value)}
              required
            />
          </Field>
        </div>

        <div className="mt-3">
          <Field label="About the company (1-2 line crux)">
            <textarea
              className={inputClass}
              rows={2}
              value={job.aboutCompany}
              onChange={(e) => set("aboutCompany", e.target.value)}
              required
            />
          </Field>
        </div>

        {/* skills, grouped */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide text-white/40">
              Skills (grouped by category)
            </span>
            <button
              type="button"
              onClick={addSkillGroup}
              className="flex items-center gap-1 text-xs text-white/60 hover:text-white"
            >
              <Plus size={14} /> Add group
            </button>
          </div>

          <div className="mt-2 space-y-2">
            {job.skills.map((g, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={inputClass + " max-w-[140px]"}
                  placeholder="Category, e.g. Backend"
                  value={g.category}
                  onChange={(e) => updateSkillGroup(i, "category", e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Items, comma separated, e.g. Node, Express"
                  value={(g.items || []).join(", ")}
                  onChange={(e) =>
                    updateSkillGroup(
                      i,
                      "items",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => removeSkillGroup(i)}
                  className="shrink-0 rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* one-per-line list fields */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Responsibilities (one per line)">
            <textarea
              className={inputClass}
              rows={4}
              value={toLines(job.responsibilities)}
              onChange={(e) => set("responsibilities", fromLines(e.target.value))}
            />
          </Field>
          <Field label="Qualifications (one per line)">
            <textarea
              className={inputClass}
              rows={4}
              value={toLines(job.qualifications)}
              onChange={(e) => set("qualifications", fromLines(e.target.value))}
            />
          </Field>
          <Field label="Preferred qualifications (one per line)">
            <textarea
              className={inputClass}
              rows={3}
              value={toLines(job.preferredQualifications)}
              onChange={(e) =>
                set("preferredQualifications", fromLines(e.target.value))
              }
            />
          </Field>
          <Field label="Benefits (one per line)">
            <textarea
              className={inputClass}
              rows={3}
              value={toLines(job.benefits)}
              onChange={(e) => set("benefits", fromLines(e.target.value))}
            />
          </Field>
        </div>

        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
          >
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create job"}
          </button>
        </div>
      </form>
    </div>
  );
}