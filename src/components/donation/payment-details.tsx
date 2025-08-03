"use client";

import Image from "next/image";
import { IndianRupee, Banknote, QrCode, Contact } from "lucide-react";
import { DonationDetails } from "@/config/donation";

export default function DonatePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10  flex items-center justify-center">
			<div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8">
				<h1 className="text-4xl font-bold text-[#2563eb] text-center mb-8">
					Support Our Cause
				</h1>

				{/* Main Two-Column Layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* LEFT SIDE: Bank and UPI */}
					<div className="space-y-6">
						{/* Bank Details */}
						<div className="border border-indigo-200 rounded-xl p-6 bg-indigo-50">
							<h2 className="text-xl font-semibold text-indigo-800 flex items-center gap-2 mb-2">
								<Banknote size={22} />
								Bank Account
							</h2>
							<div className="text-md text-indigo-900 space-y-1">
								<p>
									<span className="font-medium">
										Account Name:
									</span>{" "}
									{DonationDetails.accountName}
								</p>
								<p>
									<span className="font-medium">
										Account Number:
									</span>{" "}
									{DonationDetails.accountNumber}
								</p>
								<p>
									<span className="font-medium">
										IFSC Code:
									</span>{" "}
									{DonationDetails.codeIFSC}
								</p>
								<p>
									<span className="font-medium">
										MICR Code:
									</span>{" "}
									{DonationDetails.codeMICR}
								</p>
								<p>
									<span className="font-medium">
										Bank Name:
									</span>{" "}
									{DonationDetails.bankName}
								</p>
								<p>
									<span className="font-medium">
										Brnach Address:
									</span>{" "}
									{DonationDetails.branchAddress}
								</p>
							</div>
						</div>

						{/* UPI Details */}
						<div className="border border-emerald-200 rounded-xl p-6 bg-emerald-50">
							<h2 className="text-xl font-semibold text-emerald-800 flex items-center gap-2 mb-2">
								<Contact size={22} />
								UPI Details
							</h2>
							<div className="text-md text-emerald-900 space-y-1 whitespace-normal">
								<p>
									<span className="text-md">UPI ID:</span>{" "}
									<span className="break-all">
										{DonationDetails.upiID}
									</span>
								</p>
							</div>
						</div>
					</div>

					{/* RIGHT SIDE: QR Code */}
					<div className="border border-gray-200 rounded-xl p-6 bg-gray-50 flex flex-col items-center justify-center">
						<h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
							<QrCode size={22} />
							Scan QR to Donate
						</h2>
						<Image
							src={DonationDetails.qrSrc}
							alt="Donate QR Code"
							width={220}
							height={220}
							className="rounded-lg"
							priority
						/>
					</div>
				</div>

				{/* Footer Note */}
				<p className="text-lg text-gray-500 text-center mt-10">
					You can make donations via Bank Transfer (NEFT / RTGS /
					IMPS) using the above details. <br />
					Every contribution counts. Thank you for your support!
				</p>
			</div>
		</div>
	);
}
