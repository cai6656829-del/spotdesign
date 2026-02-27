import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("orders.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    phone TEXT,
    contactMethod TEXT,
    contactId TEXT,
    designStyle TEXT,
    dimensions TEXT,
    material TEXT,
    quantity INTEGER,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/orders", (req, res) => {
    const { email, phone, contactMethod, contactId, designStyle, dimensions, material, quantity } = req.body;
    const stmt = db.prepare(`
      INSERT INTO orders (email, phone, contactMethod, contactId, designStyle, dimensions, material, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(email, phone, contactMethod, contactId, designStyle, dimensions, material, quantity);
    res.json({ id: info.lastInsertRowid, success: true });
  });

  app.get("/api/orders", (req, res) => {
    const stmt = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC");
    const orders = stmt.all();
    res.json(orders);
  });

  app.patch("/api/orders/:id/status", (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const stmt = db.prepare("UPDATE orders SET status = ? WHERE id = ?");
    stmt.run(status, id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
