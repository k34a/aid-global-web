export default {
  "!(*.ts, *.tsx)": "prettier --write",
  "*.ts": ["eslint --fix", "prettier --write"],
};
