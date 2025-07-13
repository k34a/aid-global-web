import "@testing-library/jest-dom";
import Header from "@/components/header";
import { render } from "@testing-library/react";

describe("Header Component", () => {
	it("renders without crashing", () => {
		const { container } = render(<Header />);
		expect(container).toBeInTheDocument();
	});
});
