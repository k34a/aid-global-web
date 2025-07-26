import Donate from "@/components/donation/donate";
import PaymentCard from "@/components/donation/payment-details";
import FaqSection from "@/components/donation/faq-section";

export default function DonatePage() {
	return (
		<main>
			<Donate />
			<PaymentCard />
			<FaqSection />
		</main>
	);
}
