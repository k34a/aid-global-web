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
		<div
			className="prose prose-lg max-w-none bg-white rounded-xl shadow p-6 
                [&_h1]:text-sky-500 [&_h2]:text-sky-600 [&_h3]:text-sky-500 
                [&_h4]:text-sky-400 [&_h5]:text-sky-300 [&_h6]:text-sky-200"
		>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{markdown}
			</ReactMarkdown>
		</div>
	);
}
