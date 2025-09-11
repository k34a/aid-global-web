import { z } from "zod";

export const volunteerSchema = z.object({
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
	address: z.string().min(1, "Address is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	zipcode: z.string().regex(/^\d{5,6}$/, "ZIP code must be 5-6 digits"),
	volunteer_areas: z
		.array(z.string())
		.min(1, "Select at least one volunteer area"),
	availability: z
		.array(z.string())
		.min(1, "Select at least one availability option"),
	skills: z.array(z.string()).optional(),
	experience: z.string().optional(),
});

export type VolunteerData = z.infer<typeof volunteerSchema>;
