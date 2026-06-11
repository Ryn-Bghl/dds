import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// On utilise le port fourni par Infomaniak ou 3001 par défaut
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "public", "data.json");
const DIST_PATH = path.join(__dirname, "dist");

const server = http.createServer((req, res) => {
  // Enable CORS for local development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // --- API ENDPOINTS ---

  // Get content endpoint
  if (req.method === "GET" && req.url === "/api/get-content") {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf8");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Data file not found" }));
      }
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // Save content endpoint
  if (req.method === "POST" && req.url === "/api/save-content") {
    let body = "";
    req.on("data", (chunk) => { body += chunk.toString(); });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Content saved" }));
        console.log("✅ Content saved to public/data.json");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- STATIC FILES SERVING (For Infomaniak/Production) ---
  
  // Si on n'est pas sur une API, on essaie de servir le dossier 'dist'
  let filePath = path.join(DIST_PATH, req.url === "/" ? "index.html" : req.url);
  
  // Protection simple contre la navigation hors du dossier dist
  if (!filePath.startsWith(DIST_PATH)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.exists(filePath, (exists) => {
    if (exists && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      const contentTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
      };
      res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // Fallback vers index.html pour le routage SPA (React)
      const indexHtml = path.join(DIST_PATH, "index.html");
      if (fs.existsSync(indexHtml)) {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream(indexHtml).pipe(res);
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    }
  });
});

server.listen(PORT, () => {
  console.log("\n\x1b[32m%s\x1b[0m", `  ➜  Local:   http://localhost:${PORT}/`);
  console.log(`  🎵 Server running on port ${PORT}`);
  console.log(`  📝 API: http://localhost:${PORT}/api/get-content\n`);
});
