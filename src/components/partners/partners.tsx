"use client";
import Image from "@/components/image";
import { HeartPlus } from "lucide-react";
import { NotepadText } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { partners } from "@/config/partners";
import ContactForm from "./contact-form";

function Partners() {
	return (
		<section className="overflow-x-hidden">
			<div className="flex flex-col items-center py-10 px-4">
				<h2 className="font-semibold text-2xl sm:text-3xl text-center pb-5">
					Our Partners & Supporters
				</h2>
				<div className="flex flex-wrap justify-center gap-4 w-full max-w-7xl">
					{partners.map((image, index) => (
						<Image
							width={200}
							height={100}
							src={image.imageSrc}
							key={index}
							className="hover:scale-105 transition-all duration-300 w-40 sm:w-70 border-2 p-2 object-contain"
							alt={image.name}
						/>
					))}
				</div>
			</div>

			<ContactForm />

			<div className="flex flex-col sm:flex-row justify-center gap-6 py-10 px-4 text-sm text-zinc-600">
				<div className="flex gap-2 items-start">
					<HeartPlus size={28} className="text-sky-400" />
					<p>
						All our efforts are made possible only because of your
						support
					</p>
				</div>
				<div className="flex gap-2 items-start">
					<NotepadText size={28} className="text-sky-400" />
					<p>
						Your donations are tax exempted under 80G of the Indian
						Income Tax Act
					</p>
				</div>
				<div className="flex gap-2 items-start">
					<LockKeyhole size={28} className="text-sky-400" />
					<p>
						Your donation transactions are completely safe and
						secure
					</p>
				</div>
			</div>
		</section>
	);
}

export default Partners;
