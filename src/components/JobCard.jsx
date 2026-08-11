import { Link } from "react-router-dom";
function timeAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function JobCard({ job, onClick }) {
  return (
    <button
      onClick={onClick}
      className="block w-full rounded-xl border border-line bg-white p-5 text-left transition hover:border-fresh/40 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink">{job.role}</h3>
          <p className="text-sm text-ink/60">{job.company} · {job.location}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-md bg-paper px-2 py-1 font-mono text-[11px] text-ink/50 border border-line">
            {job.jobId}
          </span>
          <span className="text-[11px] text-ink/40">{timeAgo(job.postedAt)}</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-fresh/10 px-2.5 py-1 font-medium text-freshdark">{job.roleType}</span>
        <span className="rounded-full bg-paper px-2.5 py-1 text-ink/60 border border-line">{job.salary}</span>
      </div>

      {job.skills?.length > 0 && (
        <div className="mt-3 space-y-1">
          {job.skills.map((group) => (
            <p key={group.category} className="text-xs text-ink/60">
              <span className="font-medium text-ink/80">{group.category}:</span> {group.items.join(", ")}
            </p>
          ))}
        </div>
      )}

      <p className="mt-3 text-[11px] font-medium text-fresh">View details →</p>
    </button>
  );
}