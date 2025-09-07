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
		<Card radius="md" shadow="none" p={0}>
			<Text fw={700} fz="h2" mb="sm">
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

			<Text fw={500}>
				&#8377;{progress.collection.toLocaleString("en-IN")}{" "}
				<Text span c="dimmed">
					raised out of &#8377;
					{progress.total.toLocaleString("en-IN")}
				</Text>
			</Text>

			<Progress value={percent} mt="sm" />

			<Group justify="space-between" mt="md" mb="md">
				{daysLeft !== null && (
					<Group gap="xs">
						<IconClock size={16} />
						<Text fz="sm">{daysLeft} days left</Text>
					</Group>
				)}
				<Group gap="xs">
					<IconUsers size={16} />
					<Text fz="sm">{backerCount} Backers</Text>
				</Group>
			</Group>

			{beneficiary && beneficiary.name && beneficiary.location && (
				<Card withBorder padding="md" radius="md">
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
		<Paper mb="md">
			<Grid gutter={0}>
				<Grid.Col span={{ base: 12, lg: 8 }}>
					<Box pos="relative" h={{ base: 260, lg: "100%" }}>
						<Image
							src={imageUrl}
							alt={props.title}
							fill
							style={{ objectFit: "cover" }}
							priority
						/>
					</Box>
				</Grid.Col>

				<Grid.Col span={{ base: 12, lg: 4 }}>
					<Box
						p={{ sm: "md", lg: "xl" }}
						py={{ base: "md" }}
						h="100%"
						display="flex"
						style={{ alignContent: "center" }}
					>
						<Details {...props} />
					</Box>
				</Grid.Col>
			</Grid>
		</Paper>
	);
}
