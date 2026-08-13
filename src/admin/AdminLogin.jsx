import { useState } from "react";
import { verifyAdminKey } from "../api/admin";

export default function AdminLogin({ onSuccess }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setChecking(true);
    const ok = await verifyAdminKey(key);
    setChecking(false);
    if (ok) {
      sessionStorage.setItem("freshees_admin_key", key);
      onSuccess(key);
    } else {
      setError("Wrong admin key.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030109]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-[#1d1d1d] p-6"
      >
        <h1 className="text-center text-xl font-bold text-white">
          FRESHEES <span className="text-white/40">admin</span>
        </h1>

        <input
          type="password"
          autoFocus
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key"
          className="mt-5 w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-white/30"
        />

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={checking || !key}
          className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
        >
          {checking ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}