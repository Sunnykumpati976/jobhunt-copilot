# JobHunt Copilot 🎯

JobHunt Copilot is a full-stack web app that helps students and early-career developers track their job and internship applications on a simple Kanban-style board.

You can add jobs, move them through stages like **Interested → Applied → Interviewing → Offer → Rejected**, and keep everything in one place instead of losing track in random Excel sheets and notes apps.

---

## 🚀 Features

- **Kanban board for applications**
  - Columns: `Interested`, `Applied`, `Interviewing`, `Offer`, `Rejected`
  - Move jobs between stages with one click

- **Job CRUD**
  - Add jobs with title, company, location, and job link
  - Persisted in **PostgreSQL**, not in-memory
  - Changes survive refreshes and restarts

- **Full-stack architecture**
  - React + Vite + Tailwind CSS frontend
  - Node.js + Express backend
  - PostgreSQL database with `users` and `jobs` tables

- **Future ideas (planned)**
  - User authentication (JWT) so each user has their own dashboard
  - AI “copilot” features: summarize job descriptions, extract skills, generate cover letter paragraphs
  - Deploy to cloud (Render / Railway + Vercel/Netlify)

---

## 🧱 Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js
- Express
- pg (PostgreSQL client)
- dotenv
- nodemon (dev)

**Database**
- PostgreSQL

---

## 🗂 Project Structure

```bash
jobhunt-copilot/
  backend/
    src/
      server.js
      routes/
        jobRoutes.js
      db.js
    package.json
    .env (not committed)
  frontend/
    src/
      main.jsx
      index.css
      services/
        api.js
      pages/
        Login.jsx
        Dashboard.jsx
    package.json
  README.md
