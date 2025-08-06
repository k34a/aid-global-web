"use client";

import { Box, Button, Center, Divider, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function FormSubmitted() {
	return (
		<Box
			px="xl"
			py="xl"
			className="mb-10 rounded-3xl mx-auto max-w-lg w-full sm:px-8 sm:py-10"
		>
			<Title className="text-center font-bold mb-1 text-green-600 text-3xl sm:text-4xl lg:text-5xl">
				Application Submitted!
			</Title>

			<Text mt="md" size="md" ta="center">
				Thank you for applying to Aid Global Organization. Your interest
				in joining our mission means a great deal. Our team will review
				your application and contact you shortly.
			</Text>

			<Divider my={20} size={50} />

			<Text mt="md" size="md" ta="center">
				At{" "}
				<Link
					href="/"
					className="hover:underline text-sky-700 hover:text-sky-500"
				>
					Aid Global Foundation
				</Link>
				, we empower communities through action. From{" "}
				<Link
					href="/shiksha-aid"
					className="hover:underline text-sky-700 hover:text-sky-500"
				>
					education
				</Link>{" "}
				and{" "}
				<Link
					href="/cure-aid"
					className="hover:underline text-sky-700 hover:text-sky-500"
				>
					health
				</Link>{" "}
				initiatives to{" "}
				<Link
					href="/sakhi-aid"
					className="hover:underline text-sky-700 hover:text-sky-500"
				>
					women&apos;s empowerment
				</Link>{" "}
				and{" "}
				<Link
					href="/ghar-aid"
					className="hover:underline text-sky-700 hover:text-sky-500"
				>
					rescue operations
				</Link>
				, our programs span multiple domains and reach some of the
				world&apos;s most underserved populations.
			</Text>

			<Text mt="md" size="md" ta="center">
				In the meantime, we invite you to explore our latest articles to
				see how we&apos;re driving real-world impact and how you can get
				involved beyond this application.
			</Text>

			<Center mt="xl">
				<Button
					component={Link}
					href="/articles"
					size="md"
					radius="md"
					color="blue"
					className="px-6 py-2 text-white shadow-lg hover:shadow-lg"
				>
					Explore Articles
				</Button>
			</Center>
		</Box>
	);
}
