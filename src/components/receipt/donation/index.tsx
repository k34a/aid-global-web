"use client";

import { Paper } from "@mantine/core";
import { useState } from "react";
import DownloadReceipt from "@/components/receipt/common/download-receipt";
import ReceiptHeader from "@/components/receipt/common/head";
import ReceiptThankYou from "@/components/receipt/common/thank-you";
import DonorInfo from "./donor-info";
import ReceiptFooter from "@/components/receipt/common/foot";
import TaxNote from "@/components/receipt/common/tax-note";
import DonationInfo from "./donation-info";
import VerifyPinModal from "@/components/receipt/common/verification";
import { getDonationDetails } from "@/app/receipt/donation/action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { ReceiptDetails } from "@/lib/db/backers/types";

type Props = {
	id: string;
};

export default function DonationReceipt({ id }: Props) {
	const [donation, setDonation] = useState<ReceiptDetails | null>(null);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleVerify = async (pin: string) => {
		setLoading(true);
		setError(null);

		const res = await getDonationDetails(id, pin);

		if (!res) {
			toast.error("Donation receipt not found!");
			redirect("/");
		}

		if ("error" in res) {
			setError(res.error);
			setLoading(false);
			return;
		}

		setDonation(res);
		setModalOpen(false);
		setLoading(false);
	};

	if (!donation) {
		return (
			<>
				<VerifyPinModal
					opened={modalOpen}
					onSuccess={handleVerify}
					loading={loading}
					error={error}
				/>
			</>
		);
	}

	return (
		<main className="max-w-3xl mx-auto p-6 bg-white print:bg-white rounded-xl shadow print:shadow-none text-sm text-black">
			<Paper shadow="md" radius="lg" p="lg" withBorder>
				<ReceiptHeader />
				<ReceiptThankYou />
				<DonorInfo
					created_at={donation.created_at}
					id={donation.id}
					contact_number={donation.contact_number}
					name={donation.name}
					is_anon={donation.is_anon}
					email={donation.email}
					amount={donation.amount}
					status={donation.status}
				/>
				<DonationInfo
					campaign_id={donation.campaign_id}
					campaigns={donation.campaigns}
					donated_products={donation.donated_products}
					unallocated_amount={donation.unallocated_amount}
				/>
				<TaxNote />
				<DownloadReceipt />
				<ReceiptFooter id={donation.id} oneTime={true} />
			</Paper>
		</main>
	);
}
