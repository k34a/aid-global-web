"use client";

import {
	Button,
	Flex,
	Grid,
	Modal,
	SimpleGrid,
	Stack,
	Title,
} from "@mantine/core";
import DonorCard from "./donor-details-card";
import { useState } from "react";
import { getDonorDetails } from "@/lib/actions/campaigns/donor-details";
import toast from "react-hot-toast";

interface Props {
	campaignId: string;
	donors: Array<{
		name: string;
		amount: number;
		donatedAt: Date;
	}>;
	hasMore: boolean;
	count: number;
	modal: { isOpen: boolean; open: () => void; close: () => void };
}

export default function DonorDetailsList(props: Props) {
	const [donors, setDonors] = useState(props.donors);
	const [hasMorePages, setHasMorePages] = useState(props.hasMore);
	const [loading, setLoading] = useState(false);

	async function getMoreDonors() {
		setLoading(true);
		try {
			const resp = await getDonorDetails({
				campaignId: props.campaignId,
				offset: donors.length,
				limit: 10,
			});
			if (resp.status) {
				setDonors((value) => [...value, ...resp.data.donors]);
				setHasMorePages(resp.data.hasMore);
			} else {
				toast.error(resp.message);
			}
		} catch (error) {
			toast.error("Something went wrong...");
		} finally {
			setLoading(false);
		}
	}
	return (
		<Grid.Col span={{ base: 12, lg: 4 }}>
			<Stack gap="md">
				<Title order={3}>Donors ({props.count})</Title>
				{props.donors.map((donor, idx) => (
					<DonorCard {...donor} key={idx} />
				))}
				{props.hasMore && (
					<Flex align="center" justify="center">
						<Button variant="outline" onClick={props.modal.open}>
							View More
						</Button>
					</Flex>
				)}
			</Stack>
			<Modal
				opened={props.modal.isOpen}
				onClose={props.modal.close}
				size="lg"
				title={`All Donors (${props.count})`}
			>
				<SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
					{donors.map((donor, idx) => (
						<DonorCard {...donor} key={idx} />
					))}
				</SimpleGrid>
				{hasMorePages && (
					<Flex align="center" justify="center">
						<Button
							my="md"
							variant="outline"
							onClick={getMoreDonors}
							loading={loading}
						>
							View More
						</Button>
					</Flex>
				)}
			</Modal>
		</Grid.Col>
	);
}
