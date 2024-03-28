import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import VolcanoApp from "../../volcano-app/VolcanoApp.js";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe("Volcano app page", () => {
  it("renders a textbox for adding emotions", () => {
    render(<VolcanoApp />);
    expect(screen.getByRole("textbox").toBeTruthy);
  });

  it("renders text label for adding emotions", () => {
    render(<VolcanoApp />);
    expect(screen.getByText("Add your own emotions!").toBeTruthy);
  });

  it("renders button for adding emotions", () => {
    render(<VolcanoApp />);
    expect(screen.getByText("Add emotion").toBeTruthy);
  });

  it("adds custom emotion to list when add emotion button pressed", () => {
    render(<VolcanoApp />);

    const textbox = screen.getByRole("textbox");
    fireEvent.change(textbox, { target: { value: "Custom emotion" } });

    const button = screen.getByText("Add emotion");
    fireEvent.click(button);

    expect(screen.getByText("Custom emotion").toBeTruthy);
  });

  it("should transfer the emotion when dropped", () => {
    render(<VolcanoApp />);

    const emotion = screen.getByText("happy");
    expect(emotion.classList.contains("unused-emotion").toBeTruthy);

    const volcano = screen.getByTestId("volcano-image");
    fireEvent.drop(volcano, { dataTransfer: { getData: () => "happy" } });

    expect(emotion.classList.contains("used-emotion").toBeTruthy);
  });

  it("should prevent default behaviour when emotion is dragged over volcano", () => {
    render(<VolcanoApp />);

    const volcano = screen.getByTestId("volcano-image");
    const dragEvent = { preventDefault: jest.fn() };
    fireEvent.dragOver(volcano, dragEvent);

    expect(dragEvent.preventDefault.toHaveBeenCalled);
  });

  it("should transfer the focused emotion when enter button is clicked", () => {
    render(<VolcanoApp />);

    const emotion = screen.getByText("happy");
    expect(emotion.classList.contains("unused-emotion").toBeTruthy);
    fireEvent.keyDown(emotion, { key: "Enter" });

    expect(emotion.classList.contains("used-emotion").toBeTruthy);
  });

  it("should not transfer the focused emotion when a button other than enter is clicked", () => {
    render(<VolcanoApp />);

    const emotion = screen.getByText("happy");
    expect(emotion.classList.contains("unused-emotion").toBeTruthy);
    fireEvent.keyDown(emotion, { key: "Tab" });

    expect(emotion.classList.contains("used-emotion").toBeFalsy);
  });

  it("should start the bubbling audio when emotion dropped", () => {
    const mockAudioPlay = jest
      .spyOn(window.HTMLAudioElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())

    render(<VolcanoApp />);

    const volcano = screen.getByTestId("volcano-image");
    fireEvent.drop(volcano, { dataTransfer: { getData: () => "happy" } });

    const submitButton = screen.getByText("Go")
    const rating = screen.getByTestId("rating-10");
    fireEvent.click(rating);
    fireEvent.click(submitButton);

    expect(mockAudioPlay).toHaveBeenCalledTimes(1);
  });

  it("should stop the bubbling audio, trigger erupting audio and play erupting animation when progress bar full", () => {
    const mockAudioPlay = jest
      .spyOn(window.HTMLAudioElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())

    const mockAudioPause = jest
      .spyOn(window.HTMLAudioElement.prototype, 'pause')
      .mockImplementation(() => Promise.resolve())

    const mockVideoPlay = jest
      .spyOn(window.HTMLVideoElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())

    render(<VolcanoApp />);

    const volcano = screen.getByTestId("volcano-image");
    const emotions = ["happy", "sad", "confused"]

    for (const emotion of emotions) {
      fireEvent.drop(volcano, { dataTransfer: { getData: () => emotion } });

      const submitButton = screen.getByText("Go")
      const rating = screen.getByTestId("rating-10");
      fireEvent.click(rating);
      fireEvent.click(submitButton);
    }
    
    // we expect the bubbling audio to be played twice (for the first two emotions entered),
    // and the erupting audio to be played once, hence the count of 3 here
    expect(mockAudioPlay).toHaveBeenCalledTimes(3);
    expect(mockAudioPause).toHaveBeenCalledTimes(1);
    expect(mockVideoPlay).toHaveBeenCalledTimes(1);
  });

  it("should render the volcano image", () => {
    render(<VolcanoApp />);
    expect(screen.getByTestId("volcano-image")).toBeTruthy();
  });

  it("should not play the audio or animation on page load", () => {
    const mockAudioPlay = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())

    render(<VolcanoApp />);

    expect(mockAudioPlay).toHaveBeenCalledTimes(0);
  });

  it("should trigger the 'Rate Your Emotion' modal when an item is dropped into the volcano", () => {
    render(<VolcanoApp />);

    const volcano = screen.getByTestId("volcano-image");
    fireEvent.drop(volcano, { dataTransfer: { getData: () => "happy" } });

    expect(screen.getByText("Rate Your Emotion")).toBeTruthy();
  });

  it("should increase the progress bar a little when emotions are rated low", () => {
    render(<VolcanoApp />);

    const volcano = screen.getByTestId("volcano-image");
    fireEvent.drop(volcano, { dataTransfer: { getData: () => "happy" } });

    const rating = screen.getByTestId("rating-1");
    const submitButton = screen.getByText("Go");
    fireEvent.click(rating);
    fireEvent.click(submitButton);

    expect(screen.getByTestId("progress").classList.contains("bg-success")).toBeTruthy;
    expect(screen.getByTestId("progress").classList.contains("bg-warning")).toBeFalsy;
  });

  it("should increase the progress bar a lot when emotions are rated highly", () => {
    render(<VolcanoApp />);

    const volcano = screen.getByTestId("volcano-image");
    fireEvent.drop(volcano, { dataTransfer: { getData: () => "happy" } });

    const rating = screen.getByTestId("rating-10");
    const submitButton = screen.getByText("Go");
    fireEvent.click(rating);
    fireEvent.click(submitButton);

    expect(screen.getByTestId("progress").classList.contains("bg-warning")).toBeTruthy;
    expect(screen.getByTestId("progress").classList.contains("bg-success")).toBeFalsy;
  });

  it("should set the rating on mouse enter", () => {
    render(<VolcanoApp />);

    const volcano = screen.getByTestId("volcano-image");
    fireEvent.drop(volcano, { dataTransfer: { getData: () => "happy" } });

    const rating = screen.getByTestId("rating-10");
    const submitButton = screen.getByText("Go");
    fireEvent.mouseEnter(rating);
    fireEvent.mouseLeave(rating);
    fireEvent.click(submitButton);

    expect(screen.getByTestId("progress").classList.contains("bg-warning")).toBeTruthy;
    expect(screen.getByTestId("progress").classList.contains("bg-success")).toBeFalsy;
  });

  it("should be usable via keyboard", () => {
    render(<VolcanoApp />);

    const emotion = screen.getByTestId("happy");
    emotion.focus();
    act(() => userEvent.keyboard('[Enter]'))

    const rating = screen.getByTestId("rating-1");
    rating.focus();
    act(() => userEvent.keyboard('[Enter]'))

    for (let i = 0; i < 5; ++i) {
      userEvent.tab();
    }
    
    const newRating = screen.getByTestId("rating-6")
    expect(newRating).toHaveFocus();

    for (let i = 0; i < 5; ++i) {
      userEvent.tab();
    }

    const submitButton = screen.getByTestId("Go");
    expect(submitButton).toHaveFocus();
    act(() => userEvent.keyboard('[Enter]'))

    expect(screen.getByTestId("progress").classList.contains("bg-success")).toBeTruthy;
    expect(screen.getByTestId("progress").classList.contains("bg-warning")).toBeFalsy;
  });

  it("should trap keyboard focus on modal content", async () => {
    render(<VolcanoApp />);

    const emotion = screen.getByTestId("happy");
    emotion.focus();
    act(() => userEvent.keyboard('[Enter]'))

    const rating = screen.getByTestId("rating-1");
    expect(rating).toBeTruthy();
    // the first rating circle does automatically get focus in the browser but the test isn't picking this up
    // so I have manually focused the content
    rating.focus();

    for (let i = 0; i < 9; i++) {
      userEvent.tab();
    }
    
    const newRating = screen.getByTestId("rating-10")
    expect(newRating).toHaveFocus();

    userEvent.tab();
    const submitButton = screen.getByTestId("Go");
    expect(submitButton).toHaveFocus();

    // here we show that the keyboard focus is trapped within the modal
    userEvent.tab();
    expect(rating).toHaveFocus();
  });
});
