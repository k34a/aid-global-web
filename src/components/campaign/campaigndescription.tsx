"use client";

interface CampaignDescriptionProps {
	content: string;
}

export default function CampaignDescription({
	content,
}: CampaignDescriptionProps) {
	return (
		<div className="prose prose-lg max-w-none bg-white rounded-xl shadow p-6">
			<div
				dangerouslySetInnerHTML={{ __html: content }}
				className="rich-text-content"
			/>
		</div>
	);
}
