import { STATIC_IMAGE_HOST } from "@/config/config";

const partners = [
	{
		name: "Rise Against Hunger",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/partner-rise.webp`,
	},
	{
		name: "Give",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/partner-give.webp`,
	},
	{
		name: "Chezuba",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/chezuba.webp`,
	},
	{
		name: "Connectfor",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/connectfor.webp`,
	},
	{
		name: "Donatekart",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/donatekart.webp`,
	},
	{
		name: "Give India",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/giveIndia.webp`,
	},
	{
		name: "Guidestar",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/guidestar.webp`,
	},
	{
		name: "Karma Points",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/karm.webp`,
	},
	{
		name: "Rotaract",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/rotaract.webp`,
	},
	{
		name: "Rotary",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/rotary.webp`,
	},
	{
		name: "United",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/united.webp`,
	},
	{
		name: "Clubfoot",
		imageSrc: `${STATIC_IMAGE_HOST}partners/partners/clubfootsols.webp`,
	},
].map((partner) => ({
	id: crypto.randomUUID(),
	...partner,
}));

export { partners };
