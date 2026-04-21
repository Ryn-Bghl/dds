import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const DATA_FILE = path.join(__dirname, "public", "data.json");

const server = http.createServer((req, res) => {
  // Enable CORS for local development
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Save content endpoint
  if (req.method === "POST" && req.url === "/api/save-content") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        // Validate data structure
        if (!data.home || !data.settings) {
          throw new Error("Invalid data structure");
        }

        // Write to file with pretty formatting
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Content saved" }));
        console.log("✅ Content saved to public/data.json");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
        console.error("❌ Error saving content:", err.message);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(
    `\n🎵 Development API server running on http://localhost:${PORT}`,
  );
  console.log("📝 Listening for content saves at POST /api/save-content\n");
});
