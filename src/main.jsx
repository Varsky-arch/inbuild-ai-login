import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { supabase } from "./supabaseClient";
import Dashboard from "./Dashboard";

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    // Cek apakah user sudah ada
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (existingUser) {
      setLoggedIn(true);
      setMessage("");
    } else {
      // Jika belum ada, langsung buat user baru
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{ username }])
        .single();

      if (insertError) {
        setMessage("Gagal mendaftarkan pengguna");
        console.error(insertError);
      } else {
        setLoggedIn(true);
        setMessage("");
      }
    }
  };

  if (loggedIn) return <Dashboard username={username} />;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Login INBUILD AI</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: "0.5rem", width: "250px" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            marginLeft: "1rem",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
          }}
        >
          Masuk / Daftar
        </button>
      </form>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
