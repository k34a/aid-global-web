import { Suspense } from "react";
import Donate from "@/components/donation/donate";
import PaymentCard from "@/components/donation/payment-details";
import FaqSection from "@/components/donation/faq-section";
import { Loader, Center, Stack, Text } from "@mantine/core";

export default function DonatePage() {
	return (
		<main>
			<Suspense
				fallback={
					<Center className="min-h-[50vh]">
						<Stack gap="xs" justify="center">
							<Loader color="red" size="lg" />
							<Text c="dimmed" size="sm">
								Loading donation form...
							</Text>
						</Stack>
					</Center>
				}
			>
				<Donate />
			</Suspense>

			<PaymentCard />
			<FaqSection />
		</main>
	);
}
