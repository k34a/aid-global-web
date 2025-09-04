"use client";

import React, { useState } from "react";
import { Button, Modal, TextInput, Checkbox, Textarea } from "@mantine/core";
import {
	onCampaignDonateButtonClick,
	onDonateButtonClick,
	RazorpayScript,
} from "@/components/donate";
import { CampaignProduct } from "@/lib/db/campaigns";
import { IndianRupee } from "lucide-react";

interface DonationDetailsModalProps {
	opened: boolean;
	onClose: () => void;
	// Donation details to be passed from DonationSummary
	products: CampaignProduct[];
	selectedProducts: Record<string, number>;
	totalCost: number;
	amountInput: number;
	autoAllocate: boolean;
	campaignId: string;
	isDirectDonation: boolean;
}

export const DonationDetailsModal: React.FC<DonationDetailsModalProps> = ({
	opened,
	onClose,
	products,
	selectedProducts,
	totalCost,
	amountInput,
	autoAllocate,
	campaignId,
	isDirectDonation,
}) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [notes, setNotes] = useState("");

	const isFormValid = () => {
		return name && email && contact;
	};

	const handleDonate = () => {
		if (isFormValid()) {
			if (isDirectDonation) {
				onDonateButtonClick({
					userInfo: {
						name,
						email,
						contact_number: contact,
						notes,
					},
					is_anon: isAnonymous,
					donation_details: {
						amount: amountInput,
					},
				});
			} else {
				onCampaignDonateButtonClick({
					userInfo: {
						name,
						email,
						contact_number: contact,
						notes,
					},
					is_anon: isAnonymous,
					campaign_details: {
						campaign_id: campaignId,
						products: selectedProducts,
						auto_allocate: autoAllocate,
						amount: amountInput,
					},
				});
			}
			onClose(); // Close modal after donation is initiated
		} else {
			// Potentially show an error message to the user
			alert(
				"Please fill in all required fields (Name, Email, Contact Number).",
			);
		}
	};

	return (
		<Modal opened={opened} onClose={onClose} title="Enter Your Details">
			<RazorpayScript />
			<div className="space-y-4">
				<TextInput
					label="Your Name"
					placeholder="Your Name"
					value={name}
					onChange={(event) => setName(event.currentTarget.value)}
					required
				/>
				<TextInput
					label="Your Email"
					placeholder="Your Email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.currentTarget.value)}
					required
				/>
				<TextInput
					label="Contact Number"
					placeholder="Contact Number"
					type="tel"
					value={contact}
					onChange={(event) => setContact(event.currentTarget.value)}
					required
				/>
				<Checkbox
					label="Donate Anonymously"
					checked={isAnonymous}
					onChange={(event) =>
						setIsAnonymous(event.currentTarget.checked)
					}
				/>
				<Textarea
					label="Donation Message (Optional)"
					placeholder="Share why you're making this donation (100-160 characters)"
					value={notes}
					onChange={(event) => setNotes(event.currentTarget.value)}
					maxLength={160}
					rows={3}
				/>
				<Button
					onClick={handleDonate}
					disabled={!isFormValid()}
					className="w-full bg-sky-600 hover:bg-sky-700"
				>
					Donate {amountInput}
				</Button>
			</div>
		</Modal>
	);
};
