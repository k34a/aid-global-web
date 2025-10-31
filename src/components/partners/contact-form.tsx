"use client";

import Link from "next/link";
import { FillMe } from "../fill-me";
import z from "zod";
import { FormSchema } from "@k34a/forms";

interface PartnersProps {
	schema: z.infer<typeof FormSchema>;
	formType: string;
}

export default function CorporatePartnershipForm(props: PartnersProps) {
	return (
		<section className="w-full py-10 bg-white">
			<div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
				<div className="flex flex-col lg:flex-row gap-12">
					{/* Left Column - Info/Intro */}
					<div className="lg:w-1/2">
						<h1 className="text-3xl font-semibold mb-4">
							Write To Us
						</h1>
						<p className="text-zinc-600 mb-4 border-b pb-4">
							If you&apos;re a company or organization interested
							in partnering with us, please fill out the form and
							we&apos;ll get back to you shortly. For volunteering
							and internship opportunities, please{" "}
							<Link
								href="/volunteer"
								className="text-sky-500 hover:underline"
							>
								click here
							</Link>
							.
						</p>

						<div className="mt-6">
							<h2 className="text-lg font-semibold mb-2">
								Frequently Asked Questions
							</h2>
							<div className="flex gap-4 text-sky-500">
								<Link
									href="/who-we-are#vision"
									className="hover:underline border-r border-zinc-400 pr-4"
								>
									Our Vision & Mission
								</Link>
								<Link
									href="/donate"
									className="hover:underline"
								>
									Make A Donation
								</Link>
							</div>
						</div>
					</div>

					<div className="lg:w-1/2">
						<FillMe {...props} />
					</div>
				</div>
			</div>
		</section>
	);
}
