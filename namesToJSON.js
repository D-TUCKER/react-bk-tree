const { readFileSync, writeFileSync } = require("fs");

const raw = readFileSync("./rawNames.txt", "utf8");

const lines = raw.split("\n");

const names = lines.map(line => line.split(" ")[0].toLowerCase());

names.sort();

writeFileSync("./src/bkTree/names.json", JSON.stringify(names, null, 2));
