import z from "zod/v4";
import {
	StaticDonation,
	DonationCreationSuccessResponse,
	DonationError,
	userInfoSchema,
} from "./donation";
import { supabaseAdmin } from "@/lib/db/supabase";

export const campaignDetailsSchema = z.object({
	campaign_id: z.string(),
	products: z.record(z.string(), z.number()).optional(),
	amount: z.number().min(1, "Amount must be greater than 0"),
	auto_allocate: z.boolean().default(true),
});

interface AvailableCampaignProduct {
	id: string;
	price_per_unit: number;
	units_required: number;
	units_collected: number;
}

type SelectedProducts = Record<string, number>;

interface CreationResponse {
	donation_intent_id: string;
	razorpay_order_id: string;
}

export class CampaignDonation extends StaticDonation<
	typeof campaignDetailsSchema
> {
	constructor(userInfo: z.infer<typeof userInfoSchema>, is_anon: boolean) {
		super(userInfo, is_anon, campaignDetailsSchema);
	}

	private async assertCampaignExists(campaign_id: string) {
		const { data, error } = await supabaseAdmin
			.from("campaigns")
			.select("id, status")
			.eq("id", campaign_id)
			.maybeSingle();

		if (error) {
			throw new DonationError(
				"Encountered an error",
				"Unable to fetch campaign details",
			);
		}

		if (!data) {
			throw new DonationError(
				"Campaign does not exist",
				"Unable to fetch details for the campaign you want to donate to. Please refresh, and try again.",
			);
		}
	}

	private async getProductsInCampaign(campaign_id: string) {
		const { data, error } = await supabaseAdmin
			.from("campaign_products")
			.select("id, price_per_unit, units_required, units_collected")
			.eq("campaign_id", campaign_id);
		if (error) {
			throw new DonationError(
				"Encountered an error",
				"Unable to fetch product details",
			);
		}

		return data as AvailableCampaignProduct[];
	}

	private assertProductsExist(
		availableProducts: string[],
		selectedProducts: string[],
	) {
		if (
			new Set(selectedProducts).difference(new Set(availableProducts))
				.size > 0
		) {
			throw new DonationError(
				"Products not found",
				`Some products in the request do not exist in the campaign.`,
			);
		}
	}

	private validateAmount(
		amount: number,
		selectedProducts: SelectedProducts,
		availableProducts: AvailableCampaignProduct[],
	) {
		let unallocated_funds = amount;
		Object.keys(selectedProducts ?? {}).forEach((productId) => {
			const quantity = selectedProducts[productId];
			const product = availableProducts.find((p) => p.id === productId);
			if (!product) {
				throw new DonationError(
					"Product not found",
					`Product with ID ${productId} not found.`,
				);
			}
			unallocated_funds -= product.price_per_unit * quantity;
		});

		if (unallocated_funds < 0) {
			throw new DonationError(
				"Insufficient amount",
				"Total cost of products exceeds the donation amount. Please adjust your donation amount.",
			);
		}

		return unallocated_funds;
	}

	private getUpdatedDetailsAfterReallocation(
		unallocated_funds: number,
		selectedProducts: SelectedProducts,
		availableProducts: AvailableCampaignProduct[],
	) {
		const updatedProducts = { ...selectedProducts };
		const sortedAvailableProducts = availableProducts.sort(
			(a, b) => b.price_per_unit - a.price_per_unit,
		);
		sortedAvailableProducts.forEach((product) => {
			if (unallocated_funds <= 0) {
				return;
			}
			const quantity = Math.min(
				Math.floor(unallocated_funds / product.price_per_unit), // max quantity user can afford from unallocated funds
				product.units_required - product.units_collected, // required quantity to reach product target
			);
			updatedProducts[product.id] =
				(updatedProducts[product.id] ?? 0) + quantity;
			unallocated_funds -= quantity * product.price_per_unit;
		});

		return { updatedProducts, unallocated_funds };
	}

	public async create(
		campaignDetails: z.infer<typeof campaignDetailsSchema>,
	) {
		const details = this.validateDonationDetails(campaignDetails);

		this.assertCampaignExists(details.campaign_id);

		const availableProducts = await this.getProductsInCampaign(
			details.campaign_id,
		);

		let selectedProducts = details.products ?? {};

		this.assertProductsExist(
			availableProducts.map((p) => p.id),
			Object.keys(selectedProducts),
		);

		let unallocated_amount = this.validateAmount(
			details.amount,
			selectedProducts,
			availableProducts,
		);

		if (details.auto_allocate && unallocated_amount > 0) {
			const updatedDetails = this.getUpdatedDetailsAfterReallocation(
				unallocated_amount,
				selectedProducts,
				availableProducts,
			);
			unallocated_amount = updatedDetails.unallocated_funds;
			selectedProducts = updatedDetails.updatedProducts;
		}

		const backer_id = await this.record_donation_intent({
			campaign_id: details.campaign_id,
			amount: details.amount,
			auto_allocate: details.auto_allocate,
			unallocated_amount,
			selectedProducts,
		});

		const order = await this.create_razorpay(details.amount, backer_id);

		const response: DonationCreationSuccessResponse<CreationResponse> = {
			success: true,
			data: {
				donation_intent_id: backer_id,
				razorpay_order_id: order.id,
			},
		};

		return response;
	}
}
