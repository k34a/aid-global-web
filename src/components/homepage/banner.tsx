import type React from "react";
import Image from "@/components/image";

interface Partner {
	name: string;
	imageSrc: string;
}

interface BannerProps {
	partners: Partner[];
	speed?: number;
}

const Banner = ({ partners, speed = 20000 }: BannerProps) => {
	return (
		<div className="scroll-container">
			<div className="scroll-content">
				{[...partners, ...partners].map((partner, idx) => (
					<div className="partner-card" key={idx}>
						<div className="partner-image-wrapper">
							<Image
								src={partner.imageSrc}
								alt={partner.name}
								width={200}
								height={100}
								className="partner-image"
							/>
						</div>
					</div>
				))}
			</div>

			<style jsx>{`
				.scroll-container {
					overflow: hidden;
					width: 100%;
					background: #111827;
					height: 6rem; /* increased for better fit */
					display: flex;
					align-items: center;
				}

				.scroll-content {
					display: flex;
					width: max-content;
					animation: scroll ${speed}ms linear infinite;
				}

				.partner-card {
					flex: none;
					padding: 0 1.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.partner-image-wrapper {
					background: transparent;
					padding: 0.5rem 1rem;
					border-radius: 0.5rem;
					box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
					display: flex;
					align-items: center;
					justify-content: center;
					height: 4rem;
					width: 10rem; 
				}

				.partner-image {
					max-height: 100%;
					max-width: 100%;
					object-contain; 
				}

				@keyframes scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
			`}</style>
		</div>
	);
};

export { Banner };
