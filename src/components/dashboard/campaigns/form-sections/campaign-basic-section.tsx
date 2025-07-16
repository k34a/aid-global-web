// File 2: src/components/dashboard/campaigns/create/sections/CampaignBasicInfoSection.tsx
import { IndianRupee, FileText } from "lucide-react";
import { FormDataType } from "../types";

interface Props {
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
	isCreate?: boolean;
}

export default function CampaignBasicInfoSection({
	formData,
	setFormData,
	isCreate,
}: Props) {
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (isCreate && name === "title") {
			const baseSlug = value
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9\s-]/g, "")
				.replace(/\s+/g, "-")
				.replace(/-+/g, "-")
				.replace(/(^-|-$)/g, "");

			if (baseSlug === "new") {
				setFormData((prev) => ({ ...prev, slug: "campaign-new" }));
			} else {
				const timestamp = Date.now().toString().slice(-6);
				const uniqueSlug = baseSlug
					? `${baseSlug}-${timestamp}`
					: `campaign-${timestamp}`;
				setFormData((prev) => ({ ...prev, slug: uniqueSlug }));
			}
		}
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
						Campaign Title *
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
						placeholder="Enter campaign title"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Campaign Slug *
					</label>
					<div className="flex items-center gap-2">
						<span className="text-gray-500">/campaign/</span>
						<input
							type="text"
							name="slug"
							value={formData.slug}
							onChange={handleInputChange}
							className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
							placeholder="campaign-slug"
							disabled={!isCreate}
						/>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
						<IndianRupee className="w-4 h-4" />
						Target Amount *
					</label>
					<input
						type="number"
						name="amount"
						placeholder="1000"
						value={formData.amount === 0 ? "" : formData.amount}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					/>
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
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Short Description *
				</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleInputChange}
					rows={3}
					maxLength={160}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
					placeholder="Brief description of the campaign (max 160 characters)"
				/>
				<p className="text-xs text-gray-500 mt-1">
					{formData.description.length}/160 characters
				</p>
			</div>
		</div>
	);
}
