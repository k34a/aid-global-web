import ContactUsDetails from "@/components/contact-us/details";
import ContactUsForm from "@/components/contact-us/form";

export default function ContactPage() {
	return (
		<main>
			<section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white py-16 px-4 sm:px-6">
				<div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-3 overflow-hidden">
					<ContactUsDetails />
					<ContactUsForm />
				</div>
			</section>
		</main>
	);
}
