"use client";

import { Group, Text, Anchor } from "@mantine/core";
import {
	IconBrandInstagram,
	IconBrandFacebook,
	IconBrandTwitter,
} from "@tabler/icons-react";

export default function ShareButtons() {
	const handleShare = (platform: string) => {
		const url = window.location.href;
		const text = document.title;

		switch (platform) {
			case "facebook":
				window.open(
					`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
					"_blank",
				);
				break;
			case "twitter":
				window.open(
					`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
					"_blank",
				);
				break;
			case "instagram":
				// Instagram doesn't have direct sharing, copy link instead
				navigator.clipboard.writeText(url);
				alert("Link copied to clipboard!");
				break;
		}
	};

	return (
		<Group gap="xs" className="mb-6">
			<Text size="sm">Share this</Text>
			<Anchor
				href="#"
				aria-label="share to instagram"
				onClick={(e) => {
					e.preventDefault();
					handleShare("instagram");
				}}
			>
				<IconBrandInstagram size={20} />
			</Anchor>
			<Anchor
				href="#"
				aria-label="share to facebook"
				onClick={(e) => {
					e.preventDefault();
					handleShare("facebook");
				}}
			>
				<IconBrandFacebook size={20} />
			</Anchor>
			<Anchor
				href="#"
				aria-label="share to twitter"
				onClick={(e) => {
					e.preventDefault();
					handleShare("twitter");
				}}
			>
				<IconBrandTwitter size={20} />
			</Anchor>
		</Group>
	);
}
