"use client";

import NextImage, { ImageLoaderProps, type ImageProps } from "next/image";

const customImageLoader = ({ src, width }: ImageLoaderProps) =>
	`${src}?width=${width}`;

const Image = (props: ImageProps) => {
	return <NextImage loader={customImageLoader} {...props} />;
};

export default Image;
