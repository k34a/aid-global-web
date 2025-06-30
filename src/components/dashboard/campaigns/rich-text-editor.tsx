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
	FileText,
	X,
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
	const [showLinkDialog, setShowLinkDialog] = useState(false);
	const [showImageDialog, setShowImageDialog] = useState(false);
	const [showColorDialog, setShowColorDialog] = useState(false);
	const [showHighlightDialog, setShowHighlightDialog] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [textColor, setTextColor] = useState("");
	const [highlightColor, setHighlightColor] = useState("");

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
		if (linkUrl.trim()) {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: linkUrl.trim() })
				.run();
			setLinkUrl("");
			setShowLinkDialog(false);
		}
	};

	const addImage = () => {
		if (imageUrl.trim()) {
			editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
			setImageUrl("");
			setShowImageDialog(false);
		}
	};

	const applyTextColor = () => {
		if (textColor.trim()) {
			editor.chain().focus().setColor(textColor.trim()).run();
			setTextColor("");
			setShowColorDialog(false);
		}
	};

	const applyHighlight = () => {
		if (highlightColor.trim()) {
			editor
				.chain()
				.focus()
				.toggleHighlight({ color: highlightColor.trim() })
				.run();
			setHighlightColor("");
			setShowHighlightDialog(false);
		}
	};

	const Dialog = ({
		isOpen,
		onClose,
		title,
		children,
		onSubmit,
	}: {
		isOpen: boolean;
		onClose: () => void;
		title: string;
		children: React.ReactNode;
		onSubmit: () => void;
	}) => {
		if (!isOpen) return null;

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold">{title}</h3>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
					{children}
					<div className="flex gap-2 mt-4">
						<button
							onClick={onSubmit}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Add
						</button>
						<button
							onClick={onClose}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
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

					{/* Colors */}
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

			{/* Dialogs */}
			<Dialog
				isOpen={showLinkDialog}
				onClose={() => setShowLinkDialog(false)}
				title="Add Link"
				onSubmit={addLink}
			>
				<input
					type="url"
					placeholder="Enter URL (e.g., https://example.com)"
					value={linkUrl}
					onChange={(e) => setLinkUrl(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					onKeyPress={(e) => e.key === "Enter" && addLink()}
				/>
			</Dialog>

			<Dialog
				isOpen={showImageDialog}
				onClose={() => setShowImageDialog(false)}
				title="Add Image"
				onSubmit={addImage}
			>
				<input
					type="url"
					placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					onKeyPress={(e) => e.key === "Enter" && addImage()}
				/>
			</Dialog>

			<Dialog
				isOpen={showColorDialog}
				onClose={() => setShowColorDialog(false)}
				title="Text Color"
				onSubmit={applyTextColor}
			>
				<input
					type="text"
					placeholder="Enter color (e.g., #ff0000, red, blue)"
					value={textColor}
					onChange={(e) => setTextColor(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					onKeyPress={(e) => e.key === "Enter" && applyTextColor()}
				/>
			</Dialog>

			<Dialog
				isOpen={showHighlightDialog}
				onClose={() => setShowHighlightDialog(false)}
				title="Highlight Color"
				onSubmit={applyHighlight}
			>
				<input
					type="text"
					placeholder="Enter highlight color (e.g., #ffff00, yellow)"
					value={highlightColor}
					onChange={(e) => setHighlightColor(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					onKeyPress={(e) => e.key === "Enter" && applyHighlight()}
				/>
			</Dialog>
		</div>
	);
}
