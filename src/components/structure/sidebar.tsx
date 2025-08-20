"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "@/components/image";
import { ngoDetails } from "@/config/config";
import { X, Mail, Phone, ChevronDown, Heart } from "lucide-react";
import { links } from "@/config/links";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from "@/components/icons";

const iconMap: Record<
	"facebook" | "twitter" | "instagram" | "linkedin" | "youtube",
	React.ReactElement
> = {
	facebook: <Facebook className="text-blue-600" />,
	twitter: <Twitter className="text-blue-500" />,
	instagram: <Instagram className="text-pink-700" />,
	linkedin: <Linkedin className="text-blue-800" />,
	youtube: <Youtube className="text-red-500" />,
};

type SideBarProps = {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
};

export default function SideBar({ isOpen, setIsOpen }: SideBarProps) {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-blue-800/30"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<motion.div
				initial={{ x: "-100%" }}
				animate={{ x: isOpen ? "0%" : "-100%" }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col space-y-6 overflow-y-auto bg-white p-5 shadow-lg"
			>
				{/* Header */}
				<div className="flex items-center justify-between">
					<Link href="/" onClick={() => setIsOpen(false)}>
						<Image
							src={ngoDetails.logo}
							alt="Logo"
							width={80}
							height={80}
							className="w-20"
						/>
					</Link>
					<button onClick={() => setIsOpen(false)}>
						<X size={32} />
					</button>
				</div>

				{/* Primary Navigation */}
				<div className="flex w-full flex-col gap-4">
					{links.primaryLinks.map((link) => (
						<div key={link.name}>
							{"sublinks" in link &&
							Array.isArray(link.sublinks) &&
							link.sublinks.length > 0 ? (
								<div>
									<button
										className="flex w-full items-center justify-between pl-2 hover:text-blue-400"
										onClick={() =>
											setOpenDropdown(
												openDropdown === link.name
													? null
													: link.name,
											)
										}
									>
										<span>{link.name}</span>
										<ChevronDown
											size={20}
											className={`rounded-3xl bg-blue-500 p-1 text-white transition-transform duration-300 ${
												openDropdown === link.name
													? "rotate-180"
													: ""
											}`}
										/>
									</button>
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{
											height:
												openDropdown === link.name
													? "auto"
													: 0,
											opacity:
												openDropdown === link.name
													? 1
													: 0,
										}}
										transition={{ duration: 0.3 }}
										className="overflow-hidden"
									>
										<ul className="mt-1 space-y-2 pl-5">
											{link.sublinks.map((sub) => (
												<li key={sub.href}>
													<Link
														href={sub.href ?? "#"}
														className="hover:text-blue-400 hover:no-underline"
														onClick={() =>
															setIsOpen(false)
														}
													>
														{sub.name}
													</Link>
												</li>
											))}
										</ul>
									</motion.div>
								</div>
							) : (
								<Link
									href={link.href ?? "#"}
									className=" px-2 hover:text-blue-400"
									onClick={() => setIsOpen(false)}
								>
									{link.name}
								</Link>
							)}
							<hr className="mt-3" />
						</div>
					))}
				</div>

				{/* Donate CTA */}
				<Link
					href={links.donateLink.href}
					className="rounded-3xl border-2 flex gap-2 justify-center items-center border-black p-2 text-center font-bold hover:bg-blue-400 hover:text-white"
					onClick={() => setIsOpen(false)}
				>
					<Heart className="text-blue-500" size={20} />{" "}
					{links.donateLink.name.toUpperCase()}
				</Link>

				{/* Contact Info */}
				<div className="flex flex-col space-y-2">
					<a
						href={`mailto:${ngoDetails.contact.email}`}
						className="flex items-center gap-3 px-3"
					>
						<Mail size={20} className="text-black" />
						<span className="font-medium text-gray-800">
							{ngoDetails.contact.email}
						</span>
					</a>
					<a
						href={`tel:${ngoDetails.contact.phone}`}
						className="flex items-center gap-3 px-3"
					>
						<Phone size={20} className="text-black" />
						<span className="font-medium text-gray-800">
							{ngoDetails.contact.phone}
						</span>
					</a>
				</div>

				{/* Social Links */}
				<div className="flex w-full items-center justify-center gap-5">
					{links.socialLinks.map(({ name, href, icon }) => (
						<a
							key={name}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{iconMap[icon as keyof typeof iconMap] ?? null}
						</a>
					))}
				</div>
			</motion.div>
		</>
	);
}
