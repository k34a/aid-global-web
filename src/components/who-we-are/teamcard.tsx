"use client";

import Image from "next/image";
import { Card, Text, Button, Group } from "@mantine/core";
import Linkedin from "@/components/icons/linkedin";

type TeamCardProps = {
	name: string;
	role: string;
	imageSrc: string;
	linkedinUrl: string;
};

export default function TeamCard({
	name,
	role,
	imageSrc,
	linkedinUrl,
}: TeamCardProps) {
	return (
		<Card
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			className="w-[90%] max-w-xs mx-auto sm:w-60"
		>
			<Card.Section>
				<div className="flex justify-center pt-4">
					<Image
						src={imageSrc}
						alt={`${name} profile`}
						width={120}
						height={120}
						className="rounded-full"
					/>
				</div>
			</Card.Section>

			<Group justify="center" mt="md" mb="xs">
				<Text fw={600} size="lg" ta="center">
					{name}
				</Text>
			</Group>

			<Text ta="center" c="indigo" size="sm" mb="sm">
				{role}
			</Text>

			<Button
				component="a"
				href={linkedinUrl}
				target="_blank"
				rel="noopener noreferrer"
				variant="filled"
				color="blue"
				fullWidth
				radius="md"
				mt="md"
			>
				LinkedIn
			</Button>
		</Card>
	);
}
