#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const readline = require("readline");

console.log(
	"\n🔍 Checking for <img> tags and next/image imports in source files...",
);

// Get list of staged files inside src/
const stagedFiles = execSync("git diff --cached --name-only --diff-filter=ACM")
	.toString()
	.split("\n")
	.filter(
		(file) => file.startsWith("src/") && file.match(/\.(js|ts|jsx|tsx)$/),
	);

if (stagedFiles.length === 0) {
	console.log(
		"✅ No relevant source files staged. Skipping img/Image check.",
	);
	process.exit(0);
}

let hasError = false;

const checkFile = async (filePath) => {
	const fileStream = fs.createReadStream(filePath);
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	let lineNumber = 0;
	for await (const line of rl) {
		lineNumber++;

		// Check for <img ...> tag
		const imgTagPattern = /<img[\s>]/i;
		if (imgTagPattern.test(line)) {
			console.error(`❌ ${filePath}:${lineNumber} → Found <img> tag`);
			console.error(`   ${line.trim()}`);
			hasError = true;
		}

		// Check for import from 'next/image'
		const nextImageImportPattern =
			/import\s+.*\bImage\b.*from\s+['"]next\/image['"]/;
		if (nextImageImportPattern.test(line)) {
			console.error(
				`❌ ${filePath}:${lineNumber} → Found import from 'next/image'`,
			);
			console.error(`   ${line.trim()}`);
			hasError = true;
		}
	}
};

const runChecks = async () => {
	await Promise.all(stagedFiles.map(checkFile));

	if (hasError) {
		console.error(
			'\n🚫 Commit blocked. Do not use <img> tags or import from next/image. Use "@/components/image" instead.',
		);
		process.exit(1);
	} else {
		console.log(
			"✅ No <img> tags or next/image imports found. Check passed.",
		);
	}
};

runChecks();
