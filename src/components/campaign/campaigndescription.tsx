"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CampaignDescriptionProps {
	markdown: string;
}

export default function CampaignDescription({
	markdown,
}: CampaignDescriptionProps) {
	return (
		<div className="prose prose-lg max-w-none bg-white rounded-xl shadow p-6">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{markdown}
			</ReactMarkdown>
		</div>
	);
}
