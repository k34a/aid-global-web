import { supabase } from "@/lib/db/supabase";

describe("DB", () => {
	it("Check something", () => {
		expect(Object.keys(supabase).length).toBe(0);
	});
});
