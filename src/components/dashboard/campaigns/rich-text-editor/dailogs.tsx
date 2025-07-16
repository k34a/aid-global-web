// components/dashboard/campaigns/rich-text-editor/dialogs.tsx
"use client"; // Assuming this is a client component as it uses hooks

import { Editor } from "@tiptap/react";
import { useState, useCallback } from "react";
import { X, ImageIcon } from "lucide-react";

import ColorPalette, { textColors, highlightColors } from "./color-palette";

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

interface DialogsProps {
	editor: Editor | null;
	showLinkDialog: boolean;
	setShowLinkDialog: (show: boolean) => void;
	linkUrl: string;
	setLinkUrl: (url: string) => void;
	showImageDialog: boolean;
	setShowImageDialog: (show: boolean) => void;
	imageUrl: string;
	setImageUrl: (url: string) => void;
	handleImageFileSelection: (file: File) => void;
	showColorDialog: boolean;
	setShowColorDialog: (show: boolean) => void;
	showHighlightDialog: boolean;
	setShowHighlightDialog: (show: boolean) => void;
}

export default function Dialogs({
	editor,
	showLinkDialog,
	setShowLinkDialog,
	linkUrl,
	setLinkUrl,
	showImageDialog,
	setShowImageDialog,
	imageUrl,
	setImageUrl,
	handleImageFileSelection,
	showColorDialog,
	setShowColorDialog,
	showHighlightDialog,
	setShowHighlightDialog,
}: DialogsProps) {
	const addLink = useCallback(() => {
		if (linkUrl.trim() && editor) {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: linkUrl.trim() })
				.run();
			setLinkUrl("");
			setShowLinkDialog(false);
		}
	}, [linkUrl, editor, setLinkUrl, setShowLinkDialog]);

	const addImage = useCallback(() => {
		if (imageUrl.trim() && editor) {
			editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
			setImageUrl("");
			setShowImageDialog(false);
		}
	}, [imageUrl, editor, setImageUrl, setShowImageDialog]);

	const applyTextColor = useCallback(
		(color: string) => {
			if (editor) {
				editor.chain().focus().setColor(color).run();
				setShowColorDialog(false);
			}
		},
		[editor, setShowColorDialog],
	);

	const applyHighlight = useCallback(
		(color: string) => {
			if (editor) {
				editor.chain().focus().toggleHighlight({ color }).run();
				setShowHighlightDialog(false);
			}
		},
		[editor, setShowHighlightDialog],
	);

	const handleFileInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				handleImageFileSelection(file);
			}
			e.target.value = "";
		},
		[handleImageFileSelection],
	);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();

			const files = Array.from(e.dataTransfer.files);
			const imageFile = files.find((file) =>
				file.type.startsWith("image/"),
			);

			if (imageFile) {
				handleImageFileSelection(imageFile);
			}
		},
		[handleImageFileSelection],
	);

	if (!editor) {
		return null;
	}

	return (
		<>
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
		</>
	);
}
