import { getBackerDetailsById } from "@/lib/db/donation";
import { ngoDetails } from "@/config/config";
import { DEFAULT_CAMPAIGN } from "@/config/data";
import numWords from "num-words";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Donation Status",
	description: "View the status of your donation and download the receipt",
	openGraph: {
		title: "Donation Status",
		description:
			"View the status of your donation and download the receipt",
	},
	twitter: {
		card: "summary_large_image",
		title: "Donation Status",
		description:
			"View the status of your donation and download the receipt",
	},
};

type PageProps = {
	params: Promise<{ id: string }>;
};

export default async function DonationStatusPage({ params }: PageProps) {
	const donation = await getBackerDetailsById((await params).id);

	if (!donation) {
		return (
			<div className="max-w-2xl mx-auto p-6 text-center">
				<h1 className="text-2xl font-bold text-red-600">
					404 - Not Found
				</h1>
				<p className="mt-2 text-gray-600">
					We couldn&apos;t find a donation with this ID.
				</p>
			</div>
		);
	}

	const isNGOLevel = donation.campaign_id === DEFAULT_CAMPAIGN;
	const formattedDate = new Date(donation.created_at).toLocaleDateString(
		"en-IN",
		{ year: "numeric", month: "long", day: "numeric" },
	);

	return (
		<main className="max-w-3xl mx-auto p-6 bg-white print:bg-white rounded-xl shadow print:shadow-none text-sm text-black">
			{/* Header */}
			<div className="text-center border-b-3 pb-4 mb-6">
				<div className="relative w-24 h-24 mx-auto shrink-0">
					<Image
						src={ngoDetails.logo}
						alt={`${ngoDetails.name} Logo`}
						sizes="(max-width: 768px) 300px, 300px"
						fill
						className="object-contain"
					/>
				</div>
				<h1 className="text-2xl font-bold">{ngoDetails.name}</h1>
				<p className="text-gray-600">{ngoDetails.tagline}</p>
			</div>

			{/* Thank you Message */}
			<div className="mb-6 text-center">
				<h2 className="text-xl font-semibold text-green-600">
					Thank You!
				</h2>
				<p className="mt-2 text-gray-700">
					We sincerely appreciate your generous donation. Your
					contribution helps us continue our mission and bring
					positive change.
				</p>
			</div>

			{/* Receipt Table */}
			<div className="mb-8">
				<h2 className="text-lg font-semibold mb-4 border-b pb-2">
					Donation Receipt
				</h2>
				<table className="w-full text-sm border border-gray-300">
					<tbody className="[&>tr]:border-b [&>tr:last-child]:border-b-0">
						<tr>
							<td className="font-semibold p-2 w-1/3 bg-gray-50">
								Receipt ID
							</td>
							<td className="p-2">{donation.id}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Date
							</td>
							<td className="p-2">{formattedDate}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Donor Name
							</td>
							<td className="p-2">{donation.name}</td>
						</tr>

						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Donor Email
							</td>
							<td className="p-2">{donation.email}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Donor Contact Number
							</td>
							<td className="p-2">{donation.contact_number}</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Is Donation Anonymous?
							</td>
							<td className="p-2">
								{donation.is_anon ? "Yes" : "No"}
							</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Amount Donated
							</td>
							<td className="p-2 font-bold text-green-700">
								&#8377;{donation.amount}
							</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Amount in Words
							</td>
							<td className="p-2">
								Rupees {numWords(donation.amount)} only
							</td>
						</tr>
						<tr>
							<td className="font-semibold p-2 bg-gray-50">
								Status
							</td>
							<td className="p-2">{donation.status}</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Campaign Info */}
			{!isNGOLevel && donation.campaigns && (
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 border-b pb-2">
						Campaign Details
					</h2>

					<p>
						Following are the details of the campaign you chose to
						support through your donation.
					</p>
					<table className="w-full text-sm border border-gray-300">
						<tbody className="[&>tr]:border-b [&>tr:last-child]:border-b-0">
							<tr>
								<td className="font-semibold p-2 w-1/3 bg-gray-50">
									{donation.campaigns.title}
								</td>
								<td className="p-2 text-wrap">
									{donation.campaigns.description}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}

			{/* Product Info */}
			{!isNGOLevel && donation.donated_products.length > 0 && (
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4 border-b pb-2">
						Products Donated
					</h2>
					<p>
						Breakdown of the specific products and quantities you
						donated to the campaign.
					</p>
					<table className="w-full text-sm border border-gray-300">
						<thead>
							<tr>
								<th className="font-semibold p-2 bg-gray-100">
									Product
								</th>
								<th className="font-semibold p-2 bg-gray-100">
									Quantity
								</th>
								<th className="font-semibold p-2 bg-gray-100">
									Price (per unit, &#8377;)
								</th>
							</tr>
						</thead>
						<tbody className="[&>tr]:border-t text-center">
							{donation.donated_products.map(
								(donatedProduct, index) => {
									return (
										<tr key={index}>
											<td className="p-2">
												{
													donatedProduct
														.campaign_products.title
												}
											</td>
											<td className="p-2">
												{donatedProduct.quantity} unit
												{donatedProduct.quantity > 1
													? "s"
													: ""}
											</td>
											<td className="p-2">
												{
													donatedProduct
														.campaign_products
														.price_per_unit
												}
											</td>
										</tr>
									);
								},
							)}
							{donation.unallocated_amount > 0 && (
								<tr>
									<td className="p-2">
										Others<sup>*</sup>
									</td>
									<td className="p-2">-</td>
									<td className="p-2">
										{donation.unallocated_amount}
									</td>
								</tr>
							)}
						</tbody>
					</table>
					{donation.unallocated_amount > 0 && (
						<p className="mt-2 text-xs text-gray-500">
							<sup>*</sup> This includes any unallocated amount
							from your donation. This happens when the donation
							exceeds the total value of selected products, or
							when no specific products or campaigns were chosen
							during donation.
						</p>
					)}
				</div>
			)}

			{/* Tax Note */}
			<div className="bg-sky-200 p-4 rounded mb-6 text-sm text-gray-900">
				<p>
					This receipt can be used to claim tax deductions under
					applicable Indian Income Tax laws (e.g., Section 80G).
					Please retain a printed or digital copy for your records.
				</p>
			</div>

			{/* Footer */}
			<div className="pt-4 text-sm text-gray-700">
				<p>
					<strong>{ngoDetails.name}</strong>
				</p>
				<p>{ngoDetails.contact.address}</p>
				<p>
					Email: {ngoDetails.contact.email} | Phone:{" "}
					{ngoDetails.contact.phone}
				</p>
				<p>Website: {ngoDetails.contact.website}</p>
				<p className="mt-4 text-xs text-center text-gray-500">
					To verify or reprint this receipt, visit:{" "}
					<span className="underline">{`${ngoDetails.contact.website}/donation/${donation.id}`}</span>
				</p>
			</div>
		</main>
	);
}
