"use client";
import React, { useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Image, Text, Stack, Paper, Center } from "@mantine/core";
import "@mantine/carousel/styles.css";
import AutoPlay from "embla-carousel-autoplay";
import { useMediaQuery } from "@mantine/hooks";

interface PartnerTestimonial {
	image: string;
	quote: string;
	name: string;
	title: string;
	logo: string;
}

interface TestimonialList {
	testimonial: PartnerTestimonial[];
}

export default function PartnerSay({ testimonial }: TestimonialList) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const autoplay = useRef(AutoPlay({ delay: 5000 }));
	const isMobile = useMediaQuery("(max-width: 1024px)");
	const slidesToScroll = isMobile ? 1 : 2;
	const slideSize = isMobile ? "100%" : "50%";

	const slides = testimonial.map((item, index) => (
		<Carousel.Slide key={index}>
			<div className="flex flex-col sm:flex-row items-center w-fit">
				<div className="pt-1 sm:pt-5 w-fit sm:place-self-start ">
					<Image
						h={100}
						w={100}
						src={item.image}
						alt={`${item.name} portrait`}
						className="rounded-full"
						fit="cover"
					/>
				</div>

				<div className="px-10 w-[100vw] sm:w-96 mt-2">
					<p className=" italic text-zinc-600 text-sm">
						{`"`}
						{item.quote}
						{`"`}
					</p>

					<p className="font-semibold">{item.name}</p>

					<p className="text-sm text-zinc-500">{item.title}</p>

					<Image
						h={50}
						w={100}
						src={item.logo}
						alt={`${item.name}'s company logo`}
						className="w-fit"
					/>
				</div>
			</div>
		</Carousel.Slide>
	));

	return (
		<div className="py-10 w-full sm:w-[65vw] mx-auto">
			<Carousel
				withIndicators={false}
				slideSize="50%"
				plugins={[autoplay.current]}
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={() => autoplay.current.play()}
				slideGap="sm"
				onSlideChange={setCurrentSlide}
				controlsOffset="2xl"
				controlSize={30}
				emblaOptions={{
					align: "start",
					slidesToScroll: slidesToScroll,
					loop: true,
				}}
			>
				{slides}
			</Carousel>
		</div>
	);
}
