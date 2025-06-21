export default {
	"*.tsx": "prettier --write",
	"*.ts": ["eslint --fix", "prettier --write"],
};
