import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EMDRPage from "../../emdr-app/EMDRPage";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe("EMDRPage Component", () => {
  test("renders EMDRPage component", () => {
    render(<EMDRPage />);
    expect(screen.getByText("Background")).toBeInTheDocument();
  });

  test("changes size when size slider is moved", () => {
    render(<EMDRPage />);
    const sizeSlider = screen.getByLabelText(/Size/i);

    fireEvent.change(sizeSlider, { target: { value: "75" } });

    expect(screen.getByText("Size: 75")).toBeInTheDocument();
  });

  test("changes speed when speed slider is moved", () => {
    render(<EMDRPage />);
    const speedSlider = screen.getByLabelText(/Speed/i);

    fireEvent.change(speedSlider, { target: { value: "8" } });

    expect(screen.getByText("Speed: 8")).toBeInTheDocument();
  });

  test("changes theme when theme select is changed", () => {
    render(<EMDRPage />);
    const themeSelect = screen.getByLabelText(/Background/i);

    fireEvent.change(themeSelect, { target: { value: "dark" } });

    expect(screen.getByTestId("emdrPage").classList).toContain("bg-dark");
    expect(screen.getByTestId("emdrPage").classList).toContain("text-light");
  });

  test("toggles animation when Start/Stop button is clicked", () => {
    render(<EMDRPage />);

    // Check for the initial state (Stop button is present)
    expect(screen.getByText(/Stop/)).toBeInTheDocument();

    // Click the Stop button
    fireEvent.click(screen.getByText(/Stop/));

    // Check that the button text changes to Start
    expect(screen.getByText(/Start/)).toBeInTheDocument();

    // Click the Start button
    fireEvent.click(screen.getByText(/Start/));

    // Check that the button text changes back to Stop
    expect(screen.getByText(/Stop/)).toBeInTheDocument();
  });

  test("toggles full screen when button is clicked", () => {
    render(<EMDRPage />);
    const toggleFullScreenButton = screen.getByText(/Hide settings/);

    fireEvent.click(toggleFullScreenButton);

    expect(screen.getByText(/Show settings/)).toBeInTheDocument();

    fireEvent.click(toggleFullScreenButton);

    expect(screen.getByText(/Hide settings/)).toBeInTheDocument();
  });
});
