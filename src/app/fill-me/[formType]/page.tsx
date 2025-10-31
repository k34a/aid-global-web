import { FillMe } from "@/components/fill-me";
import { adminPanelLink, ngoDetails, ORG_ID } from "@/config/config";
import { supabaseAdmin } from "@/lib/db/supabase";
import { FormFillingService } from "@k34a/forms";
import { Box, Text, Title } from "@mantine/core";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{
		formType: string;
	}>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { formType } = await params;
	let schema;
	try {
		schema = await new FormFillingService(
			adminPanelLink,
			ORG_ID,
			supabaseAdmin,
		).getFormSchema(formType);
	} catch (err) {
		console.error(err);
		return {};
	}

	return {
		title: `${schema.title} | ${ngoDetails.name}`,
	};
}

export default async function FillMePage({ params }: PageProps) {
	const { formType } = await params;
	let schema;
	try {
		schema = await new FormFillingService(
			adminPanelLink,
			ORG_ID,
			supabaseAdmin,
		).getFormSchema(formType);
	} catch (err) {
		console.error(err);
		notFound();
	}

	return (
		<Box maw={800} mx="auto" px="md" py="xl">
			<Title order={2}>{schema.title}</Title>
			<Text>{schema.description}</Text>
			<FillMe formType={formType} schema={schema} />
		</Box>
	);
}
