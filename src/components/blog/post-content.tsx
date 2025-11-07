import { Card } from "@mantine/core";

interface PostContentProps {
	content: string;
}

export default function PostContent({ content }: PostContentProps) {
	return (
		<Card withBorder className="mb-6 p-6">
			<div
				className="prose prose-lg max-w-none"
				dangerouslySetInnerHTML={{
					__html: content,
				}}
			/>
		</Card>
	);
}
