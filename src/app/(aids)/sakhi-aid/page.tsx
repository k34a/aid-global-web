import SakhiAidIntro from "@/components/aids/sakhiaid-page/sakhiaid-intro";
import SakhiAidProvides from "@/components/aids/sakhiaid-page/sakhiaid-provides";
import SakhiAidAwareness from "@/components/aids/sakhiaid-page/sakhiaid-awareness";
import KeyInitiatives from "@/components/aids/sakhiaid-page/key-initiatives";
import {
	initiativesone,
	initiativestwo,
	menstrualAwarenessData,
	shgAwarenessData,
	livelihoodAwarenessData,
	initiativesthree,
	emotionalAwarenessData,
	initiativesfour,
} from "@/components/aids/sakhiaid-page/sakhiaid-data";
import SakhiAidVision from "@/components/aids/sakhiaid-page/sakhiaid-vision";
import PartnerWithUs from "@/components/aids/sakhiaid-page/partner-with-us";

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
