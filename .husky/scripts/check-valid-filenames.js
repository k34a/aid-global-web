const fs = require("fs");
const path = require("path");
const cliProgress = require("cli-progress");

console.log("🔠 Checking filenames in src/ for allowed characters...");

let hasError = false;
let allFiles = [];

// Allow lowercase, numbers, hyphens, parentheses, and dots
function isValid(name) {
	return /^[a-z0-9().-]+$/.test(name);
}

function collectFiles(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			collectFiles(fullPath);
		} else if (/\.(js|ts|jsx|tsx)$/.test(entry.name)) {
			allFiles.push({ name: entry.name, path: fullPath });
		}
	}
}

collectFiles("src");

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar.start(allFiles.length, 0);

for (let i = 0; i < allFiles.length; i++) {
	const { name, path: filePath } = allFiles[i];
	if (!isValid(name)) {
		console.log(`\n❌ Invalid filename: '${filePath}'`);
		console.log(
			`   ⚠️  Allowed: lowercase letters, numbers, hyphens (-), parentheses ( ), and dots (.)`,
		);
		hasError = true;
	}
	bar.update(i + 1);
}

bar.stop();

if (hasError) {
	console.log("\n❌ Commit blocked due to invalid filenames.");
	process.exit(1);
} else {
	console.log("✅ All filenames are valid.");
}
