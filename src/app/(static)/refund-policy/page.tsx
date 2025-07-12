import { ngoDetails } from "@/config/config";
import { Globe, MailCheck, MapPinCheck } from "lucide-react";

export const metadata = {
	title: "Refund Policy",
};

export default function RefundPolicyPage() {
	return (
		<main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
			<h1 className="text-3xl font-semibold mb-6">Refund Policy</h1>

			<p className="mb-6">
				{ngoDetails.name} is committed to maintaining the highest
				standards of transparency and accountability in its fundraising
				and donation practices. We appreciate the trust of our donors
				and recognize that there may be rare circumstances when a refund
				is requested.
			</p>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					1. General Principle
				</h2>
				<p>
					Donations made to {ngoDetails.name} are generally
					non-refundable. However, we understand that errors can
					happen. Refunds may be considered only in exceptional cases
					and at the sole discretion of the Foundation.
				</p>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					2. Eligible Circumstances for Refund
				</h2>
				<p className="mb-2">
					Refund requests will be considered only if all of the
					following conditions are met:
				</p>
				<ul className="list-disc pl-6 space-y-1">
					<li>
						The request is submitted within 7 (Seven) days of the
						donation date.
					</li>
					<li>
						The donation was made by mistake, in duplicate, or in
						the wrong amount due to error.
					</li>
					<li>
						No tax exemption certificate (such as 80G) has been
						issued or used.
					</li>
					<li>
						The donated amount has not been allocated or disbursed
						for program work.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					3. Required Information for Refund Request
				</h2>
				<p className="mb-2">A refund request must include:</p>
				<ul className="list-disc pl-6 space-y-1">
					<li>Full name of the donor</li>
					<li>Email address and contact number</li>
					<li>Date of donation</li>
					<li>Amount donated</li>
					<li>
						Mode of payment (Credit Card, UPI, Net Banking, Cheque,
						etc.)
					</li>
					<li>Transaction reference number or payment receipt</li>
					<li>Clear reason for requesting a refund</li>
				</ul>
				<p className="mt-2">Incomplete requests may be declined.</p>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					4. How to Submit a Refund Request
				</h2>
				<p>All refund requests must be submitted in writing to:</p>
				<ul className="pl-6 mt-2 space-y-1">
					<li className="flex items-center gap-3">
						<MailCheck size={18} /> Email:{" "}
						<a
							href={`mailto:${ngoDetails.contact.email}`}
							className="text-blue-600 hover:underline"
						>
							{ngoDetails.contact.email}
						</a>
					</li>
					<li className="pt-2 flex items-center gap-3">
						<MapPinCheck size={18} className="text-red-500" />{" "}
						<span>
							<strong>{ngoDetails.name}</strong>:{" "}
							{ngoDetails.contact.address}
						</span>
						<br />
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					5. Verification Process
				</h2>
				<ul className="list-disc pl-6 space-y-1">
					<li>
						Each request will be reviewed on a case-by-case basis.
					</li>
					<li>
						Additional documents or clarification may be requested.
					</li>
					<li>
						The Foundation reserves the right to verify the
						donor&apos;s identity and the authenticity of the
						request.
					</li>
					<li>Fraudulent or suspicious requests will be declined.</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					6. Approval and Refund Timeline
				</h2>
				<ul className="list-disc pl-6 space-y-1">
					<li>
						Approved refunds will be processed within 7 to 30
						working days.
					</li>
					<li>
						Refunds will be issued to the original payment method
						when possible.
					</li>
					<li>
						Actual credit time may vary depending on banks and
						payment processors.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					7. Limitations and Discretion
				</h2>
				<ul className="list-disc pl-6 space-y-1">
					<li>
						{ngoDetails.name} retains full discretion to accept or
						reject any refund request.
					</li>
					<li>
						Refunds will not be provided for donations already used
						or allocated for program expenses.
					</li>
					<li>
						Refunds will not be given if a tax exemption certificate
						has been issued and claimed.
					</li>
					<li>
						In-kind donations (materials, goods, or services) are
						non-refundable.
					</li>
					<li>
						{ngoDetails.name} is not responsible for any bank or
						payment provider charges applied to refunds.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-xl font-semibold mb-2">
					8. Transparency and Accountability
				</h2>
				<p>
					{ngoDetails.name} is committed to transparent financial
					practices. All donations are used responsibly to support our
					mission and programs. We thank our donors for their trust
					and generosity.
				</p>
			</section>

			<section>
				<h2 className="text-xl font-semibold mb-2">
					9. Contact Information
				</h2>
				<p>
					For any queries or to submit a refund request, please
					contact:
				</p>
				<ul className="pl-6 space-y-1">
					<li className="flex items-center gap-3">
						<MailCheck size={18} /> Email:{" "}
						<a
							href={`mailto:${ngoDetails.contact.email}`}
							className="text-blue-600 hover:underline"
						>
							{ngoDetails.contact.email}
						</a>
					</li>
					<li className="flex items-center gap-3">
						<Globe size={18} /> Website:{" "}
						<a
							href={ngoDetails.contact.website}
							className="text-blue-600 hover:underline"
						>
							{ngoDetails.contact.website}
						</a>
					</li>
				</ul>
				<p className="mt-4 font-medium italic">
					{ngoDetails.name}
					<br />
					{ngoDetails.tagline}
				</p>
			</section>
		</main>
	);
}
