"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu } from "lucide-react";
import { ngoDetails } from "@/config/config";
import SideBar from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/image";
import { links } from "@/config/links";

// Reusable NavLink
import type { ReactNode } from "react";
interface NavLinkProps {
	href: string;
	children: ReactNode;
}
function NavLink({ href, children }: NavLinkProps) {
	return (
		<Link
			href={href}
			className="h-full font-semibold px-2 hover:no-underline hover:text-blue-400 transition-colors"
		>
			{children}
		</Link>
	);
}

// Reusable Donate Button
function DonateButton() {
	return (
		<Link
			href={links.donateLink.href}
			className="p-3 flex font-semibold items-center text-sm justify-center gap-1 rounded-3xl border-2 hover:no-underline shadow-sm hover:shadow-lg transition duration-300 border-black"
		>
			<Heart size={20} className="text-blue-500 fill-blue-500" />{" "}
			{typeof links.donateLink.name === "string"
				? links.donateLink.name.toUpperCase()
				: ""}
		</Link>
	);
}

// Dropdown Item
interface DropDownItemProps {
	name: string;
	href: string;
}
function DropDownItem({ name, href }: DropDownItemProps) {
	return (
		<motion.li
			initial={{ opacity: 0, y: -5 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -5 }}
			transition={{ duration: 0.2 }}
		>
			<Link
				href={href}
				className="block px-4 py-2 text-black transition-colors hover:bg-blue-50 hover:text-blue-500 hover:no-underline"
			>
				{name}
			</Link>
		</motion.li>
	);
}

function Navbar() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

	const dropdownVariants = {
		hidden: { opacity: 0, y: -5, transition: { duration: 0.2 } },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.2, staggerChildren: 0.05 },
		},
		exit: { opacity: 0, y: -5, transition: { duration: 0.2 } },
	};

	// Show/hide navbar on scroll
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<nav
				className={`fixed top-0 w-full z-50 h-20 flex justify-center bg-white  pl-5 pr-3 shadow-md transition duration-300 xl:px-50 lg:px-1 ${
					isVisible ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
			>
				{/* LOGO */}
				<div className="flex items-center gap-1">
					<Link href="/">
						<Image
							src={ngoDetails.logo}
							alt="Logo"
							width={96}
							height={96}
							className="w-20"
							priority
						/>
					</Link>
					<div className="hidden lg:flex flex-col ">
						<span className="font-bold">Aid Global Foundatoin</span>
						<span className="text-sm">
							Aid with heart, Impact with purpose
						</span>
					</div>
				</div>

				{/* Desktop Links */}
				<div className="ml-auto hidden lg:flex">
					<ul className="flex items-center space-x-6">
						{links.primaryLinks.map((link) => {
							const hasSublinks =
								"sublinks" in link &&
								Array.isArray(link.sublinks) &&
								link.sublinks.length > 0;
							return (
								<div
									key={link.name}
									className="relative"
									onMouseEnter={() =>
										setActiveDropdown(link.name)
									}
									onMouseLeave={() => setActiveDropdown(null)}
								>
									<NavLink
										href={
											"href" in link && link.href
												? link.href
												: "#"
										}
									>
										{link.name}
									</NavLink>

									{/* Dropdown if sublinks exist */}
									{hasSublinks && (
										<AnimatePresence>
											{activeDropdown === link.name && (
												<motion.div
													variants={dropdownVariants}
													initial="hidden"
													animate="visible"
													exit="exit"
													className="absolute left-0 w-56 rounded-lg bg-white shadow-lg"
												>
													<ul className="py-2">
														{link.sublinks.map(
															({
																name,
																href,
															}: {
																name: string;
																href: string;
															}) => (
																<DropDownItem
																	key={href}
																	name={name}
																	href={href}
																/>
															),
														)}
													</ul>
												</motion.div>
											)}
										</AnimatePresence>
									)}
								</div>
							);
						})}

						{/* Donate Button */}
						<DonateButton />
					</ul>
				</div>

				{/* Mobile Menu Button */}
				<div className="ml-auto flex items-center gap-2 lg:hidden">
					<DonateButton />
					<button onClick={() => setIsOpen(true)} type="button">
						<Menu size={30} />
					</button>
				</div>
			</nav>

			<SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
}

export default Navbar;
