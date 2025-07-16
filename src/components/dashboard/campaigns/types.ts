export interface FormDataType {
	title: string;
	description: string;
	slug: string;
	amount: number;
	ended_at: string;
	banner_image: string;
}

export interface CampaignProduct {
	id: string;
	campaign_id: string;
	title: string;
	description: string;
	image?: string;
	price_per_unit: number;
	units_required: number;
	units_collected: number;
}
