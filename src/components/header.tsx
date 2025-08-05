"use client";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
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
import { ChevronDown } from "lucide-react";
import { ngoDetails } from "@/config/config";
import { links } from "@/config/links";
import classes from "./header.module.css";
import Image from "./image";

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
										{link.sublinks.map((item) => (
											<UnstyledButton
												key={item.name}
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
						Donate
					</Link>
				</Group>

				<Burger
					opened={drawerOpened}
					onClick={toggleDrawer}
					hiddenFrom="lg"
					size="sm"
				/>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
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
										{link.sublinks.map((item) => (
											<Link
												key={item.name}
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

					<Group grow px="md" pb="xl">
						<Link
							href={links.donateLink.href}
							onClick={closeDrawer}
							className={classes.donateButton}
						>
							Donate
						</Link>
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
