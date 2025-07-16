"use client";

import { FileText } from "lucide-react";
import RichTextEditor from "@/components/dashboard/campaigns/rich-text-editor";

interface CampaignRichTextSectionProps {
	value: string;
	onChange: (value: string) => void;
}

export default function CampaignRichTextSection({
	value,
	onChange,
}: CampaignRichTextSectionProps) {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
				<FileText className="w-5 h-5" />
				Detailed Description
			</h2>
			<RichTextEditor
				value={value}
				onChange={onChange}
				placeholder="Write a detailed description of your campaign..."
			/>
		</div>
	);
}
