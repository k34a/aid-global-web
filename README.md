# Aid Global Web

A Next.js web application for managing and displaying campaigns with rich text editing capabilities.

## Features

### Rich Text Editor (TipTap)
The application now uses TipTap, a modern rich text editor, for campaign descriptions. Features include:

- **WYSIWYG Editing**: What-you-see-is-what-you-get interface
- **Rich Formatting**: Bold, italic, underline, strikethrough
- **Headings**: H1, H2, H3 heading levels
- **Lists**: Bullet and numbered lists
- **Text Alignment**: Left, center, right, justify alignment
- **Links and Images**: Add hyperlinks and images
- **Colors**: Text color and highlight functionality
- **Special Elements**: Blockquotes and code blocks
- **History**: Undo/redo functionality
- **Responsive Toolbar**: Collapsible toolbar with all formatting options

### Editor Components
- `RichTextEditor`: Main TipTap editor component with full toolbar
- `CampaignDescription`: Component for rendering the HTML content

### File Storage
- Campaign descriptions are stored as HTML files in Supabase storage
- Backward compatibility with existing markdown files
- Automatic file type detection (HTML first, then markdown)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see `.env.example`)

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Dependencies

### TipTap Editor Dependencies
- `@tiptap/react`: React integration for TipTap
- `@tiptap/pm`: ProseMirror integration
- `@tiptap/starter-kit`: Basic editor features
- `@tiptap/extension-placeholder`: Placeholder text support
- `@tiptap/extension-link`: Link functionality
- `@tiptap/extension-image`: Image support
- `@tiptap/extension-text-align`: Text alignment
- `@tiptap/extension-underline`: Underline formatting
- `@tiptap/extension-text-style`: Text styling
- `@tiptap/extension-color`: Color support
- `@tiptap/extension-highlight`: Text highlighting

## Usage

### Using the Rich Text Editor
```tsx
import RichTextEditor from "@/components/dashboard/campaigns/rich-text-editor";

function MyComponent() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Write your content here..."
    />
  );
}
```

### Rendering Rich Text Content
```tsx
import CampaignDescription from "@/components/campaign/campaigndescription";

function MyComponent() {
  return (
    <CampaignDescription content={htmlContent} />
  );
}
```

## Migration from Markdown

The application has been migrated from a markdown editor to TipTap rich text editor:

1. **Backward Compatibility**: Existing markdown files are still supported
2. **New Content**: New content is stored as HTML
3. **Automatic Detection**: The system automatically detects file type
4. **No Data Loss**: Existing campaigns continue to work

## Styling

The editor includes comprehensive CSS styling for both the editor interface and rendered content. Styles are defined in `src/app/globals.css` and include:

- ProseMirror editor styles
- Rich text content rendering styles
- Responsive design
- Consistent typography

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

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
