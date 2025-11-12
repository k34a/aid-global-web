"use client";

import React from "react";
import {
	Card,
	Text,
	Badge,
	Group,
	Button,
	Stack,
	Avatar,
	Progress,
	Flex,
	Title,
	Grid,
	useMantineTheme,
} from "@mantine/core";
import {
	IconUser,
	IconCurrencyRupee,
	IconBrandWhatsapp,
} from "@tabler/icons-react";
import { CampaignDetailsForListing } from "@/lib/db/campaigns";
import Image from "@/components/image";
import { getImageForCampaign, getInitials } from "../campaign/utils";
import { ngoDetails } from "@/config/config";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
	campaign: CampaignDetailsForListing;
}

export default function CampaignCard({ campaign }: Props) {
	const {
		id,
		title,
		slug,
		collection,
		backers,
		banner_image,
		beneficiary,
		amount,
	} = campaign;

	const theme = useMantineTheme();
	const isSmallScreen = useMediaQuery(
		`(max-width: ${theme.breakpoints.sm}px)`,
	);

	const shareUrl = `${ngoDetails.contact.website}/campaigns/${slug}`;
	const shareText = encodeURIComponent(
		`Check out this campaign "${title}": ${shareUrl}`,
	);
	const whatsappLink = `https://wa.me/?text=${shareText}`;

	const percent = amount > 0 ? Math.min((collection / amount) * 100, 100) : 0;
	const campaignLink = `/campaigns/${slug}`;

	return (
		<Card
			shadow="sm"
			radius="md"
			p={0}
			withBorder
			maw={350}
			style={{ width: "100%" }}
		>
			{banner_image && (
				<Card.Section style={{ position: "relative" }}>
					<Link href={campaignLink}>
						<Image
							src={getImageForCampaign(id, banner_image)}
							alt={`${title} banner`}
							width={400}
							height={220}
							style={{
								objectFit: "cover",
								width: "100%",
								height: 220,
							}}
						/>
					</Link>
					<Badge
						variant="filled"
						size="sm"
						radius="sm"
						style={{
							position: "absolute",
							top: 20,
							right: 10,
							zIndex: 10,
							padding: "4px 8px",
							fontWeight: 600,
						}}
					>
						Tax Benefit
					</Badge>
				</Card.Section>
			)}

			<Stack gap="xs" p="md">
				<Link href={campaignLink}>
					<Title size="lg" order={3}>
						{title}
					</Title>
				</Link>

				{beneficiary && beneficiary.name && beneficiary.location && (
					<Group mt="sm" gap="xs">
						<Avatar size="sm" radius="xl">
							{getInitials(beneficiary.name)}
						</Avatar>
						<Text fw={500} c="dimmed" size="sm">
							By {beneficiary.name}
						</Text>
					</Group>
				)}

				<Grid columns={isSmallScreen ? 1 : 2} align="center">
					<Grid.Col
						span={1}
						style={{ textAlign: isSmallScreen ? "left" : "left" }}
					>
						<Text w={600} size="md" c="black" inline>
							<IconCurrencyRupee
								size={18}
								style={{ display: "inline" }}
							/>
							<b>{collection.toLocaleString("en-IN")}</b>{" "}
							<Text component="span" c="dimmed" inline>
								Raised
							</Text>
						</Text>
					</Grid.Col>

					<Grid.Col
						span={1}
						style={{ textAlign: isSmallScreen ? "left" : "right" }}
					>
						<Group
							gap={4}
							align="center"
							wrap="nowrap"
							justify={isSmallScreen ? "flex-start" : "flex-end"}
						>
							<IconUser size={18} />
							<Text size="md" c="black" inline>
								<b>{backers}</b>
							</Text>
							<Text component="span" c="dimmed" inline>
								Backers
							</Text>
						</Group>
					</Grid.Col>
				</Grid>

				<Progress value={percent} mt="sm" />

				<Flex gap="sm" direction={isSmallScreen ? "column" : "row"}>
					<Button
						component="a"
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						color="green"
						leftSection={<IconBrandWhatsapp size={16} />}
						fullWidth
						size="md"
					>
						Share
					</Button>

					<Button
						component="a"
						href={campaignLink}
						variant="filled"
						fullWidth
						size="md"
					>
						Donate Now
					</Button>
				</Flex>
			</Stack>
		</Card>
	);
}
