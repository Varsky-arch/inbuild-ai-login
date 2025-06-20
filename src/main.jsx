import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard";

// Supabase setup
const supabase = createClient(
  "https://ptguiwznbrebhmtmqqua.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0Z3Vpd3puYnJlYmhtdG1xcXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTc4MDQsImV4cCI6MjA2NTg5MzgwNH0.zst-RX75xCUDGPBXujwpgFIhHAPyrZ4ig-678SSb4es",
);

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Cek session Supabase saat halaman pertama kali dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setLoggedIn(true);
    });

    // Listener login
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setLoggedIn(true);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage("Gagal login: " + error.message);
    } else {
      setMessage("Link login dikirim ke email kamu.");
    }
  };

  if (loggedIn) {
    return <Dashboard />;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>INBUILD AI Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Masukkan email kamu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Kirim Magic Link
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
