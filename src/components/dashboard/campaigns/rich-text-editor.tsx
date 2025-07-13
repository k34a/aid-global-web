"use client";

import { useState, useEffect, useCallback } from "react";
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
import "./rich-text-editor.css";
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
	Eye,
	Edit3,
	Plus,
} from "lucide-react";

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

// Predefined color palettes
const textColors = [
	{ name: "Black", value: "#000000" },
	{ name: "Dark Gray", value: "#374151" },
	{ name: "Gray", value: "#6B7280" },
	{ name: "Light Gray", value: "#9CA3AF" },
	{ name: "Red", value: "#DC2626" },
	{ name: "Orange", value: "#EA580C" },
	{ name: "Yellow", value: "#CA8A04" },
	{ name: "Green", value: "#16A34A" },
	{ name: "Blue", value: "#2563EB" },
	{ name: "Purple", value: "#7C3AED" },
	{ name: "Pink", value: "#DB2777" },
	{ name: "Brown", value: "#92400E" },
];

const highlightColors = [
	{ name: "Yellow", value: "#FEF3C7" },
	{ name: "Light Yellow", value: "#FEF9E7" },
	{ name: "Orange", value: "#FED7AA" },
	{ name: "Light Orange", value: "#FFEDD5" },
	{ name: "Red", value: "#FECACA" },
	{ name: "Light Red", value: "#FEE2E2" },
	{ name: "Green", value: "#BBF7D0" },
	{ name: "Light Green", value: "#DCFCE7" },
	{ name: "Blue", value: "#BFDBFE" },
	{ name: "Light Blue", value: "#DBEAFE" },
	{ name: "Purple", value: "#DDD6FE" },
	{ name: "Light Purple", value: "#EDE9FE" },
	{ name: "Pink", value: "#FBCFE8" },
	{ name: "Light Pink", value: "#FCE7F3" },
];

