import { supabaseAdmin } from "@/lib/db/supabase";

export async function listAllFiles(folder: string): Promise<string[]> {
	const allFiles: string[] = [];
	let page = 0;
	const pageSize = 100;

	while (true) {
		const { data, error } = await supabaseAdmin.storage
			.from("content")
			.list(folder, { limit: pageSize, offset: page * pageSize });

		if (error) {
			throw new Error(
				`Failed to list files in ${folder}: ${error.message}`,
			);
		}

		if (!data || data.length === 0) break;

		for (const item of data) {
			if (item.metadata && item.metadata.mimetype) {
				// It's a file
				allFiles.push(`${folder}/${item.name}`);
			} else {
				// It's a folder - recurse
				const nested = await listAllFiles(`${folder}/${item.name}`);
				allFiles.push(...nested);
			}
		}

		page++;
	}

	return allFiles;
}
