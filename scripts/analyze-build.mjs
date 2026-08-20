import fs from "fs";
import path from "path";
import zlib from "zlib";

const assetsDir = path.join(process.cwd(), "admin", "assets");

function gzipSize(filePath) {
  return zlib.gzipSync(fs.readFileSync(filePath)).length;
}

function sourceGroup(source) {
  if (source.includes("/node_modules/antd/")) return "antd";
  if (source.includes("/node_modules/@ant-design/")) return "@ant-design";
  if (source.includes("/node_modules/rc-")) return "rc-*";
  if (source.includes("/node_modules/react-router")) return "react-router";
  if (source.includes("/node_modules/@reduxjs/") || source.includes("/node_modules/react-redux/")) {
    return "redux";
  }
  if (source.includes("/node_modules/react/") || source.includes("/node_modules/react-dom/")) {
    return "react";
  }
  if (source.includes("/node_modules/moment/")) return "moment";
  if (source.includes("/node_modules/dayjs/")) return "dayjs";
  if (source.includes("/node_modules/@popperjs/")) return "@popperjs";
  if (source.includes("/node_modules/")) return "other node_modules";
  if (source.includes("/src/")) return "src";
  return "other";
}

function analyzeMap(mapFile) {
  const mapPath = path.join(assetsDir, mapFile);
  const jsPath = path.join(assetsDir, mapFile.replace(/\.map$/, ""));
  const map = JSON.parse(fs.readFileSync(mapPath, "utf8"));
  const groups = new Map();
  const sources = [];

  map.sources.forEach((source, index) => {
    const content = map.sourcesContent?.[index] || "";
    const size = Buffer.byteLength(content);
    const group = sourceGroup(source);
    groups.set(group, (groups.get(group) || 0) + size);
    sources.push({ source, size, group });
  });

  return {
    chunk: mapFile.replace(/\.map$/, ""),
    minifiedBytes: fs.statSync(jsPath).size,
    gzipBytes: gzipSize(jsPath),
    groups: [...groups.entries()]
      .map(([group, bytes]) => ({ group, bytes }))
      .sort((a, b) => b.bytes - a.bytes),
    topSources: sources.sort((a, b) => b.size - a.size).slice(0, 25),
  };
}

const maps = fs
  .readdirSync(assetsDir)
  .filter((file) => file.endsWith(".js.map"))
  .filter((file) => fs.existsSync(path.join(assetsDir, file.replace(/\.map$/, ""))))
  .map((file) => analyzeMap(file))
  .sort((a, b) => b.minifiedBytes - a.minifiedBytes);

const report = {
  chunks: maps.map((chunk) => ({
    chunk: chunk.chunk,
    minifiedKb: +(chunk.minifiedBytes / 1024).toFixed(2),
    gzipKb: +(chunk.gzipBytes / 1024).toFixed(2),
    groups: chunk.groups.map((group) => ({
      group: group.group,
      sourceKb: +(group.bytes / 1024).toFixed(2),
    })),
    topSources: chunk.topSources.map((source) => ({
      source: source.source,
      sourceKb: +(source.size / 1024).toFixed(2),
      group: source.group,
    })),
  })),
};

console.log(JSON.stringify(report, null, 2));
