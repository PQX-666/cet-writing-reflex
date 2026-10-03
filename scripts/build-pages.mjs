import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

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

try {
  const basePath = readBasePath(process.argv.slice(2));
  console.log(`Building GitHub Pages export for ${basePath || "/"} ...`);
  const result = spawnSync(process.execPath, [resolve(projectRoot, "node_modules/next/dist/bin/next"), "build"], {
    cwd: projectRoot,
    env: {
      ...process.env,
      NEXT_PUBLIC_GITHUB_PAGES: "1",
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    console.error(result.signal ? `Next.js build terminated with ${result.signal}.` : "Next.js static build failed.");
    process.exitCode = result.status ?? 1;
  } else {
    const output = resolve(projectRoot, ".next-pages");
    if (!existsSync(resolve(output, "index.html"))) {
      throw new Error("Expected .next-pages/index.html was not generated. Check the GitHub Pages Next.js configuration.");
    }
    writeFileSync(resolve(output, ".nojekyll"), "");
    console.log(`Static site ready in ${output}`);
    console.log("Preview with npm run preview:pages (use the same --base-path for a custom path).");
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
