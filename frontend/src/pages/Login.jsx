import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form); // placeholder backend
      console.log(res.data);
      setMessage("Logged in (placeholder). Redirecting...");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">JobHunt Copilot</h1>
        <p className="mb-4 text-sm text-slate-300 text-center">
          Placeholder login – real auth will come later.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400"
          >
            Log in
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-emerald-300">{message}</p>
        )}
      </div>
    </div>
  );
}
