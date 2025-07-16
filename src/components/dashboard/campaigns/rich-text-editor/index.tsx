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
import { FileText, Eye, Edit3 } from "lucide-react";

import "./style.css";

import Toolbar from "./toolbar";
import Dialogs from "./dailogs";

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
	const [isPreviewMode, setIsPreviewMode] = useState(false);
	const [pendingImages, setPendingImages] = useState<{ [key: string]: File }>(
		{},
	);

	const [showLinkDialog, setShowLinkDialog] = useState(false);
	const [showImageDialog, setShowImageDialog] = useState(false);
	const [showColorDialog, setShowColorDialog] = useState(false);
	const [showHighlightDialog, setShowHighlightDialog] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const [imageUrl, setImageUrl] = useState("");

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
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value, false);
		}
	}, [value, editor]);

	useEffect(() => {
		if (editor) {
			editor.setEditable(!isPreviewMode);
		}
	}, [isPreviewMode, editor]);

	const processPendingImages = useCallback(async (): Promise<string> => {
		if (!editor) return "";
		if (Object.keys(pendingImages).length === 0) {
			return editor.getHTML();
		}

		let content = editor.getHTML();
		for (const [imageId, file] of Object.entries(pendingImages)) {
			try {
				const uploadedUrl = await uploadImageToServer(file);

				const tempUrlPattern = new RegExp(
					`<img([^>]+)alt\\s*=\\s*["']${imageId}["']([^>]*)src\\s*=\\s*["'][^"']*["']`,
					"g",
				);
				content = content.replace(
					tempUrlPattern,
					`<img$1alt="${imageId}"$2src="${uploadedUrl}"`,
				);
			} catch (error) {
				console.error(`Failed to upload image ${imageId}:`, error);
				throw new Error(`Failed to upload image: ${file.name}`);
			}
		}
		setPendingImages({}); // Clear pending images after processing
		return content;
	}, [pendingImages, editor]);

	useEffect(() => {
		(window as any).processRichTextImages = processPendingImages;
		return () => {
			delete (window as any).processRichTextImages;
		};
	}, [processPendingImages]);

	useEffect(() => {
		return () => {
			Object.values(pendingImages).forEach((file) => {
				URL.revokeObjectURL(URL.createObjectURL(file));
			});
		};
	}, [pendingImages]);

	const uploadImageToServer = async (file: File): Promise<string> => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("path", "campaigns/rich-text-images");

		const response = await fetch("/api/upload", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(
				`Failed to upload image: ${response.status} ${errorText}`,
			);
		}

		const data = await response.json();
		return data.url;
	};

	const handleImageFileSelection = useCallback(
		(file: File) => {
			if (!editor || !file) return;

			const imageId = `temp-${Date.now()}`;
			setPendingImages((prev) => ({
				...prev,
				[imageId]: file,
			}));

			const previewUrl = URL.createObjectURL(file);
			editor
				.chain()
				.focus()
				.setImage({
					src: previewUrl,
					alt: imageId,
				})
				.run();
			setShowImageDialog(false);
		},
		[editor],
	);

	if (!editor) {
		return null;
	}

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Toolbar Header */}
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

			{showToolbar && !isPreviewMode && (
				<Toolbar
					editor={editor}
					setShowLinkDialog={setShowLinkDialog}
					setShowImageDialog={setShowImageDialog}
					setShowColorDialog={setShowColorDialog}
					setShowHighlightDialog={setShowHighlightDialog}
				/>
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

			{/* Help Section - conditionally rendered */}
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

			<Dialogs
				editor={editor}
				showLinkDialog={showLinkDialog}
				setShowLinkDialog={setShowLinkDialog}
				linkUrl={linkUrl}
				setLinkUrl={setLinkUrl}
				showImageDialog={showImageDialog}
				setShowImageDialog={setShowImageDialog}
				imageUrl={imageUrl}
				setImageUrl={setImageUrl}
				handleImageFileSelection={handleImageFileSelection}
				showColorDialog={showColorDialog}
				setShowColorDialog={setShowColorDialog}
				showHighlightDialog={showHighlightDialog}
				setShowHighlightDialog={setShowHighlightDialog}
			/>
		</div>
	);
}
