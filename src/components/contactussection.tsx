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
	facebook: <Facebook className="w-5 h-5 text-white hover:text-blue-400" />,
	twitter: <Twitter className="w-5 h-5 text-white hover:text-blue-400" />,
	instagram: <Instagram className="w-5 h-5 text-white hover:text-blue-400" />,
	linkedin: <Linkedin className="w-5 h-5 text-white hover:text-blue-400" />,
	youtube: <Youtube className="w-5 h-5 text-white hover:text-blue-400" />,
};

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
	return iconMap[name] ?? <div className="w-5 h-5 " />;
};

export default function ContactUs() {
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
		<section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white py-16 px-4 sm:px-6">
			<div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-3 overflow-hidden">
				{/* Contact Info Section */}
				<div className="bg-gradient-to-tr from-sky-700 via-sky-600 to-sky-500 text-white p-6 sm:p-10 flex flex-col justify-between rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
					<div>
						<h2 className="text-center sm:text-left text-xl sm:text-3xl font-bold mb-4 tracking-wide">
							Contact Information
						</h2>
						<p className="hidden sm:block text-sm sm:text-base font-light mb-8 leading-relaxed opacity-90">
							Feel free to reach us using the details below and
							let&apos;s collaborate for a cause.
						</p>

						<div className="flex flex-col sm:block space-y-3 sm:space-y-5 text-sm sm:text-base font-medium">
							<a
								href="tel:+919607753148"
								className="flex items-center gap-3 hover:text-sky-200 transition"
							>
								<Phone className="w-5 h-5" /> +91 96077-53148
							</a>
							<a
								href="mailto:info@aidglobal.ngo"
								className="flex items-center gap-3 hover:text-sky-200 transition"
							>
								<Mail className="w-5 h-5" /> info@aidglobal.ngo
							</a>
							<div className="flex items-start gap-3">
								<MapPin className="w-6 h-6 mt-1" />
								<address className="not-italic text-xs sm:text-sm leading-snug opacity-90">
									H.no. 4453, Sathe Nagar near Manoj Kirana
									Store, Narpoli, Bhiwandi, Thane, Maharashtra
									- 421305
								</address>
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

				{/* Contact Form Section */}
				<form
					onSubmit={handleSubmit}
					className="p-6 sm:p-10 md:col-span-2 bg-white rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl shadow-lg flex flex-col"
				>
					<h2 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-900">
						Send Us a Message
					</h2>
					<p className="mb-6 text-sm sm:text-base text-gray-600 font-light max-w-xl leading-relaxed">
						We&apos;re here to help! Reach out and start a
						conversation to support the cause.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
						{/* Name */}
						<div className="flex flex-col">
							<label
								htmlFor="name"
								className="mb-1 text-sm font-semibold text-gray-700"
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
								required
								className="border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-2 px-2 text-sm text-gray-700 placeholder-gray-400 transition rounded-sm"
							/>
						</div>

						{/* Email */}
						<div className="flex flex-col">
							<label
								htmlFor="email"
								className="mb-1 text-sm font-semibold text-gray-700"
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
								required
								className="border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-2 px-2 text-sm text-gray-700 placeholder-gray-400 transition rounded-sm"
							/>
						</div>
					</div>

					{/* Subject */}
					<div className="mb-6">
						<label
							htmlFor="subject"
							className="mb-1 text-sm font-semibold text-gray-700 block"
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
							required
							className="w-full border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-2 px-2 text-sm text-gray-700 placeholder-gray-400 transition rounded-sm"
						/>
					</div>

					{/* Message */}
					<div className="mb-8">
						<label
							htmlFor="message"
							className="mb-1 text-sm font-semibold text-gray-700 block"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							placeholder="Write your message here..."
							rows={5}
							required
							className="w-full border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-2 px-2 text-sm text-gray-700 resize-none placeholder-gray-400 transition rounded-sm"
						/>
					</div>

					{/* Submit */}
					<button
						type="submit"
						className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg text-white text-sm font-semibold shadow-md transition-transform transform hover:scale-105"
					>
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
}
