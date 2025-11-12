"use client";

import { Box } from "@mantine/core";
import { getImageForArticle } from "./description";
import Image from "../image";

export const BannerImage = ({
	id,
	src,
	title,
}: {
	id: string;
	src: string;
	title: string;
}) => {
	const imageUrl = getImageForArticle(id, src);
	return (
		<Box pos="relative" h={{ base: 260, lg: "100%" }}>
			<Image
				src={imageUrl}
				alt={title}
				width={1000}
				height={1000}
				style={{
					maxWidth: "100%",
					height: "auto",
				}}
				priority
			/>
		</Box>
	);
};
