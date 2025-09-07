"use client";

import { Grid, Modal } from "@mantine/core";
import type { CampaignDetails as CampaignDetailsType } from "@/lib/db/campaigns";
import CampaignDescription from "./description";
import DonatePanel from "./donate-panel";
import { useState } from "react";
import toast from "react-hot-toast";
import { MobileDonateBar } from "./mobile-donate-bar";
import { useDisclosure } from "@mantine/hooks";
import CampaignForm from "./form";
import CampaignFAQ from "./faq";
import DonorDetailsList from "./donor-details-list";

interface Props extends CampaignDetailsType {
	htmlDetails: string;
	donorDetails: {
		donors: Array<{
			name: string;
			amount: number;
			donatedAt: Date;
		}>;
		hasMore: boolean;
		count: number;
	};
}

export default function CampaignDetails(props: Props) {
	const [amount, setAmount] = useState<number>(1000);
	const [productSelection, setProductSelection] = useState<
		Record<string, number>
	>({});
	const [
		openedDonationModal,
		{ open: openDonationModal, close: closeDonationModal },
	] = useDisclosure(false);
	const [
		openedDonorDetailsModal,
		{ open: openDonorDetailsModal, close: closeDonorDetailsModal },
	] = useDisclosure(false);

	const addProduct = (productId: string) => {
		const prod = props.campaign_products.find(
			(product) => product.id === productId,
		);
		if (!prod) {
			// invalid product id
			return;
		}

		if (
			prod.units_collected + (productSelection[productId] ?? 0) >=
			prod.units_required
		) {
			// no more units required
			if (prod.units_collected === prod.units_required) {
				toast.error(
					`You cannot add more. The goal for "${prod.title}" is already fulfilled.`,
				);
				return;
			}
			toast.error(
				`You cannot add more. The goal for "${prod.title}" will be achieved when you donate ${productSelection[productId]} units.`,
			);
			return;
		}

		setProductSelection((prev) => {
			const updated = {
				...prev,
				[productId]: (prev[productId] || 0) + 1,
			};
			setAmount(
				Object.entries(updated).reduce((sum, [id, qty]) => {
					const p = props.campaign_products.find((x) => x.id === id);
					return sum + (p ? p.price_per_unit * qty : 0);
				}, 0),
			);
			return updated;
		});
	};

	const removeProduct = (productId: string) => {
		if ((productSelection[productId] ?? 0) === 0) {
			return;
		}
		setProductSelection((prev) => {
			const updated = { ...prev };
			if (updated[productId] > 1) {
				updated[productId] -= 1;
			} else {
				delete updated[productId];
			}

			setAmount(
				Object.entries(updated).reduce((sum, [id, qty]) => {
					const p = props.campaign_products.find((x) => x.id === id);
					return sum + (p ? p.price_per_unit * qty : 0);
				}, 0),
			);

			return updated;
		});
	};

	const changeAmount = (newAmount: number) => {
		setProductSelection({}); // clear products
		setAmount(newAmount);
	};

	return (
		<>
			<Grid mt="xl" gutter="xl" align="stretch">
				<CampaignDescription
					campaignId={props.id}
					html={props.htmlDetails}
					products={props.campaign_products}
					total={props.amount}
					selectedAmount={amount}
					setAmount={changeAmount}
					productSelection={productSelection}
					addProduct={addProduct}
					removeProduct={removeProduct}
				/>
				<DonatePanel
					amount={amount}
					setAmount={changeAmount}
					onSubmit={openDonationModal}
					slug={props.slug}
				/>
			</Grid>
			<Modal
				opened={openedDonationModal}
				onClose={closeDonationModal}
				size="100%"
				closeOnEscape={false}
				closeOnClickOutside={false}
			>
				<CampaignForm
					campaignId={props.id}
					selectedAmount={amount}
					selectedProducts={productSelection}
					productsAvailable={props.campaign_products.length > 0}
				/>
			</Modal>
			<Grid mt="xl" gutter="xl" align="stretch">
				<CampaignFAQ />
				<DonorDetailsList
					campaignId={props.id}
					donors={props.donorDetails.donors}
					hasMore={props.donorDetails.hasMore}
					count={props.donorDetails.count}
					modal={{
						isOpen: openedDonorDetailsModal,
						open: openDonorDetailsModal,
						close: closeDonorDetailsModal,
					}}
				/>
			</Grid>
			{!openedDonationModal && !openedDonorDetailsModal && (
				<MobileDonateBar
					amount={amount}
					setAmount={changeAmount}
					onSubmit={openDonationModal}
				/>
			)}
		</>
	);
}
