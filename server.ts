import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add specific route with range request logging / verification for video.mp4
  // Express handles ranges out of the box with res.sendFile
  app.get("/video.mp4", (req, res, next) => {
    const videoPath = path.join(process.cwd(), "public", "video.mp4");
    res.sendFile(videoPath, {
      acceptRanges: true,
    }, (err) => {
      if (err) {
        console.error("Error serving video.mp4:", err);
        next();
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
