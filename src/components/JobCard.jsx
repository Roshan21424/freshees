import { useState } from "react";
import { ChevronDown, ChevronUp, Landmark, MapPin, Menu } from "lucide-react";

function timeAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function Section({ title, points }) {
  if (!points || points.length === 0) return null;
  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold  tracking-wide text-white/40">
        {title}
      </h4>
      <ul className="mt-1.5 space-y-1">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2 text-xs text-white/80">
            <span className="h-1 w-1 shrink-0 self-center rounded-full bg-white/50" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function JobCard({ job }) {
  const [open, setOpen] = useState(false);

  // one flat list instead of grouped categories, so it's a single glance
  const skills = job.skills?.flatMap((g) => g.items) || [];
  const linkLabel = job.applyLink.replace(/^https?:\/\//, "");

  return (
    <div className="rounded-xl tracking-wide bg-[#1d1d1d] p-5 transition hover:shadow-sm">
      {/* summary — click to expand */}
      <div className="cursor-pointer text-xs" onClick={() => setOpen(!open)}>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Landmark size={15} className="text-white/50" />

          <span className="text-sm font-medium text-white/70">
            {job.company}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 ">
          <span className="font-semibold tracking-wide text-white/40">
            Role Name:
          </span>
          <span className="font-medium text-white/70">{job.role}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 ">
          <span className="font-semibold tracking-wide text-white/40">
            Role Type:
          </span>
          <span className="font-medium text-white/70">{job.roleType}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 ">
          <span className="font-semibold tracking-wide text-white/40">
            Salary:
          </span>
          <span className="font-medium text-white/70">{job.salary}</span>
        </div>

        {skills.length > 0 && (
          <p className="mt-2  text-white/70">
            <span className="font-semibold tracking-wide text-white/40">
              Skills Needed:
            </span>{" "}
            {skills.join(", ")}
          </p>
        )}
      </div>

      {/* real, visible apply link — separate click target so toggling the card doesn't fight it */}

      <div className="mt-2 flex items-center gap-2 text-xs">
        <span className="font-semibold tracking-wide text-white/40">
          Apply Here:
        </span>
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="truncate text-blue-300 hover:underline"
        >
          {linkLabel}
        </a>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-white/90"
        >
          {open ? (
            <>
              Less
              <ChevronUp size={15} strokeWidth={2.5} />
            </>
          ) : (
            <>
              More
              <ChevronDown size={15} strokeWidth={2.5} />
            </>
          )}
        </button>
        <div className="flex items-center gap-1 text-xs text-[#b7b2b2]">
          <MapPin size={14} strokeWidth={2} />
          <span>{job.location}</span>
        </div>{" "}
      </div>

      {/* crux of the JD, expands within the card */}
      {open && (
        <div className="mt-3 border-t border-white/10 pt-3">
          <div className="flex items-center justify-center gap-2">
            <Menu size={16} className="text-white/40" />

            <p className="text-center text-sm font-semibold tracking-wide text-white/50">
              Summary of the Job Description
            </p>
          </div>

          <Section title="Role" points={[job.aboutRole]} />
          <Section title="Responsibilities" points={job.responsibilities} />
          <Section title="Qualifications" points={job.qualifications} />

          <Section
            title="Preferred qualifications"
            points={job.preferredQualifications}
          />

          <Section title="Benefits" points={job.benefits} />
          <Section title="About the company" points={[job.aboutCompany]} />
        </div>
      )}
    </div>
  );
}
