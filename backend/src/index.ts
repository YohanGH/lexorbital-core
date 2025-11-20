import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Mocked modules data
const mockedModules = [
  { name: "demo-auth", type: "back", status: "mocked" },
  { name: "demo-audit", type: "back", status: "mocked" },
];

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "lexorbital-core",
  });
});

// Modules endpoint (mocked for now)
app.get("/modules", (_req, res) => {
  res.json(mockedModules);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LexOrbital BackRing running on http://localhost:${PORT}`);
  console.log(`📡 Health: http://localhost:${PORT}/health`);
  console.log(`📦 Modules: http://localhost:${PORT}/modules`);
});

export default app;
