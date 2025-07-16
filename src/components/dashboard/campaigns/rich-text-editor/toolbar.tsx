// components/dashboard/campaigns/rich-text-editor/toolbar.tsx
import { Editor } from "@tiptap/react";
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Strikethrough,
	List,
	ListOrdered,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	Link as LinkIcon,
	Image as ImageIcon,
	Highlighter,
	Palette,
	Heading1,
	Heading2,
	Heading3,
	Quote,
	Code,
	Undo,
	Redo,
} from "lucide-react";

interface ToolbarProps {
	// Renamed interface
	editor: Editor | null;
	setShowLinkDialog: (show: boolean) => void;
	setShowImageDialog: (show: boolean) => void;
	setShowColorDialog: (show: boolean) => void;
	setShowHighlightDialog: (show: boolean) => void;
}

export default function Toolbar({
	// Renamed component
	editor,
	setShowLinkDialog,
	setShowImageDialog,
	setShowColorDialog,
	setShowHighlightDialog,
}: ToolbarProps) {
	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-wrap items-center gap-1 p-3 bg-white border rounded-lg">
			{/* Text Formatting */}
			<div className="flex items-center gap-1 border-r pr-2">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Bold"
				>
					<Bold className="w-4 h-4" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("italic") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Italic"
				>
					<Italic className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleUnderline().run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("underline") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Underline"
				>
					<UnderlineIcon className="w-4 h-4" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleStrike().run()}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("strike") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Strikethrough"
				>
					<Strikethrough className="w-4 h-4" />
				</button>
			</div>

			{/* Headings */}
			<div className="flex items-center gap-1 border-r pr-2">
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 1 }) ? "bg-blue-100 text-blue-600" : ""}`}
					title="Heading 1"
				>
					<Heading1 className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 2 }) ? "bg-blue-100 text-blue-600" : ""}`}
					title="Heading 2"
				>
					<Heading2 className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 3 }) ? "bg-blue-100 text-blue-600" : ""}`}
					title="Heading 3"
				>
					<Heading3 className="w-4 h-4" />
				</button>
			</div>

			{/* Lists */}
			<div className="flex items-center gap-1 border-r pr-2">
				<button
					onClick={() =>
						editor.chain().focus().toggleBulletList().run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bulletList") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Bullet List"
				>
					<List className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleOrderedList().run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("orderedList") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Numbered List"
				>
					<ListOrdered className="w-4 h-4" />
				</button>
			</div>

			{/* Text Alignment */}
			<div className="flex items-center gap-1 border-r pr-2">
				<button
					onClick={() =>
						editor.chain().focus().setTextAlign("left").run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "left" }) ? "bg-blue-100 text-blue-600" : ""}`}
					title="Align Left"
				>
					<AlignLeft className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().setTextAlign("center").run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "center" }) ? "bg-blue-100 text-blue-600" : ""}`}
					title="Align Center"
				>
					<AlignCenter className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().setTextAlign("right").run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "right" }) ? "bg-blue-100 text-blue-600" : ""}`}
					title="Align Right"
				>
					<AlignRight className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().setTextAlign("justify").run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "justify" }) ? "bg-blue-100 text-blue-600" : ""}`}
					title="Justify"
				>
					<AlignJustify className="w-4 h-4" />
				</button>
			</div>

			{/* Special Elements */}
			<div className="flex items-center gap-1 border-r pr-2">
				<button
					onClick={() =>
						editor.chain().focus().toggleBlockquote().run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("blockquote") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Quote"
				>
					<Quote className="w-4 h-4" />
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleCodeBlock().run()
					}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("codeBlock") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Code Block"
				>
					<Code className="w-4 h-4" />
				</button>
			</div>

			{/* Links and Media (trigger dialogs) */}
			<div className="flex items-center gap-1 border-r pr-2">
				<button
					onClick={() => setShowLinkDialog(true)}
					className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("link") ? "bg-blue-100 text-blue-600" : ""}`}
					title="Add Link"
				>
					<LinkIcon className="w-4 h-4" />
				</button>
				<button
					onClick={() => setShowImageDialog(true)}
					className="p-2 rounded hover:bg-gray-100"
					title="Add Image"
				>
					<ImageIcon className="w-4 h-4" />
				</button>
			</div>

			{/* Colors (trigger dialogs) */}
			<div className="flex items-center gap-1 border-r pr-2">
				<button
					onClick={() => setShowColorDialog(true)}
					className="p-2 rounded hover:bg-gray-100"
					title="Text Color"
				>
					<Palette className="w-4 h-4" />
				</button>
				<button
					onClick={() => setShowHighlightDialog(true)}
					className="p-2 rounded hover:bg-gray-100"
					title="Highlight"
				>
					<Highlighter className="w-4 h-4" />
				</button>
			</div>

			{/* History */}
			<div className="flex items-center gap-1">
				<button
					onClick={() => editor.chain().focus().undo().run()}
					className="p-2 rounded hover:bg-gray-100"
					title="Undo"
				>
					<Undo className="w-4 h-4" />
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					className="p-2 rounded hover:bg-gray-100"
					title="Redo"
				>
					<Redo className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
