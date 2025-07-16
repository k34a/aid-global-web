import { useState } from "react";
import { Plus } from "lucide-react";

export const textColors = [
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

export const highlightColors = [
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

export default ColorPalette;
