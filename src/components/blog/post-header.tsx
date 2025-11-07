import { Title, Text, Group, Card, Image, Badge } from "@mantine/core";

interface PostHeaderProps {
	title: string;
	description: string;
	created_at: string;
	banner_image: string;
	tags: string[];
}

export default function PostHeader({
	title,
	description,
	created_at,
	banner_image,
	tags,
}: PostHeaderProps) {
	const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<>
			<Title order={1} className="mb-2">
				{title}
			</Title>

			<Group gap="md" mb="md">
				<Text size="sm" c="dimmed">
					{formattedDate}
				</Text>
			</Group>

			{/* SEO Description */}
			<Text size="md" c="dimmed" mb="md" className="italic">
				{description}
			</Text>

			{/* Tags */}
			{tags.length > 0 && (
				<Group gap="xs" mb="md">
					{tags.map((tag) => (
						<Badge key={tag} size="lg" variant="light">
							{tag}
						</Badge>
					))}
				</Group>
			)}

			<Card withBorder className="mb-6">
				<Image
					src={banner_image}
					alt={title}
					height={400}
					fit="cover"
				/>
			</Card>
		</>
	);
}
