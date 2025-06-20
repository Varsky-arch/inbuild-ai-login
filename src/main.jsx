// 📁 src/main.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { supabase } from "./supabaseClient";
import Dashboard from "./Dashboard"; // ganti sesuai lokasi file dashboard

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("users") // pastikan ini huruf kecil semua
      .select("*")
      .eq("username", username)
      .single();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error || !data) {
      setMessage("❌ Username tidak ditemukan.");
    } else {
      setMessage("✅ Login berhasil.");
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return <Dashboard />;
  }

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
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
