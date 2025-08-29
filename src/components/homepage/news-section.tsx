"use client";

import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { ArticleMeta } from "@/lib/db/articles";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { ArrowRight, CircleDotDashed } from "lucide-react";
import { motion } from "motion/react";

type Props = {
	articles: ArticleMeta[];
};
function chunkArray<T>(arr: T[], size: number): (T | null)[][] {
	const result: (T | null)[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		const chunk: (T | null)[] = arr.slice(i, i + size);
		while (chunk.length < size) chunk.push(null);
		result.push(chunk);
	}
	return result;
}

export default function NewsSection({ articles }: Props) {
	const articlePairs = chunkArray(articles, 2);

	return (
		<section className="px-6 py-10 lg:px-24 bg-sky-50">
			<h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
				<CircleDotDashed className="text-sky-600 h-5 w-5 sm:h-6 sm:w-6" />
				Our Latest News
			</h2>

			<div className="flex justify-center">
				<h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12 relative block after:absolute after:w-full after:h-1 after:bg-sky-500 after:bottom-0 after:left-0 after:rounded-full after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-left">
					Latest <span className="text-sky-700">News</span> &{" "}
					<span className="text-sky-700">Events</span>
				</h2>
			</div>
			<div className="hidden md:block">
				<Carousel
					slideSize="100%"
					slideGap="md"
					withControls
					classNames={{
						control:
							"bg-white hover:bg-sky-100 text-sky-600 shadow-lg z-10",
						indicator: "bg-sky-300 data-[active]:bg-sky-600 mt-6",
					}}
				>
					{articlePairs.map((pair, index) => (
						<Carousel.Slide key={index}>
							<div className="grid grid-cols-2 gap-4 py-8 px-2 ">
								{pair.map((article, subIndex) =>
									article ? (
										<motion.div
											key={subIndex}
											whileHover={{ scale: 1.02 }}
											transition={{ duration: 0.3 }}
											className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-[380px]"
										>
											<div className="relative w-full h-[65%]">
												<Image
													src={`${STATIC_IMAGE_HOST}home-page/dummyimage.webp`}
													alt={article.title}
													fill
													className="object-cover"
												/>
											</div>
											<div className="flex flex-col flex-grow p-4 gap-2">
												<h3 className="text-xl font-semibold text-sky-700 leading-snug line-clamp-2">
													{article.title}
												</h3>
												<p className="text-sm text-gray-800 line-clamp-3">
													{article.description}
												</p>
												<a
													href={`/articles/${article.slug}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-sky-600 hover:underline text-sm mt-auto inline-flex items-center gap-1 font-medium"
												>
													Read More{" "}
													<ArrowRight size={16} />
												</a>
											</div>
										</motion.div>
									) : (
										<div
											key={subIndex}
											className="h-[380px] rounded-2xl bg-transparent"
										/>
									),
								)}
							</div>
						</Carousel.Slide>
					))}
				</Carousel>
			</div>
			<div className="block md:hidden">
				<Carousel
					slideSize="100%"
					slideGap="sm"
					withControls
					classNames={{
						control:
							"bg-white hover:bg-sky-100 text-sky-600 shadow-lg z-10",
						indicator: "bg-sky-300 data-[active]:bg-sky-600 mt-6",
					}}
				>
					{articles.map((article, index) => (
						<Carousel.Slide key={index}>
							<motion.div
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.3 }}
								className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col h-[380px] mb-6 mx-2 "
							>
								<div className="relative w-full h-[65%]">
									<Image
										src={`${STATIC_IMAGE_HOST}home-page/dummyimage.webp`}
										alt={article.title}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex flex-col flex-grow p-4 gap-2">
									<h3 className="text-xl font-semibold text-sky-700 leading-snug line-clamp-2">
										{article.title}
									</h3>
									<p className="text-sm text-gray-800 line-clamp-3">
										{article.description}
									</p>
									<a
										href={`/articles/${article.slug}`}
										className="text-sky-600 hover:underline text-sm mt-auto inline-flex items-center gap-1 font-medium"
									>
										Read More <ArrowRight size={16} />
									</a>
								</div>
							</motion.div>
						</Carousel.Slide>
					))}
				</Carousel>
			</div>
		</section>
	);
}
