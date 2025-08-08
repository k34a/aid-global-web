import { Card, Text, Title } from "@mantine/core";
import Link from "next/link";
import type React from "react";

type LegalCardProps = {
	title: string;
	description: React.JSX.Element;
	link: string;
};

const LegalDocumentCard = ({ title, description, link }: LegalCardProps) => {
	return (
		<Link href={link} target="_blank" rel="noopener noreferrer">
			<Card
				shadow="sm"
				p="lg"
				radius="md"
				withBorder
				className="hover:shadow-md transition-shadow h-full"
			>
				<Title order={5} className="mb-2 text-blue-700">
					{title}
				</Title>
				<Text size="sm" className="text-gray-600">
					{description}
				</Text>
			</Card>
		</Link>
	);
};

export default LegalDocumentCard;
