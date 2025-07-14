"use client";

interface CampaignDescriptionProps {
	markdwon: string;
}

export default function CampaignDescription({
	markdwon,
}: CampaignDescriptionProps) {
	return (
		<div className="prose prose-lg max-w-none bg-white rounded-xl shadow p-6">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{markdown}
			</ReactMarkdown>
		</div>
	);
}
