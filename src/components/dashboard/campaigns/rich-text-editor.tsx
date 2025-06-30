"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
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
	Save,
	FileText,
} from "lucide-react";

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export default function RichTextEditor({
	value,
	onChange,
	placeholder = "Write your campaign description...",
	className = "",
}: RichTextEditorProps) {
	const [showToolbar, setShowToolbar] = useState(true);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
			Placeholder.configure({
				placeholder,
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: "text-blue-600 underline cursor-pointer",
				},
			}),
			Image.configure({
				HTMLAttributes: {
					class: "max-w-full h-auto rounded-lg",
				},
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Underline,
			TextStyle,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	}, [value, editor]);

	if (!editor) {
		return null;
	}

	const addLink = () => {
		const url = window.prompt("Enter URL");
		if (url) {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		}
	};

	const addImage = () => {
		const url = window.prompt("Enter image URL");
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const setTextColor = () => {
		const color = window.prompt("Enter color (e.g., #ff0000, red, blue)");
		if (color) {
			editor.chain().focus().setColor(color).run();
		}
	};

	const setHighlight = () => {
		const color = window.prompt(
			"Enter highlight color (e.g., #ffff00, yellow)",
		);
		if (color) {
			editor.chain().focus().toggleHighlight({ color }).run();
		}
	};

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Toolbar */}
			<div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
				<div className="flex items-center gap-2">
					<FileText className="w-4 h-4 text-gray-600" />
					<span className="text-sm font-medium text-gray-700">
						Campaign Description
					</span>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setShowToolbar(!showToolbar)}
						className="flex items-center gap-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
					>
						{showToolbar ? "Hide Toolbar" : "Show Toolbar"}
					</button>
					<button
						type="button"
						onClick={() => console.log("Saving content...")}
						className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						<Save className="w-4 h-4" />
						Save
					</button>
				</div>
			</div>

			{/* Rich Text Toolbar */}
			{showToolbar && (
				<div className="flex flex-wrap items-center gap-1 p-3 bg-white border rounded-lg">
					{/* Text Formatting */}
					<div className="flex items-center gap-1 border-r pr-2">
						<button
							onClick={() =>
								editor.chain().focus().toggleBold().run()
							}
							className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "bg-blue-100 text-blue-600" : ""}`}
							title="Bold"
						>
							<Bold className="w-4 h-4" />
						</button>
						<button
							onClick={() =>
								editor.chain().focus().toggleItalic().run()
							}
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
							onClick={() =>
								editor.chain().focus().toggleStrike().run()
							}
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
								editor
									.chain()
									.focus()
									.toggleHeading({ level: 1 })
									.run()
							}
							className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 1 }) ? "bg-blue-100 text-blue-600" : ""}`}
							title="Heading 1"
						>
							<Heading1 className="w-4 h-4" />
						</button>
						<button
							onClick={() =>
								editor
									.chain()
									.focus()
									.toggleHeading({ level: 2 })
									.run()
							}
							className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("heading", { level: 2 }) ? "bg-blue-100 text-blue-600" : ""}`}
							title="Heading 2"
						>
							<Heading2 className="w-4 h-4" />
						</button>
						<button
							onClick={() =>
								editor
									.chain()
									.focus()
									.toggleHeading({ level: 3 })
									.run()
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
								editor
									.chain()
									.focus()
									.setTextAlign("left")
									.run()
							}
							className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "left" }) ? "bg-blue-100 text-blue-600" : ""}`}
							title="Align Left"
						>
							<AlignLeft className="w-4 h-4" />
						</button>
						<button
							onClick={() =>
								editor
									.chain()
									.focus()
									.setTextAlign("center")
									.run()
							}
							className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "center" }) ? "bg-blue-100 text-blue-600" : ""}`}
							title="Align Center"
						>
							<AlignCenter className="w-4 h-4" />
						</button>
						<button
							onClick={() =>
								editor
									.chain()
									.focus()
									.setTextAlign("right")
									.run()
							}
							className={`p-2 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "right" }) ? "bg-blue-100 text-blue-600" : ""}`}
							title="Align Right"
						>
							<AlignRight className="w-4 h-4" />
						</button>
						<button
							onClick={() =>
								editor
									.chain()
									.focus()
									.setTextAlign("justify")
									.run()
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

					{/* Links and Media */}
					<div className="flex items-center gap-1 border-r pr-2">
						<button
							onClick={addLink}
							className={`p-2 rounded hover:bg-gray-100 ${editor.isActive("link") ? "bg-blue-100 text-blue-600" : ""}`}
							title="Add Link"
						>
							<LinkIcon className="w-4 h-4" />
						</button>
						<button
							onClick={addImage}
							className="p-2 rounded hover:bg-gray-100"
							title="Add Image"
						>
							<ImageIcon className="w-4 h-4" />
						</button>
					</div>

					{/* Colors */}
					<div className="flex items-center gap-1 border-r pr-2">
						<button
							onClick={setTextColor}
							className="p-2 rounded hover:bg-gray-100"
							title="Text Color"
						>
							<Palette className="w-4 h-4" />
						</button>
						<button
							onClick={setHighlight}
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
			)}

			{/* Editor Content */}
			<div className="border rounded-lg overflow-hidden">
				<EditorContent
					editor={editor}
					className="min-h-[400px] p-4 focus:outline-none prose prose-sm max-w-none"
				/>
			</div>

			{/* Help Section */}
			<div className="bg-gray-50 p-4 rounded-lg border">
				<h4 className="text-sm font-medium text-gray-700 mb-2">
					Rich Text Editor Features:
				</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
					<div>• Use the toolbar above to format your text</div>
					<div>
						• Headings, bold, italic, underline, strikethrough
					</div>
					<div>• Bullet and numbered lists</div>
					<div>• Text alignment (left, center, right, justify)</div>
					<div>• Add links and images</div>
					<div>• Change text color and highlight text</div>
					<div>• Blockquotes and code blocks</div>
					<div>• Undo/redo functionality</div>
				</div>
			</div>
		</div>
	);
}
