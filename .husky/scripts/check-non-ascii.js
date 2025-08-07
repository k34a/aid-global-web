const fs = require("fs");
const path = require("path");
const cliProgress = require("cli-progress");

console.log(
	"🌐 Checking for non-ASCII characters in source files (src/*.ts/js)...",
);

let hasError = false;
let allFiles = [];

function collectFiles(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			collectFiles(fullPath);
		} else if (/\.(js|ts|jsx|tsx)$/.test(entry.name)) {
			allFiles.push(fullPath);
		}
	}
}

function checkFile(file) {
	const lines = fs.readFileSync(file, "utf-8").split("\n");
	lines.forEach((line, i) => {
		[...line].forEach((char, j) => {
			if (char.charCodeAt(0) > 127) {
				console.log("");
				console.log(
					`${file}:${i + 1}:${j + 1} ❌ Non-ASCII character found: (${char})`,
				);
				hasError = true;
			}
		});
	});
}

collectFiles("src");

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(allFiles.length, 0);

for (let i = 0; i < allFiles.length; i++) {
	checkFile(allFiles[i]);
	bar.update(i + 1);
}

bar.stop();

if (hasError) {
	console.log(
		"\n❌ Commit blocked due to non-ASCII characters in source files.",
	);
	console.log(
		"   ⚠️  Please replace or remove non-ASCII characters before committing.\n",
	);
	process.exit(1);
} else {
	console.log("✅ No non-ASCII characters found.");
}
