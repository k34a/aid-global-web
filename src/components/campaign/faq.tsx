"use client";

import { Accordion, Grid, List, ThemeIcon } from "@mantine/core";
import { IconCheck, IconCircleCheck } from "@tabler/icons-react";

const faqs = [
	{
		question: "How can I donate?",
		answer: (
			<>
				We process all our payments via razorpay to ensure the safety
				and security of our donors data. Razorpay supports multiple
				methods including UPI, bank transfer and various wallets (...add
				more here). Choose the method that is most convenient for you
				during the donation process.
			</>
		),
	},
	{
		question: "Is my donation safe?",
		answer: (
			<>
				Yes <IconCheck color="green" style={{ display: "inline" }} />{" "}
				All donations are securely processed and go directly to{" "}
				<strong>Aid Global Foundation&apos;s official account</strong>.
				We ensure full transparency and accountability for every
				contribution received.
			</>
		),
	},
	{
		question: "Will I get a receipt or tax benefit?",
		answer: (
			<>
				Yes, you will receive an official donation receipt immediately
				after your contribution. Additionally, donations are eligible
				for <strong>tax exemption under Section 80G</strong> of the
				Income Tax Act (India).
			</>
		),
	},
	{
		question: "Will I get updates about my donation?",
		answer: (
			<>
				Yes. Donors receive confirmation and updates about their
				contributions via email or SMS, helping you stay informed about
				the impact of your donation.
			</>
		),
	},
	{
		question: "How can I claim tax exemption for my contributions?",
		answer: (
			<>
				All donations made through our platform are eligible for tax
				exemption under Section 80G of the Income Tax Act.
				<br />
				<br />
				Once your donation is complete, you&apos;ll be redirected to a
				donation receipt page. This receipt is hosted at a permanent
				URL. You can bookmark or save this link for future reference. It
				includes all the necessary details required for claiming tax
				exemption, such as:
				<List
					icon={
						<ThemeIcon color="sky" size={24} radius="xl">
							<IconCircleCheck size={16} />
						</ThemeIcon>
					}
				>
					<List.Item>
						Your personal information (name, email, and phone
						number)
					</List.Item>
					<List.Item>PAN number and address (if provided)</List.Item>
					<List.Item>The donation amount</List.Item>
					<List.Item>
						Details of the campaign(s) you contributed to
					</List.Item>
					<List.Item>Other relevant donation information</List.Item>
				</List>
				You can download this receipt as a PDF or share the URL directly
				with tax authorities to claim your exemption.
			</>
		),
	},
	{
		question: "What is the password of my donation receipt?",
		answer: (
			<>
				To protect your personal information, the receipt page is
				password-protected. When accessing it, you&apos;ll be asked to
				enter the <strong>last 4 digits of your phone number</strong>{" "}
				used during the donation.
				<br />
				<br />
				This simple step ensures that your data stays secure while
				giving you easy access to important details like your donation
				amount, PAN, and campaign information. We work tirelessly to
				protect our donors&apos; data and appreciate your understanding.
			</>
		),
	},
];

export default function CampaignFAQ() {
	return (
		<Grid.Col span={{ base: 12, lg: 8 }}>
			<Accordion variant="separated">
				{faqs.map((faq, index) => (
					<Accordion.Item key={index} value={`faq-${index}`}>
						<Accordion.Control
							style={{ backgroundColor: "#e0f2fe" }}
						>
							{faq.question}
						</Accordion.Control>
						<Accordion.Panel py="md">{faq.answer}</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</Grid.Col>
	);
}
