import SakhiAidIntro from "@/components/aids/sakhi-aid/intro";
import SakhiAidProvides from "@/components/aids/sakhi-aid/provides";
import SakhiAidAwareness from "@/components/aids/sakhi-aid/awareness";
import KeyInitiatives from "@/components/aids/sakhi-aid/key-initiatives";
import {
	initiativesone,
	initiativestwo,
	menstrualAwarenessData,
	shgAwarenessData,
	livelihoodAwarenessData,
	initiativesthree,
	emotionalAwarenessData,
	initiativesfour,
} from "@/components/aids/sakhi-aid/data";
import SakhiAidVision from "@/components/aids/sakhi-aid/vision";
import PartnerWithUs from "@/components/aids/sakhi-aid/partner-with-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sakhi Aid",
};

export default function SakhiAidSection() {
	return (
		<main>
			<SakhiAidIntro />
			<SakhiAidProvides />
			<SakhiAidAwareness content={menstrualAwarenessData} />
			<KeyInitiatives title="Key initiatives" items={initiativesone} />
			<SakhiAidAwareness content={shgAwarenessData} />
			<KeyInitiatives title="What we do" items={initiativestwo} />
			<SakhiAidAwareness content={livelihoodAwarenessData} />
			<KeyInitiatives
				title="Pillars of change"
				items={initiativesthree}
			/>
			<SakhiAidAwareness content={emotionalAwarenessData} />
			<KeyInitiatives title="What we offer" items={initiativesfour} />
			<SakhiAidVision />
			<PartnerWithUs />
		</main>
	);
}
