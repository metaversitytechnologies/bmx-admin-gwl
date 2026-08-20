import fs from "fs";
import path from "path";

const root = process.cwd();
const sourceExts = [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass", ".less"];
const codeExts = [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass", ".less"];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (["node_modules", "admin", ".git"].includes(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }

  return files;
}

function toRel(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith(".")) return null;

  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    base,
    ...sourceExts.map((ext) => `${base}${ext}`),
    ...["index.js", "index.jsx", "index.ts", "index.tsx"].map((name) =>
      path.join(base, name)
    ),
  ];

  return candidates.find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch {
      return false;
    }
  });
}

function packageName(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

const files = walk(root).filter((file) => {
  const rel = toRel(file);
  return (
    rel.startsWith("src/") ||
    rel.startsWith("public/") ||
    ["package.json", "vite.config.js", "index.html"].includes(rel)
  );
});

const codeFiles = files.filter((file) => {
  const rel = toRel(file);
  return codeExts.includes(path.extname(file)) || rel === "index.html";
});

const imports = new Map();
const importedBy = new Map();
const packages = new Map();
const dynamicImports = [];
const stringPublicRefs = new Map();

for (const file of codeFiles) {
  const rel = toRel(file);
  const text = fs.readFileSync(file, "utf8");
  const localImports = [];
  const specifiers = [];
  const importFromRegex = /import\s+[^;"'`]*?\s+from\s+["'`]([^"'`]+)["'`]/g;
  const sideEffectImportRegex = /import\s+["'`]([^"'`]+)["'`]/g;
  const dynamicImportRegex = /import\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
  const requireRegex = /require\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g;

  let match;
  while ((match = importFromRegex.exec(text))) specifiers.push({ specifier: match[1] });
  while ((match = sideEffectImportRegex.exec(text))) specifiers.push({ specifier: match[1] });
  while ((match = dynamicImportRegex.exec(text))) {
    specifiers.push({ specifier: match[1], dynamic: true });
  }
  while ((match = requireRegex.exec(text))) specifiers.push({ specifier: match[1] });

  for (const { specifier, dynamic } of specifiers) {
    const resolved = resolveImport(file, specifier);

    if (dynamic) dynamicImports.push({ from: rel, specifier });

    if (resolved) {
      const target = toRel(resolved);
      localImports.push(target);
      if (!importedBy.has(target)) importedBy.set(target, []);
      importedBy.get(target).push(rel);
    } else if (!specifier.startsWith(".")) {
      const pkg = packageName(specifier);
      if (!packages.has(pkg)) packages.set(pkg, new Set());
      packages.get(pkg).add(rel);
    }
  }

  imports.set(rel, localImports);

  const publicRefRegex = /["'`](\/(?:Images|img)\/[^"'`]+)["'`]/g;
  while ((match = publicRefRegex.exec(text))) {
    if (!stringPublicRefs.has(match[1])) stringPublicRefs.set(match[1], []);
    stringPublicRefs.get(match[1]).push(rel);
  }
}

const reachable = new Set(["src/main.jsx"]);
const stack = ["src/main.jsx"];

while (stack.length) {
  const current = stack.pop();
  for (const target of imports.get(current) || []) {
    if (!reachable.has(target)) {
      reachable.add(target);
      stack.push(target);
    }
  }
}

const srcFiles = files
  .map(toRel)
  .filter((rel) => rel.startsWith("src/") && sourceExts.includes(path.extname(rel)));
const publicFiles = files
  .map(toRel)
  .filter((rel) => rel.startsWith("public/") && !rel.endsWith(".DS_Store"));

const unreachable = srcFiles.filter((rel) => !reachable.has(rel));
const cssFiles = srcFiles.filter((rel) => /\.(s?css|sass|less)$/.test(rel));
const jsFiles = srcFiles.filter((rel) => /\.(js|jsx|ts|tsx)$/.test(rel));
const probableUnusedAssets = [];
const referencedAssets = [];

for (const asset of publicFiles) {
  const publicPath = `/${asset.replace(/^public\//, "")}`;
  const fileName = path.basename(asset);
  const refs = [];

  for (const file of codeFiles) {
    const rel = toRel(file);
    const text = fs.readFileSync(file, "utf8");
    if (text.includes(publicPath) || text.includes(fileName)) refs.push(rel);
  }

  if (refs.length) referencedAssets.push({ asset, refs: [...new Set(refs)] });
  else probableUnusedAssets.push(asset);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const dependencies = Object.keys(packageJson.dependencies || {});
const dependencyUsage = dependencies.map((dependency) => ({
  dependency,
  usedBy: [...(packages.get(dependency) || [])].sort(),
}));

const result = {
  counts: {
    allFiles: files.length,
    srcFiles: srcFiles.length,
    jsFiles: jsFiles.length,
    cssFiles: cssFiles.length,
    reachableFiles: reachable.size,
    unreachableFiles: unreachable.length,
    probableUnusedAssets: probableUnusedAssets.length,
  },
  routeEntrypoint: "src/component/common/main/Main.jsx",
  dynamicImports,
  cssFiles: cssFiles.map((file) => ({
    file,
    importedBy: importedBy.get(file) || [],
    reachable: reachable.has(file),
  })),
  unreachableJs: unreachable.filter((rel) => /\.(js|jsx|ts|tsx)$/.test(rel)),
  unreachableCss: unreachable.filter((rel) => /\.(s?css|sass|less)$/.test(rel)),
  probableUnusedAssets,
  referencedAssets,
  dependencyUsage,
  dependencyMap: srcFiles.map((file) => ({
    file,
    importedBy: importedBy.get(file) || [],
    imports: imports.get(file) || [],
    status: reachable.has(file) ? "REQUIRED" : "PROBABLY_UNUSED",
  })),
};

console.log(JSON.stringify(result, null, 2));
