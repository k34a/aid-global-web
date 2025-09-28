"use client";

import type React from "react";

import { ngoDetails } from "@/config/config";
import { links } from "@/config/links";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from "@/components/icons";

const iconMap: Record<string, React.ReactNode> = {
	facebook: <Facebook className="w-5 h-5 text-white hover:text-sky-400" />,
	twitter: <Twitter className="w-5 h-5 text-white hover:text-sky-400" />,
	instagram: <Instagram className="w-5 h-5 text-white hover:text-sky-400" />,
	linkedin: <Linkedin className="w-5 h-5 text-white hover:text-sky-400" />,
	youtube: <Youtube className="w-5 h-5 text-white hover:text-sky-400" />,
};

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
	return iconMap[name] ?? <div className="w-5 h-5 " />;
};

const ContactUsDetails = () => {
	const handleWhatsAppClick = () => {
		const message = encodeURIComponent(
			"Hello! I would like to know more about Aid Global Foundation and how I can contribute to your cause.",
		);
		const whatsappUrl = `https://wa.me/${ngoDetails.contact.whatsapp.replace(/\D/g, "")}?text=${message}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<div className="bg-gradient-to-tr from-sky-700 via-sky-600 to-sky-500 text-white p-6 sm:p-10 flex flex-col justify-between rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
			<div>
				<h2 className="text-center sm:text-left text-xl sm:text-3xl font-bold mb-4 tracking-wide">
					Contact Information
				</h2>
				<p className="hidden sm:block text-sm sm:text-base font-light mb-8 leading-relaxed opacity-90">
					Feel free to reach us using the details below and let&apos;s
					collaborate for a cause.
				</p>

				<div className="flex flex-col sm:block space-y-3 sm:space-y-5 text-sm sm:text-base font-medium">
					{/* National Helpline */}
					<a
						href={`tel:${ngoDetails.contact.nationalHelpline.replace(/\D/g, "")}`}
						className="flex items-center gap-3 hover:text-sky-200 transition"
					>
						<Phone className="w-5 h-5" />
						<div>
							<div className="text-xs opacity-75">
								National Helpline
							</div>
							<div>{ngoDetails.contact.nationalHelpline}</div>
						</div>
					</a>
					<a
						href={`tel:${ngoDetails.contact.phone.replace(/\D/g, "")}`}
						className="flex items-center gap-3 hover:text-sky-200 transition"
					>
						<Phone className="w-5 h-5" />
						<div>
							<div className="text-xs opacity-75">
								Mobile Number
							</div>
							<div>{ngoDetails.contact.phone}</div>
						</div>
					</a>
					<a
						href={`mailto:${ngoDetails.contact.email}`}
						className="flex items-center gap-3 hover:text-sky-200 transition"
					>
						<Mail className="w-5 h-5" /> {ngoDetails.contact.email}
					</a>

					{/* Working Hours */}
					<div className="flex items-center gap-3">
						<Clock className="w-5 h-5" />
						<div>
							<div className="text-xs opacity-75">
								Working Hours
							</div>
							<div>{ngoDetails.contact.workingHours.days}</div>
							<div>{ngoDetails.contact.workingHours.hours}</div>
						</div>
					</div>

					{/* WhatsApp Button */}
					<button
						onClick={handleWhatsAppClick}
						className="flex items-center gap-3 hover:text-sky-200 transition bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg mt-4 w-fit"
					>
						<MessageCircle className="w-5 h-5" />
						<span>Chat on WhatsApp</span>
					</button>

					{/* Addresses */}
					<div className="mt-6 space-y-4">
						{ngoDetails.contact.addresses.map((addr, index) => (
							<div key={index} className="flex items-start gap-3">
								<MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
								<div>
									<div className="text-sm font-semibold">
										{addr.label}
									</div>
									{addr.description && (
										<div className="text-xs opacity-75 mb-1">
											({addr.description})
										</div>
									)}
									<address className="not-italic text-xs sm:text-sm leading-snug opacity-90">
										{addr.address}
									</address>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="mt-8">
				<h3 className=" text-center sm:text-left uppercase text-sm font-semibold mb-3 tracking-wider opacity-80">
					Follow Us On
				</h3>
				<div className="flex justify-center sm:justify-start flex-wrap gap-4">
					{links.socialLinks.map(({ name, href }) => {
						const socialName = name.toLowerCase();
						if (!(socialName in iconMap)) return null;

						return (
							<a
								key={name}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={name}
								className="hover:text-sky-300 transition text-lg"
							>
								<SocialIcon name={socialName} />
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ContactUsDetails;
