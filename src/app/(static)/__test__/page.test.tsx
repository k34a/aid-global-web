import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "@/app/(static)/page";

describe("Home Page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });

  it("content", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Hi")).toBeInTheDocument();
  });
});
