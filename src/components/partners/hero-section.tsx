import { ArrowRight, Mail, Phone } from "lucide-react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

export default function HeroSection() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-green-400 via-primary to-green-800">
			<div className="absolute inset-0 opacity-10 mix-blend-overlay" />

			<div className="container relative mx-auto px-4 py-20 md:py-32">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
					<div className="space-y-6 text-balance">
						<div className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
							Corporate Social Responsibility
						</div>

						<h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
							Transform CSR Into Measurable Impact
						</h1>

						<p className="text-lg text-white/90 leading-relaxed md:text-xl">
							Partner with Aid Global Foundation to co-create
							sustainable social change across India. Turn your
							CSR commitments into real, measurable outcomes in
							education, healthcare, and community development.
						</p>
					</div>
					<div className="flex items-center justify-center">
						<Image
							src={`${STATIC_IMAGE_HOST}shiksha-aid/shikshaAid-2.webp`}
							alt="Corporate Partnerships"
							width={300}
							height={500}
							className="w-[350px] h-[400px] object-cover rounded-tr-[6rem] rounded-bl-[6rem] rounded-tl-sm rounded-br-sm shadow-lg transition-transform duration-300 hover:scale-105"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
