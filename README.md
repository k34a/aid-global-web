This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Pre-commit Checks

This repository runs the following checks automatically before each commit:

- **Linting (`npm run lint`)**: Ensures that your code follows the defined style and syntax rules to maintain code quality and consistency.

- **Testing (`npm run test`)**: Runs the test suite to make sure that existing functionality is not broken by your changes.

- **Prettying (`npx prettier . --write`)**: Applies prettier to make the file format consistent. This applies only to the files staged for commit, making the lint process faster and more focused.

- **Commit Message Validation (`commitlint`)**: Checks if your commit messages follow the conventional format to ensure clarity and consistency in commit history. See Commit Message Guidelines below.

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for writing commit messages. This helps with consistent history, changelogs, and automation.

### 🔧 Format

```
<type>(optional scope): <short description>
```

### ✅ Examples

```
feat: add donation form
fix: resolve navbar flicker issue
docs: update README with usage instructions
chore: configure commit linting
style: format footer component
refactor: simplify auth context logic
ci: update GitHub Actions node version
test: add tests for Button component
revert: revert donation logic to previous state
perf: improve image load times
vercel: update config for preview deployment
```

### 🔠 Allowed Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `chore`: Build tools or setup-related changes
- `style`: Formatting, whitespace, etc.
- `refactor`: Code changes that neither fix a bug nor add a feature
- `ci`: CI/CD related changes
- `test`: Adding or updating tests
- `revert`: Reverting previous commits
- `perf`: Performance improvements
- `vercel`: Vercel-specific configuration

> Your commits will be linted automatically. Please follow the structure above to avoid errors.

## To-do

Nightly Jobs:

- Delete any long-pending Donation Intent
