import Image from "@/components/image";
import { HandHeart } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Link from "next/link";
import { Button } from "@mantine/core";
const HungerIntro = () => {
	return (
		<div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px]">
			<Image
				src={`${STATIC_IMAGE_HOST}hunger-aid/hungerAid-1.webp`}
				alt="introImage"
				sizes="100vw"
				fill
				priority
				className="object-cover brightness-50"
			/>
			<div className="absolute inset-0 flex flex-col items-start justify-end p-3 sm:p-6 md:p-8">
				<h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl mb-4 sm:mb-6">
					No one should sleep hungry
				</h1>
				<div className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-2 sm:mb-4">
					<Button
						component={Link}
						href="/donate?program=hunger-aid"
						variant="gradient"
						gradient={{ from: "orange", to: "red", deg: 90 }}
						radius="xl"
						size="lg"
						leftSection={<HandHeart size={20} />}
					>
						Donate Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default HungerIntro;
