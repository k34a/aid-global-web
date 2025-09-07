"use server";

import DonorDetailsForCampaign from "@/lib/db/campaigns/donor-details";
import z from "zod";

const donorDetailsRequestSchema = z.object({
	campaignId: z.string(),
	limit: z.number().default(10),
	offset: z.number().default(0),
});

interface SuccessfulResponse {
	status: true;
	data: {
		donors: Array<{
			name: string;
			amount: number;
			donatedAt: Date;
		}>;
		hasMore: boolean;
	};
}

interface FailureResponse {
	status: false;
	message: string;
}

export const getDonorDetails = async (
	data: z.infer<typeof donorDetailsRequestSchema>,
): Promise<SuccessfulResponse | FailureResponse> => {
	try {
		const result = donorDetailsRequestSchema.safeParse(data);
		if (!result.success) {
			return { status: false, message: "Invalid parameters" };
		}
		const donorDetailsFinder = new DonorDetailsForCampaign(
			result.data.campaignId,
		);
		const backersDetails = await donorDetailsFinder.getBackers(
			result.data.limit,
			result.data.offset,
		);
		return { status: true, data: backersDetails };
	} catch (error) {
		console.error("Error getting more backers for", data, "Error", error);
		return { status: false, message: "Something went wrong..." };
	}
};
