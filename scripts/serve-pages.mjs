import { createReadStream, realpathSync, statSync } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const exportRoot = resolve(projectRoot, ".next-pages");

function readBasePath(args) {
  let basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/cet-writing-reflex";
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--base-path" && args[index + 1] !== undefined) {
      basePath = args[++index];
    } else if (argument.startsWith("--base-path=")) {
      basePath = argument.slice("--base-path=".length);
    } else {
      throw new Error(`Unknown or incomplete argument: ${argument}`);
    }
  }
  basePath = basePath.replace(/\/+$/, "");
  if (basePath && (!/^\/[a-zA-Z0-9._~/-]+$/.test(basePath) || basePath.includes("//") || basePath.split("/").some((part) => part === "." || part === ".."))) {
    throw new Error("basePath must be an absolute URL path without query, fragment, or dot segments.");
  }
  return basePath;
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".wasm": "application/wasm",
  ".xml": "application/xml; charset=utf-8",
  ".pdf": "application/pdf",
};

function isWithinRoot(root, candidate) {
  const path = relative(root, candidate);
  return path !== ".." && !path.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`) && !isAbsolute(path);
}

export function createPagesServer({ root = exportRoot, basePath = "/cet-writing-reflex" } = {}) {
  const safeRoot = realpathSync(root);
  if (!statSync(resolve(safeRoot, "index.html")).isFile()) {
    throw new Error("Static index.html is missing. Run npm run build:pages first.");
  }
  return createServer(async (request, response) => {
    const reply = (status, message) => {
      response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
      response.end(request.method === "HEAD" ? undefined : message);
    };
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.setHeader("Allow", "GET, HEAD");
      reply(405, "Method not allowed");
      return;
    }
    const rawUrl = request.url ?? "/";
    if (!rawUrl.startsWith("/")) {
      reply(400, "Invalid request path");
      return;
    }
    const separator = rawUrl.indexOf("?");
    const rawPath = separator === -1 ? rawUrl : rawUrl.slice(0, separator);
    const query = separator === -1 ? "" : rawUrl.slice(separator);
    let pathname;
    try {
      pathname = decodeURIComponent(rawPath);
    } catch {
      reply(400, "Invalid path encoding");
      return;
    }
    if (pathname.includes("\\") || pathname.includes("\0") || pathname.split("/").some((part) => part === "." || part === "..")) {
      reply(400, "Invalid request path");
      return;
    }
    if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
      reply(404, "Not found");
      return;
    }
    const localPath = pathname.slice(basePath.length) || "/";
    let candidate = resolve(safeRoot, `.${localPath}`);
    if (!isWithinRoot(safeRoot, candidate)) {
      reply(404, "Not found");
      return;
    }
    try {
      let file = await stat(candidate);
      if (file.isDirectory()) {
        if (!pathname.endsWith("/")) {
          response.writeHead(308, { Location: `${rawPath}/${query}`, "Cache-Control": "no-store" });
          response.end();
          return;
        }
        candidate = resolve(candidate, "index.html");
        file = await stat(candidate);
      }
      const safeFile = await realpath(candidate);
      if (!file.isFile() || !isWithinRoot(safeRoot, safeFile)) {
        reply(404, "Not found");
        return;
      }
      let contentType = mimeTypes[extname(safeFile).toLowerCase()] ?? "application/octet-stream";
      if (safeFile.endsWith(".txt") && (/(?:^|[/\\])(?:index|__next[^/\\]*)\.txt$/.test(safeFile) || /(?:^|[?&])_rsc(?:=|&|$)/.test(query))) {
        contentType = "text/x-component; charset=utf-8";
      }
      response.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": file.size,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      if (request.method === "HEAD") {
        response.end();
        return;
      }
      const stream = createReadStream(safeFile);
      stream.on("error", () => response.destroy());
      stream.pipe(response);
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") {
        reply(404, "Not found");
      } else {
        reply(500, "Unable to read static file");
      }
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const basePath = readBasePath(process.argv.slice(2));
    const server = createPagesServer({ basePath });
    server.on("error", (error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
    server.listen(3002, "127.0.0.1", () => {
      console.log(`GitHub Pages preview: http://127.0.0.1:3002${basePath}/`);
      console.log(`Serving ${exportRoot}; unknown paths return 404. Press Ctrl+C to stop.`);
    });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
