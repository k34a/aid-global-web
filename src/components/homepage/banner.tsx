import type React from "react";

interface Partner {
	name: string;
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
					<div className="partner-name" key={idx}>
						<span>{partner.name}</span>
					</div>
				))}
			</div>

			<style jsx>{`
				.scroll-container {
					overflow: hidden;
					width: 100%;
					background: #111827;
					height: 4rem;
					display: flex;
					align-items: center;
				}

				.scroll-content {
					display: flex;
					width: max-content;
					animation: scroll ${speed}ms linear infinite;
				}

				.partner-name {
					flex: none;
					padding: 0 2rem;
					display: flex;
					align-items: center;
					white-space: nowrap;
				}

				.partner-name span {
					color: #fff;
					font-size: 1.5rem;
					font-weight: 600;
					text-shadow: 0 0 5px #fff;
					transition: text-shadow 0.3s ease;
				}

				.partner-name:hover span {
					text-shadow:
						0 0 10px #fff,
						0 0 20px #fff,
						0 0 30px #fff;
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
