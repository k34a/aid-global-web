"use client";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
	Drawer,
	Burger,
	Group,
	HoverCard,
	Box,
	Divider,
	Text,
	UnstyledButton,
	ScrollArea,
	Collapse,
	Center,
} from "@mantine/core";
import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from "@/components/icons";
import { ngoDetails } from "@/config/config";
import { links } from "@/config/links";
import classes from "./header.module.css";
import Image from "@/components/image";
import { Heart } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
	facebook: <Facebook className="w-5 h-5 text-blue-600" />,
	twitter: <Twitter className="w-5 h-5 text-blue-500" />,
	instagram: <Instagram className="w-5 h-5 text-pink-700" />,
	linkedin: <Linkedin className="w-5 h-5 text-blue-800" />,
	youtube: <Youtube className="w-5 h-5 text-red-500" />,
};

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
	return iconMap[name.toLowerCase()] ?? <div className="w-5 h-5" />;
};

export default function HeaderMegaMenu() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const toggleDropdown = (name: string) => {
		setOpenDropdown((prev) => (prev === name ? null : name));
	};

	return (
		<Box className={classes.wrapper}>
			<header className={classes.header}>
				<Link href="/" className={classes.logoGroup}>
					<Image
						src={ngoDetails.logo}
						alt="Logo"
						className={classes.logo}
						width={300}
						height={300}
					/>
					<div className={classes.logoTextGroup}>
						<h1 className={classes.title}>{ngoDetails.name}</h1>
						<p className={classes.tagline}>{ngoDetails.tagline}</p>
					</div>
				</Link>

				<Group className={classes.links} visibleFrom="lg">
					{links.primaryLinks.map((link) => {
						if ("sublinks" in link) {
							return (
								<HoverCard
									key={link.name}
									width={250}
									shadow="md"
									withinPortal
								>
									<HoverCard.Target>
										<button className={classes.linkButton}>
											<Center inline>
												<Box component="span" mr={5}>
													{link.name}
												</Box>
												<ChevronDown size={16} />
											</Center>
										</button>
									</HoverCard.Target>
									<HoverCard.Dropdown>
										{link.sublinks.map((item, idx) => (
											<UnstyledButton
												key={idx}
												component={Link}
												href={item.href}
												className={classes.subLink}
											>
												<Text>{item.name}</Text>
											</UnstyledButton>
										))}
									</HoverCard.Dropdown>
								</HoverCard>
							);
						}

						return (
							<Link
								key={link.name}
								href={link.href}
								className={classes.linkButton}
							>
								{link.name}
							</Link>
						);
					})}

					<Link
						href={links.donateLink.href}
						className={classes.donateButton}
					>
						<Heart className="w-4 h-4 text-sky-500 fill-sky-500" />
						<span>DONATE</span>
					</Link>
				</Group>
				<Group hiddenFrom="lg" gap="md">
					<Link
						href={links.donateLink.href}
						className={classes.donateButton}
					>
						<Heart className="w-4 h-4 text-sky-500 fill-sky-500" />
						<span>DONATE</span>
					</Link>
					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						size="sm"
					/>
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="80%"
				padding="md"
				title="Menu"
				hiddenFrom="lg"
				zIndex={1000000}
			>
				<ScrollArea h="calc(100vh - 80px)" mx="-md">
					<Divider my="sm" />

					{links.primaryLinks.map((link) => {
						if ("sublinks" in link) {
							return (
								<Box key={link.name}>
									<UnstyledButton
										className={classes.link}
										onClick={() =>
											toggleDropdown(link.name)
										}
									>
										<Center inline>
											<Box component="span" mr={5}>
												{link.name}
											</Box>
											<ChevronDown size={16} />
										</Center>
									</UnstyledButton>
									<Collapse in={openDropdown === link.name}>
										{link.sublinks.map((item, idx) => (
											<Link
												key={idx}
												href={item.href}
												onClick={closeDrawer}
												className={classes.subLink}
											>
												{item.name}
											</Link>
										))}
									</Collapse>
								</Box>
							);
						}

						return (
							<Link
								key={link.name}
								href={link.href}
								onClick={closeDrawer}
								className={classes.link}
							>
								{link.name}
							</Link>
						);
					})}

					<Divider my="sm" />

					<div className="gap-6 py-2 px-10 mx-3 flex flex-col items-center">
						<Link
							href={links.donateLink.href}
							onClick={closeDrawer}
							className="w-full  border-2 p-2 text-center border-sky-500 text-black rounded-4xl text-xl flex gap-2 items-center justify-center"
						>
							<Heart className="w-4 h-4 text-sky-500 fill-sky-500" />
							<span>Donate</span>
						</Link>
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-3">
								<Phone className="w-5" />
								<a
									className=" font-semibold"
									href={`tel:${ngoDetails.contact.nationalHelpline}`}
								>
									{ngoDetails.contact.nationalHelpline}
								</a>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="w-5" />
								<a
									className=" font-semibold"
									href={`mailto:${ngoDetails.contact.email}`}
								>
									{ngoDetails.contact.email}
								</a>
							</div>
						</div>

						<div className="flex gap-6">
							{links.socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
								>
									<span className="sr-only">
										{social.name}
									</span>
									<SocialIcon name={social.icon} />
								</a>
							))}
						</div>
					</div>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
