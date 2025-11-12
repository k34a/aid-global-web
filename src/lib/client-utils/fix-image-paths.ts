"use client";

import { DomUtils, parseDocument } from "htmlparser2";
import serialize from "dom-serializer";

export function applyImageFullPaths(
	html: string,
	getImageFullPath: (src: string) => string,
): string {
	if (!html) return html;

	const dom = parseDocument(html);
	const images = DomUtils.findAll(
		(elem) => elem.name === "img",
		dom.children,
	);

	for (const img of images) {
		const srcAttr = img.attribs?.src;
		if (srcAttr) {
			img.attribs.src = getImageFullPath(srcAttr);
		}
	}

	return serialize(dom);
}
