import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RatingCircle from "../../../components/Rating/RatingCircle.tsx";

describe("Rating Circle", () => {
  it("renders a circle", () => {
    render(<RatingCircle />);
    expect(screen.getByRole("button")).toBeTruthy;
  });

  it("renders filled circle when filled prop passed", () => {
    render(<RatingCircle filled />);
    expect(screen.getByRole("button").classList.contains("filled")).toBeTruthy;
  });

  it("renders empty circle when filled prop not passed", () => {
    render(<RatingCircle />);
    expect(screen.getByRole("button").classList.contains("filled")).toBeFalsy;
  });

  it("runs function once when circle is clicked", () => {
    const mockClick = jest.fn();
    render(<RatingCircle setSelectedAmount={mockClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClick.mock.calls).toHaveLength(1);
  });

  it("runs function once when mouse enters circle", () => {
    const mockClick = jest.fn();
    render(<RatingCircle setSelectedAmount={mockClick} />);

    const button = screen.getByRole("button");
    fireEvent.mouseEnter(button);

    expect(mockClick.mock.calls).toHaveLength(1);
  });

  it("runs function once when enter is pressed on the keyboard", () => {
    const mockClick = jest.fn();
    render(<RatingCircle setSelectedAmount={mockClick} />);

    userEvent.tab();
    userEvent.keyboard('[Enter]')

    expect(mockClick.mock.calls).toHaveLength(1);
  });
});
