import { SimpleGrid } from "@mantine/core";
import LegalCard from "./card";

const legalDocuments = [
	{
		title: "80G Certificate",
		description: (
			<>
				Allows donors to claim tax deductions under Section 80G of the
				Income Tax Act.
			</>
		),
		link: "https://drive.google.com/file/d/1rwbAL4umrucXbz4fUddH_nc7peKXOZNP/view?usp=sharing",
	},
	{
		title: "12A Certificate",
		description: (
			<>Confirms the NGO's income is exempt from tax under Section 12A.</>
		),
		link: "https://drive.google.com/file/d/13HZrUXAVxsIIi79QG-seipG-WxUCVXhe/view?usp=sharing",
	},
	{
		title: "Registration Certificate",
		description: (
			<>
				Proof of legal registration of the NGO under the relevant
				government authority.
			</>
		),
		link: "https://drive.google.com/file/d/1KzuIp9-d7scsiPZDxrc-lkrG-cL0DTQZ/view?usp=sharing",
	},
	{
		title: "Trust Deed",
		description: (
			<>
				Founding legal document that outlines the purpose and structure
				of the NGO.
			</>
		),
		link: "https://drive.google.com/file/d/1BW2AYPWadbFJcf6_0_wAijhA08tVCGHb/view?usp=sharing",
	},
	{
		title: "PAN Card",
		description: (
			<>
				Official PAN document issued by the Income Tax Department of
				India.
			</>
		),
		link: "https://drive.google.com/file/d/1W3p39F9b1iarn5fzqp6DFjuISn8mj2Iv/view?usp=sharing",
	},
];

const LegalDocuments = () => {
	return (
		<section className="max-w-5xl mx-auto px-4 py-10" id="legal-docs">
			<h2 className="text-2xl font-semibold mb-6 text-center">
				Legal Documents
			</h2>
			<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
				{legalDocuments.map((doc) => (
					<LegalCard key={doc.title} {...doc} />
				))}
			</SimpleGrid>
		</section>
	);
};

export default LegalDocuments;
