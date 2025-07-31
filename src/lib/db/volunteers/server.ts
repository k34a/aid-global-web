import { supabaseAdmin } from "@/lib/db/supabase";
import { volunteerSchema } from "./schema";
import { z } from "zod";

export type VolunteerData = z.infer<typeof volunteerSchema>;

export interface Volunteer extends VolunteerData {
	id: string;
	created_at: string;
	status?: "pending" | "approved" | "rejected";
}

export async function createVolunteer(data: VolunteerData): Promise<Volunteer> {
	const { data: volunteer, error } = await supabaseAdmin
		.from("volunteers")
		.insert([data])
		.select()
		.single();

	if (error) throw new Error(`Failed to create volunteer: ${error.message}`);
	return volunteer;
}

export async function getAllVolunteers(): Promise<Volunteer[]> {
	const { data, error } = await supabaseAdmin
		.from("volunteers")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) throw new Error(`Failed to fetch volunteers: ${error.message}`);
	return data || [];
}

export async function getVolunteerById(id: string): Promise<Volunteer | null> {
	const { data, error } = await supabaseAdmin
		.from("volunteers")
		.select("*")
		.eq("id", id)
		.single();

	if (error?.code === "PGRST116") return null;
	if (error) throw new Error(`Failed to fetch volunteer: ${error.message}`);

	return data;
}

export async function updateVolunteerStatus(
	id: string,
	status: "pending" | "approved" | "rejected",
): Promise<Volunteer> {
	const { data, error } = await supabaseAdmin
		.from("volunteers")
		.update({ status })
		.eq("id", id)
		.select()
		.single();

	if (error)
		throw new Error(`Failed to update volunteer status: ${error.message}`);
	return data;
}

export async function deleteVolunteer(id: string): Promise<void> {
	const { error } = await supabaseAdmin
		.from("volunteers")
		.delete()
		.eq("id", id);

	if (error) throw new Error(`Failed to delete volunteer: ${error.message}`);
}
