// backend/src/routes/jobRoutes.js
const express = require("express");
const router = express.Router();

// temporary in-memory jobs (later replace with PostgreSQL)
let jobs = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "Example Corp",
    status: "Applied",
    location: "Remote",
    link: "https://example.com/job",
  },
];

// GET /api/jobs
router.get("/", (req, res) => {
  res.json(jobs);
});

// POST /api/jobs
router.post("/", (req, res) => {
  const { title, company, status, location, link } = req.body;

  const newJob = {
    id: jobs.length + 1,
    title,
    company,
    status: status || "Interested",
    location: location || "",
    link: link || "",
  };

  jobs.push(newJob);
  res.status(201).json(newJob);
});

// PATCH /api/jobs/:id
router.patch("/:id", (req, res) => {
  const jobId = Number(req.params.id);
  const { status, title, company, location, link } = req.body;

  const job = jobs.find((j) => j.id === jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (status) job.status = status;
  if (title) job.title = title;
  if (company) job.company = company;
  if (location) job.location = location;
  if (link) job.link = link;

  res.json(job);
});

// DELETE /api/jobs/:id
router.delete("/:id", (req, res) => {
  const jobId = Number(req.params.id);
  jobs = jobs.filter((j) => j.id !== jobId);
  res.status(204).send();
});

module.exports = router;
