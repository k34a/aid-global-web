import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ certificateId: string }> },
) {
	const { certificateId } = await params;

	const fileUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME}/storage/v1/object/public/content/certificates/volunteer-completion/${certificateId}.pdf`;

	const head = await fetch(fileUrl, { method: "HEAD" });
	if (!head.ok) return notFound();

	const file = await fetch(fileUrl);
	const buffer = await file.arrayBuffer();

	return new NextResponse(buffer, {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": "inline; filename=certificate.pdf",
		},
	});
}
