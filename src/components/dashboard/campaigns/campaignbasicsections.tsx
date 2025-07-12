import { FileText, IndianRupee } from "lucide-react";
import RichTextEditor from "./rich-text-editor";
export interface FormDataType {
	title: string;
	description: string;
	amount: number;
	ended_at: string;
	banner_image: string;
	slug: string;
}

export default function CampaignBasicInfoSection({
	formData,
	setFormData,
	richTextContent,
	setRichTextContent,
}: {
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
	richTextContent: string;
	setRichTextContent: React.Dispatch<React.SetStateAction<string>>;
}) {
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
				<FileText className="w-5 h-5" />
				Basic Information
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Campaign Title
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded-md"
						required
					/>
				</div>
				<div>
					<label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
						<IndianRupee className="w-4 h-4" /> Target Amount
					</label>
					<input
						type="number"
						name="amount"
						value={formData.amount === 0 ? "" : formData.amount}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border rounded-md"
						min="0"
						required
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Short Description
				</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleInputChange}
					maxLength={160}
					rows={3}
					className="w-full px-3 py-2 border rounded-md"
				/>
				<p className="text-xs text-gray-500 mt-1">
					{formData.description.length}/160 characters
				</p>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					End Date (Optional)
				</label>
				<input
					type="date"
					name="ended_at"
					value={formData.ended_at}
					onChange={handleInputChange}
					className="w-full px-3 py-2 border rounded-md"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
					<FileText className="w-5 h-5" />
					Detailed Description
				</h2>
				<RichTextEditor
					value={richTextContent}
					onChange={setRichTextContent}
					placeholder="Write a detailed description of your campaign..."
				/>
			</div>
		</div>
	);
}
