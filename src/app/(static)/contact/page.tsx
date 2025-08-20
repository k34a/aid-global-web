import ContactUsDetails from "@/components/contact-us/details";
import ContactUsForm from "@/components/contact-us/form";

export default function ContactPage() {
	return (
		<main>
			<section className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-16 px-4 sm:px-6 flex items-start justify-center">
				<div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 space-y-10">
					{/* Top: Contact Details & Map */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Left: Contact Details */}
						<div className="w-full">
							<ContactUsDetails />
						</div>

						{/* Right: Map */}
						<div className="w-full">
							<iframe
								title="Google Map"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.360039332275!2d73.0417286!3d19.2713426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bdaa5aaaaaab%3A0x6cfa52641767c98!2sReal%20Happiness%20Of%20Life%20Foundation!5e0!3m2!1sen!2sin!4v1700000000000"
								width="100%"
								height="100%"
								className="rounded-lg min-h-[300px] md:min-h-[400px]"
								style={{ border: 0 }}
								loading="lazy"
								allowFullScreen
							/>
						</div>
					</div>

					{/* Bottom: Contact Form */}
					<div>
						<ContactUsForm />
					</div>
				</div>
			</section>
		</main>
	);
}
