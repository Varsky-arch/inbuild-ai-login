// 📁 src/Dashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setProjects(data);
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Daftar Proyek</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
        + Tambah Proyek
      </button>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Lokasi</th>
              <th className="border p-2">Deadline</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border p-2">{project.name}</td>
                <td className="border p-2">{project.location}</td>
                <td className="border p-2">{project.deadline}</td>
                <td className="border p-2">{project.status}</td>
                <td className="border p-2">
                  <div className="w-full bg-gray-200 rounded h-3">
                    <div
                      className="bg-green-500 h-3 rounded"
                      style={{ width: `${project.progress || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{project.progress || 0}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
