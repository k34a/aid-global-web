"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Save, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export default function MarkdownEditor({
	value,
	onChange,
	placeholder = "Write your campaign description in markdown...",
	className = "",
}: MarkdownEditorProps) {
	const [showPreview, setShowPreview] = useState(false);
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		onChange(newValue);
	};

	const handleSave = () => {
		// This could be used to save to a specific endpoint if needed
		console.log("Saving markdown content...");
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
						onClick={() => setShowPreview(!showPreview)}
						className="flex items-center gap-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
					>
						{showPreview ? (
							<EyeOff className="w-4 h-4" />
						) : (
							<Eye className="w-4 h-4" />
						)}
						{showPreview ? "Edit" : "Preview"}
					</button>
					<button
						type="button"
						onClick={handleSave}
						className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						<Save className="w-4 h-4" />
						Save
					</button>
				</div>
			</div>

			{/* Editor/Preview */}
			<div className="border rounded-lg overflow-hidden">
				{showPreview ? (
					<div className="p-6 bg-white min-h-[400px] prose prose-sm max-w-none">
						{localValue ? (
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{localValue}
							</ReactMarkdown>
						) : (
							<p className="text-gray-500 italic">
								No content to preview
							</p>
						)}
					</div>
				) : (
					<div className="relative">
						<textarea
							value={localValue}
							onChange={handleChange}
							placeholder={placeholder}
							className="w-full h-[400px] p-4 border-0 resize-none focus:outline-none focus:ring-0 font-mono text-sm"
							style={{
								fontFamily:
									'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
							}}
						/>
						{/* Markdown Help */}
						<div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded border">
							Markdown supported
						</div>
					</div>
				)}
			</div>

			{/* Markdown Help */}
			{!showPreview && (
				<div className="bg-gray-50 p-4 rounded-lg border">
					<h4 className="text-sm font-medium text-gray-700 mb-2">
						Markdown Quick Reference:
					</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
						<div>
							<code className="bg-white px-1 rounded">
								# Heading
							</code>{" "}
							- Main heading
						</div>
						<div>
							<code className="bg-white px-1 rounded">
								## Subheading
							</code>{" "}
							- Subheading
						</div>
						<div>
							<code className="bg-white px-1 rounded">
								**Bold**
							</code>{" "}
							- Bold text
						</div>
						<div>
							<code className="bg-white px-1 rounded">
								*Italic*
							</code>{" "}
							- Italic text
						</div>
						<div>
							<code className="bg-white px-1 rounded">
								[Link](url)
							</code>{" "}
							- Create link
						</div>
						<div>
							<code className="bg-white px-1 rounded">
								![Alt](image.jpg)
							</code>{" "}
							- Add image
						</div>
						<div>
							<code className="bg-white px-1 rounded">
								- Item
							</code>{" "}
							- Bullet list
						</div>
						<div>
							<code className="bg-white px-1 rounded">
								1. Item
							</code>{" "}
							- Numbered list
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
