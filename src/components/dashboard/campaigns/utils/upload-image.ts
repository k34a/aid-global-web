export async function uploadImage(
	file: File,
	slug: string,
	type: "banner" | "product",
): Promise<string> {
	const filename = file.name;
	if (!filename.toLowerCase().endsWith(".webp")) {
		throw new Error("Only .webp files are allowed");
	}

	if (file.size > 200 * 1024) {
		throw new Error("Image must be less than 200 KB");
	}

	const res = await fetch("/api/upload", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({ slug, filename, type, fileSize: file.size }),
	});

	if (!res.ok) {
		throw new Error("Failed to get presigned upload URL");
	}

	const { presignedUrl, publicUrl } = await res.json();

	const uploadRes = await fetch(presignedUrl, {
		method: "PUT",
		headers: { "Content-Type": file.type },
		body: file,
	});

	if (!uploadRes.ok) {
		throw new Error("Failed to upload image to storage");
	}

	return publicUrl;
}
