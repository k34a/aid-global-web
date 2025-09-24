import { bankDetails } from "@/config/bank-details";
import { ngoDetails, STATIC_IMAGE_HOST } from "@/config/config";
import Image from "@/components/image";

export default function OtherDonationModes() {
	return (
		<section className="max-w-6xl mx-auto mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
			<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-10">
				Other Ways to Donate
			</h2>

			{/* UPI QR and UPI ID */}
			<div className="grid grid-cols-1 gap-10 items-center mb-12">
				<div className="text-center">
					<h3 className="text-lg font-semibold text-gray-800 mb-2">
						UPI Payment (Scan & Pay)
					</h3>
					<div className="flex flex-col items-center">
						<Image
							src={bankDetails.upi.qr}
							alt="UPI QR Code"
							width={500}
							height={500}
							className="rounded-lg border border-gray-300"
						/>
						<p className="mt-4 text-sm text-gray-800 font-mono bg-gray-100 px-4 py-2 rounded">
							UPI ID: {bankDetails.upi.id}
						</p>
					</div>
				</div>

				{/* Bank Transfer */}
				<div>
					<h3 className="text-lg font-semibold text-gray-800 mb-4">
						Bank Transfer
					</h3>
					<p className="text-md text-gray-500 mt-2">
						{bankDetails.notes.bank}
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
						{bankDetails.account.map((acc, idx) => (
							<div
								key={idx}
								className="bg-gray-100 rounded-lg p-4 text-sm leading-6 border border-gray-200 shadow-sm"
							>
								<p>
									<strong>Account Name:</strong> {acc.name}
								</p>
								<p>
									<strong>Account Number:</strong>{" "}
									{acc.number}
								</p>
								<p>
									<strong>Bank Name:</strong> {acc.bank}
								</p>
								<p>
									<strong>Branch:</strong> {acc.branchAddress}
								</p>
								<p>
									<strong>IFSC Code:</strong> {acc.ifsc}
								</p>
								<p>
									<strong>MICR Code:</strong> {acc.micr}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Cheque Donation */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<div>
					<h3 className="text-lg font-semibold text-gray-800 mb-2">
						Cheque Donations
					</h3>
					<p className="text-sm text-gray-700 mb-2">
						For donations via cheques, please make cheques payable
						to:
					</p>
					<p className="font-semibold text-gray-900 text-sm mb-4 bg-gray-100 font-mono p-4">
						{bankDetails.cheque.payableTo}
					</p>
					<p className="text-sm text-gray-700 mb-2">
						{bankDetails.notes.cheque}
					</p>
					<div className="bg-gray-100 rounded-lg p-4 text-sm leading-6">
						{bankDetails.cheque.mailingAddress.map((line, idx) => (
							<p key={idx}>{line}</p>
						))}
					</div>
				</div>

				{/* Contact & Reminder */}
				<div className="text-center md:text-left">
					<h3 className="text-lg font-semibold text-gray-800 mb-2">
						Need a Donation Receipt?
					</h3>
					<p className="text-sm text-gray-700">
						If you donate via UPI, bank transfer, or cheque, please
						email us your payment details to receive your official
						donation receipt.
					</p>
					<p className="text-sm text-gray-600 mt-4">
						<strong>Contact:</strong> {ngoDetails.contact.phone}
						<br />
						<strong>Email:</strong> {ngoDetails.contact.email}
					</p>
				</div>
			</div>
		</section>
	);
}
