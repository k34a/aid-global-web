import { Suspense } from "react";
import {
	Text,
	Title,
	Container,
	Group,
	Stack,
	Box,
	Card,
	SimpleGrid,
} from "@mantine/core";
import { IndianRupee, Users, GraduationCap, Stethoscope } from "lucide-react";
import { DonateForm } from "@/components/donate/form";
import OtherDonationModes from "@/components/donate/other-donation-modes";
import toast from "react-hot-toast";
import FaqSection from "@/components/donate/faq-section";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

interface DonationFormData {
	name: string;
	email: string;
	contact_number: string;
	amount: number;
	pan_number?: string;
	address?: string;
	notes?: string;
	is_anonymous: boolean;
	tax_exemption: boolean;
}

const PRESET_AMOUNTS = [100, 500, 1000, 2000, 5000];

export default function DonatePage() {
	const donateParamsSchema = z.object({
		program: z.enum([
			"shiksha-aid",
			"enable-aid",
			"cure-aid",
			"sakhi-aid",
			"vision-aid",
			"ghar-aid",
			"hunger-aid",
		]),
	});
	const searchParams = useSearchParams();
	const programRaw = searchParams.get("program");

	const parsed = donateParamsSchema.safeParse({ program: programRaw });
	const program = parsed.success ? parsed.data.program : "";
	const [customProgram, setCustomProgram] = useState<string>(program || "");

	const [isLoading, setIsLoading] = useState(false);
	const [selectedAmount, setSelectedAmount] = useState<number | "custom">(
		500,
	);
	const [customAmount, setCustomAmount] = useState<number | undefined>(
		undefined,
	);

	const form = useForm<DonationFormData>({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			amount: 500,
			pan_number: "",
			address: "",
			notes: program || "",
			is_anonymous: false,
			tax_exemption: false,
		},
		validate: {
			name: (value) =>
				value.length < 2 ? "Name must be at least 2 characters" : null,
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email",
			contact_number: (value) =>
				/^\d{10}$/.test(value)
					? null
					: "Phone number must be exactly 10 digits",
			amount: (value) =>
				value < 1 ? "Amount must be at least 1 rupee" : null,
			pan_number: (value, values) => {
				if (!values.tax_exemption) return null;
				return /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value!)
					? null
					: "Invalid PAN number format";
			},
			address: (value, values) => {
				if (!values.tax_exemption) return null;
				return value!.length < 10
					? "Please provide your complete address"
					: null;
			},
		},
	});

	const handleAmountSelect = (amount: number | "custom") => {
		setSelectedAmount(amount);
		if (amount !== "custom") {
			form.setFieldValue("amount", amount as number);
			setCustomAmount(undefined);
		} else {
			if (customAmount) {
				form.setFieldValue("amount", customAmount);
			}
		}
	};

	const handleCustomAmountChange = (value: number | string) => {
		const numValue = typeof value === "string" ? parseFloat(value) : value;
		setCustomAmount(numValue);
		if (!isNaN(numValue) && numValue > 0) {
			form.setFieldValue("amount", numValue);
		}
	};

	const handleDonation = async (values: DonationFormData) => {
		setIsLoading(true);
		try {
			await onDonateButtonClick({
				userInfo: {
					name: values.name,
					email: values.email,
					contact_number: values.contact_number,
					pan_number: values.pan_number || undefined,
					address: values.address || undefined,
					notes: values.notes || undefined,
				},
				is_anon: values.is_anonymous,
				donation_details: {
					amount: values.amount,
				},
			});

			toast.success(
				"Thank you for your donation! You will receive a receipt shortly.",
			);
		} catch (error) {
			console.error("Donation error:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to process donation. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box
			style={{
				minHeight: "100vh",
				background:
					"linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #dcfce7 100%)",
			}}
		>
			<Container size="lg" py={{ base: "md", sm: "xl" }}>
				{/* Header */}
				<Stack align="center" mb={{ base: "lg", sm: 40 }}>
					<Title
						order={1}
						size="h1"
						ta="center"
						fw={700}
						c="gray.9"
						mb="sm"
						style={{ fontSize: "2.25rem" }}
					>
						Make a Difference Today
					</Title>
					<Text
						size="h2"
						c="gray.6"
						ta="center"
						maw={600}
						style={{ fontSize: "1.25rem" }}
					>
						Your donation helps us provide food, education,
						healthcare, and hope to those who need it most.
					</Text>
				</Stack>

				{/* Main Form Card */}
				<Suspense>
					<DonateForm />
				</Suspense>
				<OtherDonationModes />

				{/* Impact Section */}
				<Box mt={{ base: "xl", sm: 60 }}>
					<Title
						order={3}
						size="h2"
						ta="center"
						mb={{ base: "lg", sm: 40 }}
						c="gray.9"
						style={{ fontSize: "2rem" }}
					>
						Your Impact
					</Title>
					<SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1hover:shadow-xl"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#dbeafe",
										borderRadius: "50%",
									}}
								>
									<Users size={32} color="#2563eb" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#2563eb" />
									<Text size="xl" fw={700} c="blue.6">
										100
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Provides a nutritious meal to a child
								</Text>
							</Stack>
						</Card>

						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#dcfce7",
										borderRadius: "50%",
									}}
								>
									<GraduationCap size={32} color="#16a34a" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#16a34a" />
									<Text size="xl" fw={700} c="green.6">
										500
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Supports a child&apos;s education for a week
								</Text>
							</Stack>
						</Card>

						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#f3e8ff",
										borderRadius: "50%",
									}}
								>
									<Stethoscope size={32} color="#9333ea" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#9333ea" />
									<Text size="xl" fw={700} c="violet.6">
										1000
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Provides healthcare for a family
								</Text>
							</Stack>
						</Card>
					</SimpleGrid>
				</Box>
			</Container>

			<FaqSection />
		</Box>
	);
}
