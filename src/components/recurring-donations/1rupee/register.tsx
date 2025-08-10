import RegistrationHeader from "./registration-header";
import RegistrationInfo from "./registration-info";
import SubscriptionForm from "../form";
import Link from "next/link";

export default function Register() {
	return (
		<section className="py-16 px-6 lg:px-26 bg-gray-100">
			<RegistrationHeader />
			<div className="container mx-auto max-w-7xl">
				<div className="bg-[#FFD700]/5 rounded-2xl p-8 shadow-md">
					<SubscriptionForm
						plan_id="29c7e0b7-7edf-4db5-95e2-977793672cee"
						footer={<RegistrationInfo />}
						submitButton={"Join The Rs. 1 Club - Rs. 1/day"}
					/>

					<div className="mt-6 text-center">
						<Link
							href="/recurring-donations/faq"
							className="text-blue-600 text-lg md:text-xl font-semibold hover:underline hover:text-blue-800 transition"
						>
							Any queries ?
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
