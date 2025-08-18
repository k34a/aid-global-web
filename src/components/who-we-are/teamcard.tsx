import React from "react";
import { Card, Text, Avatar, Center, Stack } from "@mantine/core";
import { Linkedin } from "../icons";
import Link from "next/link";

type TeamCardProps = {
	name: string;
	role: string;
	imageSrc: string;
	linkedinUrl: string;
	onClick: () => void;
};

const TeamCard: React.FC<TeamCardProps> = ({
	name,
	role,
	imageSrc,
	linkedinUrl,
	onClick,
}) => {
	return (
		<Card
			shadow="md"
			padding="lg"
			radius="md"
			className="bg-amber-100 hover:shadow-xl transition cursor-pointer"
			onClick={onClick}
		>
			<Avatar
				src={imageSrc}
				alt={`${name} profile`}
				size={100}
				radius={50}
				mx="auto"
				className="mb-4"
			/>

			<Stack>
				<Center>
					<Text className="text-lg">{name}</Text>
				</Center>
				<Center>
					<Text c="blue.7" className="text-sm">
						{role}
					</Text>
				</Center>
				<Center>
					<Link
						href={linkedinUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline text-sky-700"
					>
						Linkedin
					</Link>
				</Center>
			</Stack>
		</Card>
	);
};

export default TeamCard;
