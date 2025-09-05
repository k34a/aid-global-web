import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { List, ListItem, Title, Text } from "@mantine/core";
function Corevalues() {
	const values = [
		{
			title: "GODLIKE",
			description:
				"We serve with divine compassion, honoring the worth of every person.",
		},
		{
			title: "CHILDLIKE",
			description:
				"We live with wonder, humility, and a deep dependence on values greater than ourselves.",
		},
		{
			title: "INTEGRITY",
			description:
				"We uphold honesty and accountability in all that we do.",
		},
		{
			title: "RESTORING THE BROKEN",
			description:
				"We address the physical, emotional, and spiritual needs of those who are overlooked or suffering.",
		},
		{
			title: "INTENTIONAL RELATIONSHIPS",
			description:
				"We build authentic, trust-based partnerships to amplify our collective impact.",
		},
	];
	return (
		<div>
			<section
				id="core"
				className="px-6 sm:px-4 py-6 sm:py-12 mx-4 sm:mx-20 gap-8 sm:gap-10 bg-no-repeat bg-cover bg-center rounded-xl"
				style={{
					backgroundImage: `url(${STATIC_IMAGE_HOST}whoweare/background.webp)`,
				}}
			>
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-sky-800 mb-4 sm:mb-6">
						Core Values
					</h2>

					<div className="flex flex-col lg:flex-row items-center gap-y-3 sm:gap-y-6 lg:gap-x-12">
						<div className="w-full lg:w-1/2">
							<List
								spacing={{ base: "sm", sm: "xl" } as any}
								size="md"
							>
								{values.map((item, idx) => (
									<ListItem
										key={idx}
										style={{ marginBottom: "1rem" }}
									>
										<Title
											order={4}
											fz={{ base: "sm", sm: "lg" }}
											c="blue.6"
											fw={700}
										>
											{item.title}
										</Title>
										<Text
											fz={{
												base: "sm",
												sm: "lg",
											}}
											c="gray.9"
										>
											{item.description}
										</Text>
									</ListItem>
								))}
							</List>
						</div>

						<div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex justify-center lg:justify-end">
							<div className="w-68 sm:w-72 md:w-96">
								<Image
									src={`${STATIC_IMAGE_HOST}whoweare/aboutus-4.webp`}
									alt="core values"
									width={400}
									height={400}
									className="w-full h-80 sm:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Corevalues;
