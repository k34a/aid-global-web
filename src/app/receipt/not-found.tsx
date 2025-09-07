"use client";

import Image from "@/components/image";
import Footer from "@/components/structure/footer";
import HeaderMegaMenu from "@/components/structure/header";

import { ngoDetails, STATIC_IMAGE_HOST } from "@/config/config";
import {
	Button,
	Center,
	Container,
	Divider,
	Group,
	List,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
	return (
		<>
			<HeaderMegaMenu />

			<Container size="md" py="xl" mih="80vh" mt={80}>
				<Center>
					<Stack align="center" gap="xl" w="100%">
						{/* Illustration */}
						<Image
							src={`${STATIC_IMAGE_HOST}receipt-not-found.svg`}
							alt="Receipt Not Found"
							height={400}
							width={400}
							style={{ maxWidth: "100%", height: "auto" }}
						/>

						{/* Title */}
						<Title order={1} ta="center">
							Donation Receipt Not Found
						</Title>

						{/* Description */}
						<Text size="md" c="dimmed" ta="center">
							We couldn&apos;t find the donation receipt
							you&apos;re looking for. This could be due to one of
							the following reasons:
						</Text>

						{/* Reason List */}
						<List
							spacing="xs"
							size="sm"
							maw={500}
							icon={<IconChevronRight size={14} />}
						>
							<List.Item>
								The receipt doesn&apos;t exist.
							</List.Item>
							<List.Item>
								The donation wasn&apos;t completed.
							</List.Item>
							<List.Item>
								The link has expired (receipts for incomplete
								donations are only available for 3 days).
							</List.Item>
						</List>

						<Divider w="100%" />

						{/* Contact Text */}
						<Text size="sm" c="dimmed" ta="center">
							If you believe this is a mistake, please{" "}
							<Link
								href="/contact"
								style={{
									color: "#0369a1",
									textDecoration: "underline",
								}}
							>
								contact us
							</Link>{" "}
							or write to us at{" "}
							<Text
								component="a"
								href={`mailto:${ngoDetails.contact.email}`}
								c="blue.6"
								td="underline"
							>
								{ngoDetails.contact.email}
							</Text>
							.
						</Text>

						{/* Contact Button */}
						<Group justify="center">
							<Button
								component={Link}
								href="/contact"
								size="md"
								variant="filled"
								color="blue"
								leftSection={<Mail size={16} />}
							>
								Contact Us
							</Button>
						</Group>
					</Stack>
				</Center>
			</Container>

			<Footer />
		</>
	);
}
