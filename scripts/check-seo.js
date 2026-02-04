#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const PSEO_PATH = path.join(__dirname, "..", "src", "data", "pSEO.json");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasPainPoint(entry) {
  const hasArrayValue =
    Array.isArray(entry.pain_points) && entry.pain_points.some(isNonEmptyString);
  const hasLegacyValue = isNonEmptyString(entry.pain_point);

  return hasArrayValue || hasLegacyValue;
}

function hasBenefit(entry) {
  const hasArrayValue =
    Array.isArray(entry.benefits) && entry.benefits.some(isNonEmptyString);
  const hasLegacyValue = isNonEmptyString(entry.benefit);

  return hasArrayValue || hasLegacyValue;
}

function run() {
  try {
    const raw = fs.readFileSync(PSEO_PATH, "utf8");
    const rows = JSON.parse(raw);

    if (!Array.isArray(rows)) {
      console.log("❌ Error in Row 0");
      process.exitCode = 1;
      return;
    }

    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];
      const rowNumber = index + 1;
      const heroTitle = isNonEmptyString(row?.hero_title) ? row.hero_title.trim() : "";

      if (!hasPainPoint(row) || !hasBenefit(row) || heroTitle.length <= 10) {
        console.log(`❌ Error in Row ${rowNumber}`);
        process.exitCode = 1;
        return;
      }
    }

    console.log(`✅ ${rows.length} Pages ready`);
  } catch {
    console.log("❌ Error in Row 0");
    process.exitCode = 1;
  }
}

run();
