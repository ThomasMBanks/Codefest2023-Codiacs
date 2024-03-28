import { render, screen, fireEvent } from "@testing-library/react";
import ModalContent from "../../../components/Modal/ModalContent.tsx";

// the below button is added into each modal content render to prevent errors with the focus trap
const testButton = <button>Test button</button>

describe("Modal", () => {
  it("renders modal content", () => {
    const { container } = render(<ModalContent>{testButton}</ModalContent>);
    expect(container.firstChild.classList.contains("modal-content"));
  });

  it("renders modal heading", () => {
    const { getByText } = render(<ModalContent heading="Modal Heading" >{testButton}</ModalContent>);
    expect(getByText("Modal Heading")).toBeInTheDocument;
  });

  it("renders modal footer", () => {
    const { getByText } = render(<ModalContent footer={<p>Modal Footer</p>}>{testButton}</ModalContent>);
    expect(getByText("Modal Footer")).toBeInTheDocument;
  });

  it("renders modal children", () => {
    const { getByText } = render(
      <ModalContent><><p>Modal Children</p>{testButton}</></ModalContent>
    );
    expect(getByText("Modal Children")).toBeInTheDocument;
  });

  it("renders a button when noClose is not passed as a prop", () => {
    render(<ModalContent onClose={() => void 0}>{testButton}</ModalContent>);
    expect(screen.getByTestId("close-button")).toBeTruthy;
  });

  it("does not render a button when noClose is passed as a prop", () => {
    render(<ModalContent noClose>{testButton}</ModalContent>);
    expect(screen.queryByTestId("close-button")).toBeFalsy;
  });

  it("runs the onClose function once when close button is clicked", () => {
    const mockClick = jest.fn();
    render(<ModalContent onClose={mockClick}>{testButton}</ModalContent>);

    const button = screen.getByTestId("close-button").querySelector("button");
    fireEvent.click(button);

    expect(mockClick.mock.calls).toHaveLength(1);
  });
});
