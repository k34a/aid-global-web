"use client";

import {
	Box,
	Button,
	Paper,
	Stack,
	Title,
	Group,
	Grid,
	TextInput,
	Flex,
	CopyButton,
} from "@mantine/core";
import {
	IconBrandFacebookFilled,
	IconBrandWhatsappFilled,
	IconBrandX,
	IconCurrencyRupee,
	IconHeartFilled,
	IconLink,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { ngoDetails } from "@/config/config";

const presetAmounts = [1000, 1800, 3000];

interface Props {
	amount: number;
	setAmount: (value: number) => void;
	onSubmit: () => void;
	slug: string;
}

export default function DonatePanel(props: Props) {
	const url = `${ngoDetails.contact.website}/campaign/${props.slug}`;

	return (
		<Grid.Col span={{ base: 12, lg: 4 }}>
			<Box
				style={{
					position: "sticky",
					top: 100,
				}}
			>
				<Paper p="md">
					<Title order={5}></Title>
					<Stack gap="xl">
						<Group gap="xs" justify="center">
							<Flex
								onClick={() =>
									window.open(
										`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
										"_blank",
									)
								}
								style={{
									backgroundColor: "#1877F2",
									borderRadius: 10000,
									color: "white",
									fontSize: "14px",
									cursor: "pointer",
								}}
								p="xs"
								gap="xs"
							>
								<IconBrandFacebookFilled color="white" />
								<span>Spread the word</span>
							</Flex>
							<Flex
								onClick={() =>
									window.open(
										`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=Support%20this%20campaign!`,
										"_blank",
									)
								}
								style={{
									backgroundColor: "black",
									borderRadius: 10000,
									fontSize: "14px",
									cursor: "pointer",
								}}
								p="xs"
							>
								<IconBrandX color="white" />
							</Flex>
							<Flex
								onClick={() =>
									window.open(
										`https://wa.me/?text=${encodeURIComponent(url)}`,
										"_blank",
									)
								}
								align="center"
								justify="center"
								style={{
									backgroundColor: "#25D366",
									borderRadius: 10000,
									fontSize: "14px",
									cursor: "pointer",
								}}
								p="xs"
								gap="xs"
							>
								<IconBrandWhatsappFilled color="white" />
							</Flex>
							<CopyButton value={url}>
								{({ copy }) => (
									<Flex
										style={{
											backgroundColor: "grey",
											borderRadius: 10000,
											fontSize: "14px",
											cursor: "pointer",
										}}
										p="xs"
										gap="xs"
										onClick={() => {
											toast.success("Link copied");
											copy();
										}}
									>
										<IconLink color="white" />
									</Flex>
								)}
							</CopyButton>
						</Group>
						<Paper
							withBorder
							shadow="md"
							radius="md"
							px="md"
							py="xl"
							bg="#e0f2fe"
							visibleFrom="lg"
						>
							<Stack gap="lg">
								<Group gap="sm">
									{presetAmounts.map((amt) => (
										<Button
											key={amt}
											size="md"
											variant={
												props.amount === amt
													? "filled"
													: "outline"
											}
											onClick={() => props.setAmount(amt)}
										>
											<IconCurrencyRupee size={14} />
											{amt.toLocaleString("en-IN")}
										</Button>
									))}
								</Group>

								<TextInput
									leftSection={<IconCurrencyRupee />}
									value={props.amount?.toString() ?? ""}
									onChange={(event) => {
										const parsedValue = parseInt(
											event.currentTarget.value,
										);
										if (Number.isNaN(parsedValue)) {
											props.setAmount(0);
											return;
										}
										props.setAmount(parsedValue);
									}}
								/>

								<Button
									fullWidth
									disabled={!props.amount}
									onClick={() => props.onSubmit()}
									size="lg"
									leftSection={
										<IconHeartFilled color="red" />
									}
									color="sky.5"
								>
									Donate{" "}
									{props.amount ? (
										<>
											<IconCurrencyRupee size={16} />{" "}
											{props.amount.toLocaleString(
												"en-IN",
											)}
										</>
									) : (
										""
									)}{" "}
									now
								</Button>
							</Stack>
						</Paper>
					</Stack>
				</Paper>
			</Box>
		</Grid.Col>
	);
}
