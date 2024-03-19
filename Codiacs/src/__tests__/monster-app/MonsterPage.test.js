import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MonsterPage from "../../monster-app/MonsterPage";
import "jest-canvas-mock";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe("MonsterPage", () => {
  test("renders name input and submit button when nameSubmitted is false", () => {
    const { getByPlaceholderText, getByText } = render(<MonsterPage />);

    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");
    fireEvent.mouseEnter(submitButton);
    fireEvent.mouseLeave(submitButton);

    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("renders drawing canvas when name is submitted", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <MonsterPage />
    );

    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Worry Monster" } });
    fireEvent.mouseEnter(submitButton);
    fireEvent.mouseLeave(submitButton);
    fireEvent.click(submitButton);

    const canvas = getByTestId("monster-canvas");

    expect(canvas).toBeInTheDocument();
  });

  test("allows user to enter text in text area", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <MonsterPage />
    );

    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Worry Monster" } });
    fireEvent.click(submitButton);

    const textCheckbox = getByLabelText("Text");

    fireEvent.click(textCheckbox);

    const textArea = getByPlaceholderText("Enter your worry here");

    fireEvent.change(textArea, { target: { value: "Test worry" } });

    expect(textArea.value).toBe("Test worry");
  });

  test("clicking button sets isDraggable to true", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <MonsterPage />
    );

    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Worry Monster" } });
    fireEvent.click(submitButton);

    const button = getByText(/Click here when you're ready to feed/);
    const canvas = getByTestId("monster-canvas");
    const image = getByTestId("monster-hungry-img");

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    fireEvent.click(button);

    await waitFor(() => {}, { timeout: 5000 });
    expect(button).toHaveAttribute("disabled");

    // Simulate drag start
    fireEvent.dragStart(canvas);
    // Simulate drop
    fireEvent.dragOver(image);
    fireEvent.drop(image);

    await waitFor(() => {}, { timeout: 5000 });

    setTimeout(() => {
      expect(button).not.toHaveAttribute("disabled");
    }, 5000);
  });

  test("allows user to toggle drawing checkbox", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <MonsterPage />
    );

    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Worry Monster" } });
    fireEvent.click(submitButton);

    const drawCheckbox = getByLabelText("Draw");

    fireEvent.click(drawCheckbox);

    expect(drawCheckbox).not.toBeChecked();
  });

  test("allows user to toggle text checkbox", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <MonsterPage />
    );

    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Worry Monster" } });
    fireEvent.click(submitButton);

    const textCheckbox = getByLabelText("Text");

    fireEvent.click(textCheckbox);

    expect(textCheckbox).toBeChecked();
  });

  test("renders color picker and line width range when drawing checkbox is checked", () => {
    const { getByLabelText, getByPlaceholderText, getByText, getByTestId } =
      render(<MonsterPage />);

    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Worry Monster" } });
    fireEvent.click(submitButton);

    const colorPicker = getByTestId("color-picker");
    const lineWidthRange = getByLabelText("1");

    expect(colorPicker).toBeInTheDocument();
    expect(lineWidthRange).toBeInTheDocument();
  });

  test("disables button if monsters name is not entered", () => {
    const { getByPlaceholderText, getByText } = render(<MonsterPage />);
    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "" } });

    expect(submitButton).toBeDisabled();
  });

  test("allows user to submit name and renders monster name after submission", () => {
    const { getByPlaceholderText, getByText } = render(<MonsterPage />);
    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Mr Silly Monster" } });
    fireEvent.click(submitButton);

    expect(getByText("Mr Silly Monster")).toBeInTheDocument();
  });

  // Add more tests as needed to cover all functionalities
});

