"use client";

import {
	Card,
	Progress,
	Text,
	Group,
	Badge,
	Avatar,
	Tooltip,
	Box,
	Grid,
	Paper,
} from "@mantine/core";
import { IconUsers, IconClock, IconInfoCircle } from "@tabler/icons-react";
import { formatTimeLeft, getInitials } from "./utils";
import { ngoDetails } from "@/config/config";
import Image from "@/components/image";
import { getImageForCampaign } from "./utils";

interface CampaignIntroProps {
	id: string;
	program?: string;
	bannerImage: string;
	title: string;
	description: string;
	progress: {
		collection: number;
		total: number;
	};
	backerCount: number;
	endDate?: Date;
	beneficiary?: {
		name?: string;
		location?: string;
	};
}

const Details = (props: CampaignIntroProps) => {
	const { title, program, progress, endDate, backerCount, beneficiary } =
		props;

	const percent =
		progress.total > 0
			? Math.min((progress.collection / progress.total) * 100, 100)
			: 0;

	const daysLeft = formatTimeLeft(endDate);

	return (
		<Card radius="md" shadow="none" p={0} bg="transparent">
			<Text fw={700} fz="h2" mb="sm" c="white">
				{title}
			</Text>

			<Group mb="sm">
				<Tooltip
					label="Donations are eligible for tax exemption under 80G"
					openDelay={0}
				>
					<Badge
						rightSection={<IconInfoCircle size={12} />}
						style={{
							textTransform: "none",
						}}
					>
						Tax Benefit
					</Badge>
				</Tooltip>
				<Tooltip
					label={`At ${ngoDetails.name}, we believe that there's nothing more important than trust and transparency. Our team works tirelessly to ensure that all the campaigns go through stringent verification processes.`}
					openDelay={0}
					multiline
					w={220}
				>
					<Badge
						rightSection={<IconInfoCircle size={12} />}
						style={{
							textTransform: "none",
						}}
					>
						Verified
					</Badge>
				</Tooltip>

				{program && (
					<Badge
						style={{
							textTransform: "none",
						}}
					>
						{program}
					</Badge>
				)}
			</Group>

			<Text fw={500} c="white">
				&#8377;{progress.collection.toLocaleString("en-IN")}{" "}
				<Text span c="gray.3">
					raised out of &#8377;
					{progress.total.toLocaleString("en-IN")}
				</Text>
			</Text>

			<Progress value={percent} mt="sm" />

			<Group justify="space-between" mt="md" mb="md">
				{daysLeft !== null && (
					<Group gap="xs">
						<IconClock size={16} color="white" />
						<Text fz="sm" c="white">
							{daysLeft} days left
						</Text>
					</Group>
				)}
				<Group gap="xs">
					<IconUsers size={16} color="white" />
					<Text fz="sm" c="white">
						{backerCount} Backers
					</Text>
				</Group>
			</Group>

			{beneficiary && beneficiary.name && beneficiary.location && (
				<Card
					withBorder
					padding="md"
					radius="md"
					bg="rgba(255, 255, 255, 0.9)"
					style={{ backdropFilter: "blur(4px)" }}
				>
					<Text fw={500} fz="sm" c="dimmed">
						Campaign Beneficiary
					</Text>
					<Group mt="sm">
						<Avatar size="sm" radius="xl">
							{getInitials(beneficiary.name)}
						</Avatar>
						<div>
							<Text fw={500}>{beneficiary.name}</Text>
							<Text fz="xs" c="dimmed">
								{beneficiary.location}
							</Text>
						</div>
					</Group>
				</Card>
			)}
		</Card>
	);
};

export default function CampaignIntro(props: CampaignIntroProps) {
	const imageUrl = getImageForCampaign(props.id, props.bannerImage);

	return (
		<Paper mb="md" radius="md" style={{ overflow: "hidden" }}>
			<Box pos="relative" h={{ base: 400, lg: 350 }}>
				{/* Background Image */}
				<Image
					src={imageUrl}
					alt={props.title}
					fill
					style={{ objectFit: "cover" }}
					priority
				/>

				{/* Gradient */}
				<Box
					pos="absolute"
					top={0}
					left={0}
					right={0}
					bottom={0}
					style={{
						background:
							"linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
					}}
				/>

				{/* Content Overlay */}
				<Box
					pos="absolute"
					top={0}
					left={0}
					right={0}
					bottom={0}
					p={{ base: "md", lg: "xl" }}
					display="flex"
					style={{ alignItems: "center" }}
				>
					<Details {...props} />
				</Box>
			</Box>
		</Paper>
	);
}
