export default {
	"*.tsx": "npx prettier --write",
	"*.ts": ["npx eslint --fix", "npx prettier --write"],
};
