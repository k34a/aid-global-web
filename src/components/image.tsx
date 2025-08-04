"use client";

import NextImage, { type ImageProps } from "next/image";

const customImageLoader = ({ src }: { src: string }) => src;

const Image = (props: ImageProps) => {
	return <NextImage loader={customImageLoader} {...props} />;
};

export default Image;
