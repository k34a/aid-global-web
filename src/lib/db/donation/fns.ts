import { supabaseAdmin } from "@/lib/db/supabase";
import { SubscriptionStatus } from "@/lib/db/donation/manage/subscription/states";

export async function getNumberOfSubscribers(plan_id: string) {
	const { count, error } = await supabaseAdmin
		.from("subscriptions")
		.select("*", { count: "exact", head: true })
		.in("status", [
			SubscriptionStatus.Created,
			SubscriptionStatus.Active,
			SubscriptionStatus.Halted,
		])
		.eq("plan_id", plan_id);

	if (error) {
		console.error(error);
		throw new Error(
			"Unable to find the count of active users for this subscription",
		);
	}

	if (!count) {
		return 5;
	}

	return 5 + count;
}
