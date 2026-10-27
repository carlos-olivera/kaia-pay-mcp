import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const read = (path) => readFileSync(join(root, path), "utf8");

const plugin = JSON.parse(read(".claude-plugin/plugin.json"));
const mcp = JSON.parse(read(".mcp.json"));
const errors = [];

if (plugin.name !== "kaia-pay") errors.push("plugin name");
if (!plugin.description || !plugin.version || !plugin.author?.name || !plugin.license) {
  errors.push("plugin.json missing directory fields");
}
const server = mcp.mcpServers?.["kaia-pay"];
if (server?.type !== "http" || server.url !== "https://mcp.kaia-pay.pay-bo.com/mcp") {
  errors.push(".mcp.json must point at the production MCP URL");
}

const skills = ["cobrar", "reenviar-qr", "ventas-hoy", "qr-vencidos"];
for (const name of skills) {
  const text = read(`skills/${name}/SKILL.md`);
  if (!text.startsWith("---\n") || !text.includes(`name: ${name}`) || !text.includes("description:")) {
    errors.push(`skill frontmatter: ${name}`);
  }
}

const cobrar = read("skills/cobrar/SKILL.md");
for (const phrase of ["create_qr_charge", "get_qr_image", "get_payment_status", "encript64"]) {
  if (!cobrar.includes(phrase)) errors.push(`cobrar skill missing ${phrase}`);
}
if (/\b(cart_id|codProducto|catProducto)\s*:/.test(cobrar)) {
  errors.push("cobrar skill must not pass SKU fields");
}

const html = read("ui/qr-charge.html");
for (const phrase of [
  "ui/initialize",
  "ui/notifications/initialized",
  "ui/notifications/tool-result",
  "Mostrar QR al cliente",
  "qr_image_url",
  "get_payment_status",
]) {
  if (!html.includes(phrase)) errors.push(`ui missing ${phrase}`);
}
if (/<script[^>]+src=/.test(html) || /unpkg\.com|esm\.sh|cdn\./.test(html)) {
  errors.push("ui must stay self-contained");
}

const readme = read("README.md");
for (const phrase of ["Security model", "mcp.kaia-pay.pay-bo.com/mcp", "kp:read", "kp:charge", "encript64"]) {
  if (!readme.includes(phrase)) errors.push(`README missing ${phrase}`);
}
const prose = readme.replace(/```[\s\S]*?```/g, " ");
const words = prose.split(/\s+/).filter(Boolean).length;
if (words < 40) errors.push(`README prose too short (${words})`);

const secret = new RegExp(
  ["sk_" + "live", "sk_" + "test", "rk_" + "live", "rk_" + "test", "BEGIN PRIVATE KEY", "client_" + "secret"].join("|"),
  "i",
);
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".git" || entry === "node_modules" || entry === "check-scaffold.mjs") continue;
    const path = join(dir, entry);
    const st = statSync(path);
    if (st.isDirectory()) walk(path);
    else if (st.size < 256 * 1024 && !path.endsWith(".png")) {
      const body = readFileSync(path, "utf8");
      if (secret.test(body)) errors.push(`secret-like pattern in ${path}`);
    }
  }
}
walk(root);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("scaffold ok");
