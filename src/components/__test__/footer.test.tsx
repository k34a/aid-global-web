import "@testing-library/jest-dom";
import Footer from "@/components/footer";
import { render } from "@testing-library/react";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });

  //   it("contains the correct text", () => {
  //     const { getByText } = render(<Footer />);
  //     expect(getByText("© 2023 Your Company Name")).toBeInTheDocument();
  //   });

  //   it("has a link to the privacy policy", () => {
  //     const { getByText } = render(<Footer />);
  //     const link = getByText("Privacy Policy");
  //     expect(link).toHaveAttribute("href", "/privacy-policy");
  //   });
});
