import { Container, Grid, GridCol, Text, Title } from "@mantine/core";

export default function HungerStats() {
	return (
		<section
			style={{
				backgroundColor: "#e5e7eb",
				paddingTop: "2rem",
				paddingBottom: "3rem",
				paddingLeft: "0.5rem",
				paddingRight: "0.5rem",
			}}
		>
			<Container size="6xl" style={{ textAlign: "center" }}>
				<Title
					order={2}
					style={{
						fontWeight: 800,
						marginBottom: "2.5rem",
						fontSize: 32,
					}}
				>
					Hunger Stats
				</Title>

				<Grid gutter="lg">
					<GridCol span={{ base: 12, sm: 6 }}>
						<div style={{ textAlign: "center" }}>
							<Text
								style={{
									fontWeight: 800,
									color: "red",
									fontSize: 48,
								}}
							>
								319{" "}
								<span style={{ fontWeight: 900 }}>MILLION</span>
							</Text>
							<Text
								style={{
									fontWeight: 700,
									color: "red",
									fontSize: 18,
									marginTop: 8,
								}}
							>
								PEOPLE
							</Text>
							<Text style={{ color: "red", fontSize: 14 }}>
								in acute hunger
							</Text>
						</div>
					</GridCol>

					<GridCol span={{ base: 12, sm: 6 }}>
						<div style={{ textAlign: "center" }}>
							<Text
								style={{
									fontWeight: 800,
									color: "#3b82f6",
									fontSize: 48,
								}}
							>
								67
							</Text>
							<Text
								style={{
									fontWeight: 700,
									color: "#3b82f6",
									fontSize: 18,
									marginTop: 8,
								}}
							>
								COUNTRIES
							</Text>
							<Text style={{ color: "#3b82f6", fontSize: 14 }}>
								where these people live
							</Text>
						</div>
					</GridCol>
				</Grid>
			</Container>
		</section>
	);
}
