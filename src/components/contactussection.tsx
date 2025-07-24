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
		<>
			<section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white py-24 px-6">
				<div className="relative max-w-6xl w-full bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-3 overflow-hidden">
					<div className="bg-gradient-to-tr from-sky-700 via-sky-600 to-sky-500 text-white p-10 flex flex-col justify-between rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
						<div>
							<h2 className="text-3xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
								Contact Information
							</h2>
							<p className="text-sm font-light mb-10 max-w-xs leading-relaxed opacity-90">
								Feel free to reach us using the details below
								and let&apos;s collaborate for a cause.
							</p>

							<div className="space-y-6 text-base font-medium">
								<a
									href="tel:+919607753148"
									className="flex items-center gap-4 hover:text-sky-200 transition"
								>
									<Phone className="w-6 h-6" /> +91
									96077-53148
								</a>

								<a
									href="mailto:info@aidglobal.ngo"
									className="flex items-center gap-4 hover:text-sky-200 transition"
								>
									<Mail className="w-6 h-6" />{" "}
									info@aidglobal.ngo
								</a>

								<div className="flex items-start gap-4">
									<MapPin className="w-8 h-8 mt-1" />
									<address className="not-italic leading-snug text-xs md:text-sm opacity-90">
										H.no. 4453, Sathe Nagar near Manoj
										Kirana Store, Narpoli, Bhiwandi, Thane,
										Maharashtra - 421305
									</address>
								</div>
							</div>
						</div>

						<div className="mt-8">
							<h3 className="uppercase font-semibold mb-3 tracking-wider opacity-80 text-sm">
								Follow Us On
							</h3>
							<div className="flex gap-5">
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
											className="hover:text-sky-300 transition text-xl"
										>
											<SocialIcon name={socialName} />
										</a>
									);
								})}
							</div>
						</div>
					</div>
					<form
						onSubmit={handleSubmit}
						className="p-10 md:col-span-2 bg-white rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl shadow-lg flex flex-col"
					>
						<h2 className="text-4xl font-bold mb-6 text-gray-900 tracking-wide">
							Send Us a Message
						</h2>

						<p className="mb-8 text-gray-600 font-light max-w-xl leading-relaxed">
							We&apos;re here to help! Reach out and start a
							conversation to support the cause.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
							<div className="flex flex-col">
								<label
									htmlFor="name"
									className="mb-2 font-semibold text-gray-700"
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
									className="border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-3 px-2 text-gray-700 placeholder-gray-400 transition rounded-sm"
								/>
							</div>

							<div className="flex flex-col">
								<label
									htmlFor="email"
									className="mb-2 font-semibold text-gray-700"
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
									className="border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-3 px-2 text-gray-700 placeholder-gray-400 transition rounded-sm"
								/>
							</div>
						</div>

						<div className="mb-6">
							<label
								htmlFor="subject"
								className="mb-2 font-semibold text-gray-700 block"
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
								className="w-full border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-3 px-2 text-gray-700 placeholder-gray-400 transition rounded-sm"
							/>
						</div>

						<div className="mb-10">
							<label
								htmlFor="message"
								className="mb-2 font-semibold text-gray-700 block"
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
								className="w-full border-b-2 border-gray-300 focus:border-sky-600 focus:outline-none py-3 px-2 text-gray-700 resize-none placeholder-gray-400 transition rounded-sm"
							/>
						</div>

						<button
							type="submit"
							className="self-start px-8 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg text-white font-semibold shadow-lg transition-transform transform hover:scale-[1.05]"
						>
							Send Message
						</button>
					</form>
				</div>
			</section>
		</>
	);
}
