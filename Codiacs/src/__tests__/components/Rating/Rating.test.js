import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Rating from "../../../components/Rating/Rating.tsx";

describe("Rating", () => {
  it("renders rating component", () => {
    const { container } = render(<Rating />);
    expect(container.firstChild.classList.contains("scale-container"));
  });

  it("renders correct amount of rating circles", () => {
    render(<Rating amount={5} />);
    expect(screen.getAllByRole("button")).toHaveLength(5);
  });

  it("renders circle number count under circles", () => {
    render(<Rating amount={5} />);
    expect(screen.getAllByRole("heading")).toHaveLength(5);
  });

  it("renders correct amount of filled rating circles", () => {
    render(<Rating amount={5} selectedAmount={3} />);
    const circles = screen.getAllByRole("button");

    expect(circles[0].classList.contains("filled")).toBeTruthy;
    expect(circles[1].classList.contains("filled")).toBeTruthy;
    expect(circles[2].classList.contains("filled")).toBeTruthy;
    expect(circles[3].classList.contains("filled")).toBeFalsy;
    expect(circles[4].classList.contains("filled")).toBeFalsy;
  });

  it("should be tabbable by keyboard", () => {
    render(<Rating amount={5}/>);

    for (let i = 0; i < 3; i++) {
      userEvent.tab();
    }
    expect(screen.getByTestId("rating-3")).toHaveFocus()
  })
});
