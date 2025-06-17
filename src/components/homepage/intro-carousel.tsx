"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = ["/intro/one.jpg", "/intro/two.jpg", "/intro/four.jpg"];

console.log(images.length);

const IntroCarousel = () => {
	const [cur, setCur] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCur((prev) => (prev == images.length - 1 ? 0 : prev + 1));
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] w-full max-h-[500px] sm:max-h-[600px] md:max-h-[700px] rounded-lg shadow-lg overflow-hidden">
			<Image
				src={images[cur]}
				className="w-full h-full object-cover"
				alt="Loading..."
				fill
				priority
				sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, 80vw"
			/>
		</div>
	);
};

export default IntroCarousel;
