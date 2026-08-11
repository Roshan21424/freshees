import { useEffect } from "react";

function Section({ title, points }) {
  if (!points || points.length === 0) return null;
  return (
    <div className="mt-5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50">{title}</h3>
      <ul className="mt-2 space-y-1.5">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink/80">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fresh" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JobDetailModal({ job, onClose }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

return (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-[90vh] w-[90vw] max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-lg"
    >
      <div className="flex-1 overflow-y-auto p-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-ink">
              {job.role}
            </h2>

            <p className="mt-1 text-sm text-ink/60">
              {job.company} · {job.location}
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 text-ink/40 hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-fresh/10 px-2.5 py-1 font-medium text-freshdark">
            {job.roleType}
          </span>

          <span className="rounded-full border border-line bg-paper px-2.5 py-1 text-ink/60">
            {job.salary}
          </span>

          <span className="rounded-full border border-line bg-paper px-2.5 py-1 text-ink/60">
            {job.category}
          </span>
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="mt-4 space-y-1">
            {job.skills.map((group) => (
              <p
                key={group.category}
                className="text-sm text-ink/70"
              >
                <span className="font-medium text-ink">
                  {group.category}:
                </span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        )}

        <Section
          title="About the role"
          points={job.aboutRole ? [job.aboutRole] : []}
        />

        <Section
          title="Responsibilities"
          points={job.responsibilities}
        />

        <Section
          title="Qualifications"
          points={job.qualifications}
        />

        <Section
          title="Preferred qualifications"
          points={job.preferredQualifications}
        />

        <Section
          title="Benefits"
          points={job.benefits}
        />

        <Section
          title="About the company"
          points={job.aboutCompany ? [job.aboutCompany] : []}
        />

        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1 rounded-lg bg-fresh px-4 py-2 text-sm font-medium text-white hover:bg-freshdark"
        >
          Apply on company site ↗
        </a>

      </div>
    </div>
  </div>
);
}