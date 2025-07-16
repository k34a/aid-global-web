"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { links } from "@/config/links";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from "@/components/icons";

const iconMap: Record<string, React.ReactNode> = {
	facebook: <Facebook className="w-5 h-5 text-white hover:text-gray-300" />,
	twitter: <Twitter className="w-5 h-5 text-white hover:text-gray-300" />,
	instagram: <Instagram className="w-5 h-5 text-white hover:text-gray-300" />,
	linkedin: <Linkedin className="w-5 h-5 text-white hover:text-gray-300" />,
	youtube: <Youtube className="w-5 h-5 text-white hover:text-gray-300" />,
};

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
	return iconMap[name] ?? <div className="w-5 h-5" />;
};

export default function ContactUssection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("Message sent!");
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	return (
		<div className="min-h-screen flex flex-col items-center relative py-20 px-4 bg-white">
			<div className="absolute top-0 left-0 w-full h-1/2 bg-[#d9f0f9] rounded-b-3xl z-0" />
			<div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />
			<div className="relative max-w-5xl w-full rounded-2xl p-4 md:p-10 shadow-lg bg-white  z-10">
				<h2 className="text-center text-3xl font-bold mb-1 text-gray-900">
					Contact Us
				</h2>
				<p className="text-center text-sm text-gray-600 mb-10 max-w-xl mx-auto">
					We&apos;re here to help! Reach out and let&apos;s start a
					conversation to support the cause.
				</p>

				<div className="flex flex-col md:flex-row rounded-xl overflow-hidden bg-white  shadow-xl">
					<div className="bg-sky-600 p-6 md:p-8 w-full md:w-1/3 text-white flex flex-col justify-between rounded-t-xl md:rounded-t-none md:rounded-l-xl relative overflow-hidden">
						<div>
							<h3 className="font-semibold text-lg mb-4">
								Contact Information
							</h3>
							<p className="text-sm mb-6">
								Feel free to reach us using the details below.
							</p>

							<div className="space-y-5 text-sm">
								<div className="flex items-start gap-3">
									<Phone className="w-5 h-5" />
									<a
										href="tel:+919607753148"
										className="hover:underline"
									>
										+91 96077-53148
									</a>
								</div>

								<div className="flex items-start gap-3">
									<Mail className="w-5 h-5" />
									<a
										href="mailto:info@aidglobal.ngo"
										className="hover:underline"
									>
										info@aidglobal.ngo
									</a>
								</div>

								<div className="flex items-start gap-3">
									<MapPin className="w-12 h-12" />
									<p>
										H.no. 4453, Sathe Nagar near Manoj
										Kirana Store, Narpoli, Bhiwandi, Thane,
										Maharashtra - 421305
									</p>
								</div>
							</div>
						</div>
						<div className="mt-8">
							<h4 className="text-sm font-semibold mb-3">
								Follow Us On
							</h4>
							<div className="flex gap-4">
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
										>
											<SocialIcon name={socialName} />
										</a>
									);
								})}
							</div>
						</div>

						<div className="absolute hidden sm:block right-0 bottom-4 w-36 h-36 overflow-hidden -mb-12 -mr-10">
							<div className="w-40 h-40 bg-white rounded-full opacity-30" />
						</div>
					</div>
					<form
						onSubmit={handleSubmit}
						className="p-6 md:p-8 w-full md:w-2/3 bg-white rounded-b-xl md:rounded-b-none md:rounded-r-xl"
					>
						<div className="flex flex-col md:flex-row gap-6 mb-6">
							<div className="flex flex-col flex-1">
								<label
									className="text-xs font-semibold mb-1"
									htmlFor="name"
								>
									Your Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="John Doe"
									className="border-b border-gray-300 focus:border-sky-500 rounded-sm outline-none py-1 placeholder:text-gray-400"
									required
								/>
							</div>

							<div className="flex flex-col flex-1">
								<label
									className="text-xs font-semibold mb-1"
									htmlFor="email"
								>
									Your Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="you@example.com"
									className="border-b border-gray-300 focus:border-[#005f73] rounded-sm outline-none py-1 placeholder:text-gray-400"
									required
								/>
							</div>
						</div>

						<div className="flex flex-col mb-6">
							<label
								className="text-xs font-semibold mb-1"
								htmlFor="subject"
							>
								Subject
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								placeholder="I want to contribute to the cause"
								className="border-b border-gray-300 focus:border-[#005f73] rounded-sm outline-none py-1 placeholder:text-gray-400"
								required
							/>
						</div>

						<div className="flex flex-col mb-8">
							<label
								className="text-xs font-semibold mb-1"
								htmlFor="message"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								placeholder="Write your message here..."
								className="border-b border-[#005f73] outline-none py-1 rounded-sm placeholder:text-[#005f73] resize-none h-24"
								required
							/>
						</div>

						<button
							type="submit"
							className="bg-sky-700 text-white px-6 py-2  rounded text-sm hover:bg-[#004f59] transition"
						>
							Send Message
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
