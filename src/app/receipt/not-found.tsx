import Image from "@/components/image";
import Footer from "@/components/structure/footer";
import HeaderMegaMenu from "@/components/structure/header";
import Navbar from "@/components/structure/navbar";
import { ngoDetails, STATIC_IMAGE_HOST } from "@/config/config";
import {
	Button,
	Container,
	Divider,
	Group,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
	return (
		<>
			{/* <HeaderMegaMenu /> */}
			<Navbar />

			<div className="flex min-h-[80vh] flex-col justify-center items-center bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 mt-12">
				<Container className="max-w-3xl text-center">
					<Stack gap="xl">
						{/* SVG Illustration */}
						<div className="w-full max-w-sm mx-auto">
							<Image
								src={`${STATIC_IMAGE_HOST}receipt-not-found.svg`}
								alt="Receipt Not Found"
								height={400}
								width={400}
								className="w-full h-auto"
							/>
						</div>

						<Title
							order={1}
							className="text-4xl sm:text-5xl font-bold text-gray-800"
						>
							Donation Receipt Not Found
						</Title>

						<Text size="md" className="text-gray-600">
							We couldn&apos;t find the donation receipt
							you&apos;re looking for. It might not exist, or it
							may have expired if the donation wasn&apos;t
							completed within 3 days.
						</Text>

						<Divider />

						<Text size="sm" className="text-gray-500">
							If you believe this is a mistake, please{" "}
							<Link
								href="/contact"
								className="text-blue-600 underline hover:text-blue-800"
							>
								contact us
							</Link>{" "}
							or write to us at{" "}
							<a
								href={`mailto:${ngoDetails.contact.email}`}
								className="text-blue-600 underline hover:text-blue-800"
							>
								{ngoDetails.contact.email}
							</a>
							.
						</Text>

						<Group justify="center">
							<Button
								href="/contact"
								component="a"
								size="md"
								variant="filled"
								color="blue"
								leftSection={<Mail size={16} />}
							>
								Contact Us
							</Button>
						</Group>
					</Stack>
				</Container>
			</div>

			<Footer />
		</>
	);
}
