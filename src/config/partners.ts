import { STATIC_IMAGE_HOST } from "@/config/config";

const partners = [
	{
		name: "Rise Against Hunger",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/partner-rise.webp`,
	},
	{
		name: "give",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/partner-give.webp`,
	},
	{
		name: "chezuba",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/chezuba.webp`,
	},
	{
		name: "connectfor",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/connectfor.webp`,
	},
	{
		name: "donatekart",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/donatekart.webp`,
	},
	{
		name: "give India",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/giveIndia.webp`,
	},
	{
		name: "guidestar",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/guidestar.webp`,
	},
	{
		name: "karmapoints",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/karm.webp`,
	},
	{
		name: "rotaract",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/rotaract.webp`,
	},
	{
		name: "rotary",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/rotary.webp`,
	},
	{
		name: "united",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/united.webp`,
	},
	{
		name: "clubfoot",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/clubfootsols.webp`,
	},
].map((partner) => ({
	id: crypto.randomUUID(),
	...partner,
}));

export { partners };
