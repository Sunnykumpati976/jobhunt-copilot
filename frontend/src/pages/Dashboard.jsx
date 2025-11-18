import { useEffect, useState } from "react";
import api from "../services/api";

const STATUSES = ["Interested", "Applied", "Interviewing", "Offer", "Rejected"];

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "Interested",
    location: "",
    link: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs", form);
      setForm({
        title: "",
        company: "",
        status: "Interested",
        location: "",
        link: "",
      });
      fetchJobs();
    } catch (err) {
      console.error("Failed to add job:", err);
    }
  };

  const moveJob = async (id, newStatus) => {
    try {
      await api.patch(`/jobs/${id}`, { status: newStatus });
      fetchJobs();
    } catch (err) {
      console.error("Failed to move job:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h1 className="text-xl font-bold">JobHunt Copilot – Dashboard</h1>
      </header>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Add job form */}
        <section className="lg:col-span-1 bg-slate-800 p-4 rounded-xl">
          <h2 className="font-semibold mb-3 text-lg">Add Job</h2>
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <input
              type="text"
              name="title"
              placeholder="Job title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700"
            />
            <input
              type="text"
              name="link"
              placeholder="Job link"
              value={form.link}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700"
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700"
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full py-2 rounded bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400"
            >
              Save
            </button>
          </form>
        </section>

        {/* Columns */}
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUSES.map((status) => (
            <div key={status} className="bg-slate-800 p-3 rounded-xl">
              <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                {status}
              </h3>
              <div className="space-y-2">
                {jobs
                  .filter((j) => j.status === status)
                  .map((job) => (
                    <div
                      key={job.id}
                      className="bg-slate-900 p-3 rounded border border-slate-700 text-xs"
                    >
                      <div className="font-semibold">{job.title}</div>
                      <div className="text-slate-300">{job.company}</div>
                      {job.location && (
                        <div className="text-slate-400 text-[11px]">
                          {job.location}
                        </div>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {STATUSES.filter((s) => s !== status).map((s) => (
                          <button
                            key={s}
                            onClick={() => moveJob(job.id, s)}
                            className="px-2 py-1 rounded bg-slate-800 border border-slate-600 hover:bg-slate-700"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
