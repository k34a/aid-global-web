"use client";

import { FormBuilder, FormSchema } from "@k34a/forms";
import z from "zod";
import { notifications } from "@mantine/notifications";
import { ORG_ID } from "@/config/config";

interface FormProps {
	schema: z.infer<typeof FormSchema>;
	formType: string;
}

export const FillMe = (props: FormProps) => {
	return (
		<FormBuilder
			mode="fill"
			schema={props.schema}
			formType={props.formType}
			orgId={ORG_ID}
			submissionAPIEndPoint={`/api/fill-me/${props.formType}`}
			onSuccess={() => {
				notifications.show({
					title: "All Set!",
					message:
						"Your details were submitted successfully. Thank you for completing the form!",
					color: "green",
				});
			}}
			onValidationError={() => {
				notifications.show({
					title: "Please Review Your Form",
					message:
						"Some information seems to be missing or incorrect. Check the highlighted fields, make the corrections, and submit again.",
					color: "orange",
				});
			}}
			onError={() => {
				notifications.show({
					title: "Submission Failed",
					message:
						"Something went wrong while sending your details. Please check your internet connection and try again in a few moments.",
					color: "red",
				});
			}}
		/>
	);
};
