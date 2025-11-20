import { useEffect, useState } from "react";

interface HealthStatus {
  status: string;
  service: string;
}

interface Module {
  name: string;
  type: string;
  status: string;
}

// In development with Vite proxy, use /api which proxies to backend
// In production or standalone, use VITE_API_URL env var or fallback
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Use proxy in dev mode, fallback to localhost in production
  return import.meta.env.DEV ? "/api" : "http://localhost:4000";
};

const API_URL = getApiUrl();

function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch health status
        const healthRes = await fetch(`${API_URL}/health`);
        if (!healthRes.ok) throw new Error("Failed to fetch health");
        const healthData = await healthRes.json();
        setHealth(healthData);

        // Fetch modules
        const modulesRes = await fetch(`${API_URL}/modules`);
        if (!modulesRes.ok) throw new Error("Failed to fetch modules");
        const modulesData = await modulesRes.json();
        setModules(modulesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>🚀 LexOrbital - Console Orbitale</h1>
        <p style={{ color: "#666" }}>
          Meta-Kernel + BackRing + FrontRing - POC V1
        </p>
      </header>

      {loading && <p>Chargement...</p>}

      {error && (
        <div
          style={{
            padding: "1rem",
            background: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px",
            marginBottom: "1rem",
            color: "#c33",
          }}
        >
          ❌ Erreur : {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <section style={{ marginBottom: "2rem" }}>
            <h2>📡 Statut du Service</h2>
            {health && (
              <div
                style={{
                  padding: "1rem",
                  background: "#eef",
                  border: "1px solid #ccf",
                  borderRadius: "4px",
                }}
              >
                <p>
                  <strong>Status:</strong> {health.status}
                </p>
                <p>
                  <strong>Service:</strong> {health.service}
                </p>
              </div>
            )}
          </section>

          <section>
            <h2>📦 Modules (Mockés)</h2>
            {modules.length === 0 ? (
              <p>Aucun module trouvé.</p>
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                {modules.map((module, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem",
                      background: "#f9f9f9",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    <p>
                      <strong>Nom:</strong> {module.name}
                    </p>
                    <p>
                      <strong>Type:</strong> {module.type}
                    </p>
                    <p>
                      <strong>Status:</strong> {module.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default App;