// Enhanced Color Palette Component with Custom Color Picker
const ColorPalette = ({
	colors,
	onSelect,
	title,
	type = "text",
}: {
	colors: { name: string; value: string }[];
	onSelect: (color: string) => void;
	title: string;
	type?: "text" | "highlight";
}) => {
	const [customColor, setCustomColor] = useState("#000000");
	const [showCustomPicker, setShowCustomPicker] = useState(false);

	const handleCustomColorChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setCustomColor(e.target.value);
	};

	const applyCustomColor = () => {
		if (customColor) {
			onSelect(customColor);
		}
	};

	return (
		<div className="space-y-4">
			<h4 className="text-sm font-medium text-gray-700">{title}</h4>

			{/* Predefined Color Swatches */}
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<span className="text-xs text-gray-600">Quick Colors:</span>
					<button
						onClick={() => setShowCustomPicker(!showCustomPicker)}
						className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
					>
						<Plus className="w-3 h-3" />
						{showCustomPicker ? "Hide Custom" : "Custom Color"}
					</button>
				</div>

				<div className="grid grid-cols-6 gap-2">
					{colors.map((color) => (
						<button
							key={color.value}
							onClick={() => onSelect(color.value)}
							className="group relative"
							title={color.name}
						>
							<div
								className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors shadow-sm"
								style={{ backgroundColor: color.value }}
							/>
							<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
								{color.name}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Custom Color Picker */}
			{showCustomPicker && (
				<div className="space-y-3 p-3 bg-gray-50 rounded-lg border">
					<div className="flex items-center gap-2">
						<label className="text-xs text-gray-600">
							Custom Color:
						</label>
						<input
							type="color"
							value={customColor}
							onChange={handleCustomColorChange}
							className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
							title="Choose custom color"
						/>
						<input
							type="text"
							value={customColor}
							onChange={handleCustomColorChange}
							placeholder="#000000"
							className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
					<div className="flex gap-2">
						<button
							onClick={applyCustomColor}
							className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Apply {type === "text" ? "Text Color" : "Highlight"}
						</button>
						<button
							onClick={() => setShowCustomPicker(false)}
							className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

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
	const [isPreviewMode, setIsPreviewMode] = useState(false);
	const [pendingImages, setPendingImages] = useState<{ [key: string]: File }>(
		{},
	);

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
		editable: !isPreviewMode,
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	}, [value, editor]);

	useEffect(() => {
		if (editor) {
			editor.setEditable(!isPreviewMode);
		}
	}, [isPreviewMode, editor]);

	// Function to process and upload all pending images
	const processPendingImages = useCallback(async (): Promise<string> => {
		if (!editor) return "";
		if (Object.keys(pendingImages).length === 0) {
			return editor!.getHTML();
		}
		let content = editor!.getHTML();
		for (const [imageId, file] of Object.entries(pendingImages)) {
			try {
				const uploadedUrl = await uploadImageToServer(file);
				const tempUrlPattern = new RegExp(
					`<img([^>]+)alt=\\?"${imageId}\\?"([^>]*)src=\\?"[^"]*\\?"`,
					"g",
				);
				content = content.replace(
					tempUrlPattern,
					`<img$1alt=\"${imageId}\"$2src=\"${uploadedUrl}\"`,
				);
			} catch (error) {
				console.error(`Failed to upload image ${imageId}:`, error);
				throw new Error(`Failed to upload image: ${file.name}`);
			}
		}
		setPendingImages({});
		return content;
	}, [pendingImages, editor]);

	useEffect(() => {
		(window as any).processRichTextImages = processPendingImages;
	}, [processPendingImages]);

	// Cleanup function to remove temporary URLs when component unmounts
	useEffect(() => {
		return () => {
			Object.values(pendingImages).forEach((file) => {
				URL.revokeObjectURL(URL.createObjectURL(file));
			});
		};
	}, [pendingImages]);

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

	const applyTextColor = (color: string) => {
		editor.chain().focus().setColor(color).run();
		setShowColorDialog(false);
	};

	const applyHighlight = (color: string) => {
		editor.chain().focus().toggleHighlight({ color }).run();
		setShowHighlightDialog(false);
	};

	// Function to upload image to server
	const uploadImageToServer = async (file: File): Promise<string> => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("path", "campaigns/rich-text-images");

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Failed to upload image");
		}

		const data = await response.json();
		return data.url;
	};

	// Function to handle image file selection (store locally, don't upload yet)
	const handleImageUpload = async (file: File) => {
		if (!file) return;

		// Create a temporary ID for this image
		const imageId = `temp-${Date.now()}`;

		// Store file locally for later upload
		setPendingImages((prev) => ({
			...prev,
			[imageId]: file,
		}));

		// Create a temporary preview URL
		const previewUrl = URL.createObjectURL(file);

		// Add image to editor with temporary ID in alt
		editor
			.chain()
			.focus()
			.setImage({
				src: previewUrl,
				alt: imageId,
			})
			.run();

		// Close dialog
		setShowImageDialog(false);
	};

	// Function to handle file input change
	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleImageUpload(file);
		}
		// Reset input value to allow selecting the same file again
		e.target.value = "";
	};

	// Function to handle drag and drop
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const files = Array.from(e.dataTransfer.files);
		const imageFile = files.find((file) => file.type.startsWith("image/"));

		if (imageFile) {
			handleImageUpload(imageFile);
		}
	};

	const Dialog = ({
		isOpen,
		onClose,
		title,
		children,
	}: {
		isOpen: boolean;
		onClose: () => void;
		title: string;
		children: React.ReactNode;
	}) => {
		if (!isOpen) return null;

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
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
							onClick={onClose}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							Close
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
						onClick={() => setIsPreviewMode(!isPreviewMode)}
						className={`flex items-center gap-1 px-3 py-1 text-sm border rounded transition-colors ${
							isPreviewMode
								? "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
								: "bg-white border-gray-300 hover:bg-gray-50"
						}`}
					>
						{isPreviewMode ? (
							<>
								<Edit3 className="w-4 h-4" />
								Edit Mode
							</>
						) : (
							<>
								<Eye className="w-4 h-4" />
								Preview
							</>
						)}
					</button>
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
			{showToolbar && !isPreviewMode && (
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

			{/* Preview Mode Indicator */}
			{isPreviewMode && (
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
					<div className="flex items-center gap-2 text-blue-700">
						<Eye className="w-4 h-4" />
						<span className="text-sm font-medium">
							Preview Mode
						</span>
					</div>
					<p className="text-xs text-blue-600 mt-1">
						This is how your content will appear to visitors. Click
						&quot;Edit Mode&quot; to make changes.
					</p>
				</div>
			)}

			{/* Editor Content */}
			<div
				className={`border rounded-lg overflow-hidden ${isPreviewMode ? "bg-white" : ""}`}
			>
				<EditorContent
					editor={editor}
					className={`min-h-[400px] p-4 focus:outline-none prose prose-sm max-w-none ${
						isPreviewMode ? "rich-text-content" : ""
					}`}
				/>
			</div>

			{/* Help Section */}
			{!isPreviewMode && (
				<div className="bg-gray-50 p-4 rounded-lg border">
					<h4 className="text-sm font-medium text-gray-700 mb-2">
						Rich Text Editor Features:
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
						<div>- Use the toolbar above to format your text</div>
						<div>
							- Headings, bold, italic, underline, strikethrough
						</div>
						<div>- Bullet and numbered lists</div>
						<div>
							- Text alignment (left, center, right, justify)
						</div>
						<div>- Add links and images</div>
						<div>
							- Change text color and highlight text with color
							palette
						</div>
						<div>- Blockquotes and code blocks</div>
						<div>- Undo/redo functionality</div>
						<div>
							- Click &quot;Preview&quot; to see how content will
							look
						</div>
					</div>
				</div>
			)}

			{/* Dialogs */}
			<Dialog
				isOpen={showLinkDialog}
				onClose={() => setShowLinkDialog(false)}
				title="Add Link"
			>
				<div className="space-y-3">
					<input
						type="url"
						placeholder="Enter URL (e.g., https://example.com)"
						value={linkUrl}
						onChange={(e) => setLinkUrl(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						onKeyPress={(e) => e.key === "Enter" && addLink()}
					/>
					<div className="flex gap-2">
						<button
							onClick={addLink}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						>
							Add Link
						</button>
						<button
							onClick={() => setShowLinkDialog(false)}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							Cancel
						</button>
					</div>
				</div>
			</Dialog>

			<Dialog
				isOpen={showImageDialog}
				onClose={() => setShowImageDialog(false)}
				title="Add Image"
			>
				<div className="space-y-4">
					<div className="text-center">
						<div
							className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors"
							onDragOver={handleDragOver}
							onDrop={handleDrop}
						>
							<input
								type="file"
								accept="image/*"
								onChange={handleFileInputChange}
								className="hidden"
								id="image-upload-input"
							/>
							<label
								htmlFor="image-upload-input"
								className="cursor-pointer block"
							>
								<div className="flex flex-col items-center gap-2">
									<ImageIcon className="w-8 h-8 text-gray-400" />
									<div className="text-sm text-gray-600">
										<span className="font-medium text-blue-600">
											Click to upload
										</span>
										<br />
										<span className="text-gray-500">
											or drag and drop
										</span>
										<br />
										<span className="text-xs text-gray-400">
											PNG, JPG, GIF up to 10MB
										</span>
									</div>
								</div>
							</label>
						</div>
					</div>

					{/* Alternative: URL input for external images */}
					<div className="border-t pt-4">
						<p className="text-sm text-gray-600 mb-2">
							Or add image from URL:
						</p>
						<input
							type="url"
							placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							onKeyPress={(e) => e.key === "Enter" && addImage()}
						/>
						<div className="flex gap-2 mt-2">
							<button
								onClick={addImage}
								className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
							>
								Add from URL
							</button>
						</div>
					</div>

					<div className="flex gap-2 pt-2">
						<button
							onClick={() => setShowImageDialog(false)}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							Cancel
						</button>
					</div>
				</div>
			</Dialog>

			<Dialog
				isOpen={showColorDialog}
				onClose={() => setShowColorDialog(false)}
				title="Choose Text Color"
			>
				<ColorPalette
					colors={textColors}
					onSelect={applyTextColor}
					title="Select a text color:"
					type="text"
				/>
			</Dialog>

			<Dialog
				isOpen={showHighlightDialog}
				onClose={() => setShowHighlightDialog(false)}
				title="Choose Highlight Color"
			>
				<ColorPalette
					colors={highlightColors}
					onSelect={applyHighlight}
					title="Select a highlight color:"
					type="highlight"
				/>
			</Dialog>
		</div>
	);
}
