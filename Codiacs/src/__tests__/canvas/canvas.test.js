import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Canvas from "../../canvas-app/canvas.js";

describe("Canvas component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Canvas />
      </MemoryRouter>
    );
    expect(screen.getByTestId("paint-canvas")).toBeInTheDocument();
  });

  test("updates pen color on color picker change", async () => {
    render(
      <MemoryRouter>
        <Canvas />
      </MemoryRouter>
    );
    const colorPicker = screen.getByTestId("color-picker");
    fireEvent.change(colorPicker, { target: { value: "#ff0000" } });
    await waitFor(() => {
      expect(colorPicker.value).toBe("#ff0000");
    });
  });

  test("disables undo and redo buttons when drawing stack is empty", async () => {
    render(
      <MemoryRouter>
        <Canvas />
      </MemoryRouter>
    );
    const undoButton = screen.getByText("Undo");
    const redoButton = screen.getByText("Redo");
    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();
  });

  test("enables undo and redo buttons when drawing stack is not empty", async () => {
    render(
      <MemoryRouter>
        <Canvas />
      </MemoryRouter>
    );
    const canvas = screen.getByTestId("paint-canvas");
    fireEvent.click(canvas); // Simulate drawing action
    const undoButton = screen.getByText("Undo");
    const redoButton = screen.getByText("Redo");
    expect(undoButton).toBeEnabled();
    expect(redoButton).toBeDisabled(); // Redo should still be disabled after drawing
  });

  // Add more test cases for other functionalities as needed
});