describe("MonsterPage", () => {
  it("renders canvas element correctly", async () => {
    // Arrange
    const getContextMock = jest.fn();
    const mockCanvas = {
      getContext: getContextMock,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    const getContextReturnValue = {
      lineCap: "",
      strokeStyle: "",
      lineWidth: "",
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
    };
    getContextMock.mockReturnValueOnce(getContextReturnValue);
    jest.spyOn(document, "querySelector").mockReturnValueOnce(mockCanvas);

    const addEventListenerMock = jest.fn();
    const mockColorPicker = {
      addEventListener: addEventListenerMock,
      value: "#000000",
    };
    jest.spyOn(document, "querySelector").mockReturnValueOnce(mockColorPicker);

    const mockLineWidthRange = {
      addEventListener: addEventListenerMock,
      value: 10,
    };
    jest
      .spyOn(document, "querySelector")
      .mockReturnValueOnce(mockLineWidthRange);

    // Act
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <MonsterPage />
    );
    const nameInput = getByPlaceholderText("Enter name");
    const submitButton = getByText("Submit");
    fireEvent.change(nameInput, { target: { value: "Worry Monster" } });
    fireEvent.click(submitButton);

    // Mock mouse events
    let mouseDownEvent = new MouseEvent("mousedown");
    let mouseUpEvent = new MouseEvent("mouseup");
    let mouseMoveEvent = new MouseEvent("mousemove");
    let mouseOutEvent = new MouseEvent("mouseout");

    // Mock document.createElement to return our mock canvas
    jest.spyOn(document, "createElement").mockImplementation(() => mockCanvas);

    const handleMouseDown = mockCanvas.addEventListener.mock.calls.find(
      (call) => call[0] === "mousedown"
    )[1];
    const handleMouseMove = mockCanvas.addEventListener.mock.calls.find(
      (call) => call[0] === "mousemove"
    )[1];
    handleMouseDown(mouseDownEvent);
    handleMouseMove(mouseMoveEvent);
    const handleMouseUp = mockCanvas.addEventListener.mock.calls.find(
      (call) => call[0] === "mouseup"
    )[1];
    handleMouseUp(mouseUpEvent);
    const handleMouseOut = mockCanvas.addEventListener.mock.calls.find(
      (call) => call[0] === "mouseout"
    )[1];
    handleMouseOut(mouseOutEvent);

    // Trigger change event
    // let changeEvent = new Event("change", { target: { value: "#000000" } });
    // const handleChange = mockColorPicker.addEventListener.mock.calls.find(
    //   (call) => call[0] === "change"
    // )[1];
    // handleChange(changeEvent);
    // // Trigger input event
    // let inputEvent = new Event("input");
    // inputEvent.target = { value: 10 };
    // const handleInput = mockLineWidthRange.addEventListener.mock.calls.find(
    //   (call) => call[0] === "input"
    // )[1];
    // handleInput(inputEvent);

    // const button = getByText(/Click here when you're ready to feed/);
    // const canvas = getByTestId("monster-canvas");
    // const image = getByTestId("monster-hungry-img");

    // fireEvent.click(button);

    // const handleMouseDown2 = mockCanvas.removeEventListener.mock.calls.find(
    //   (call) => call[0] === "mousedown"
    // )[1];
    // const handleMouseMove2 = mockCanvas.removeEventListener.mock.calls.find(
    //   (call) => call[0] === "mousemove"
    // )[1];
    // handleMouseDown2(mouseDownEvent);
    // handleMouseMove2(mouseMoveEvent);
    // const handleMouseUp2 = mockCanvas.removeEventListener.mock.calls.find(
    //   (call) => call[0] === "mouseup"
    // )[1];
    // handleMouseUp2(mouseUpEvent);
    // const handleMouseOut2 = mockCanvas.removeEventListener.mock.calls.find(
    //   (call) => call[0] === "mouseout"
    // )[1];
    // handleMouseOut2(mouseOutEvent);

    // Assert
    const canvasElement = getByTestId("monster-canvas");
    expect(canvasElement).toBeInTheDocument();
    expect(canvasElement).toHaveClass("js-paint");
    expect(canvasElement).toHaveAttribute("width", "800");
    expect(canvasElement).toHaveAttribute("height", "380");
    expect(document.querySelector).toHaveBeenCalledWith(".js-paint");
    expect(getContextMock).toHaveBeenCalledWith("2d");
    expect(getContextReturnValue.lineCap).toBe("round");
    //expect(mockCanvas.addEventListener).toHaveBeenCalled();
    //expect(mockCanvas.removeEventListener).toHaveBeenCalled();
    expect(document.querySelector).toHaveBeenCalledWith(".js-color-picker");
    // expect(mockCanvas.strokeStyle).toBe("#ff0000");
    expect(addEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
    expect(document.querySelector).toHaveBeenCalledWith(".js-line-range");
    expect(addEventListenerMock).toHaveBeenCalledWith(
      "input",
      expect.any(Function)
    );
  });
});
