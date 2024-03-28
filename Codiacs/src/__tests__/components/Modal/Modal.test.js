import { render } from "@testing-library/react";
import Modal from "../../../components/Modal/Modal.tsx";

// the below button is added into each modal to prevent errors with the focus trap on the modal content
const testButton = <button>Test button</button>

describe("Modal", () => {
  it("renders modal overlay", () => {
    const { container } = render(<Modal>{testButton}</Modal>);
    expect(container.firstChild.classList.contains("modal-overlay"));
  });

  it("renders modal content", () => {
    const { getByText } = render(<Modal heading="Modal Heading">{testButton}</Modal>);
    expect(getByText("Modal Heading")).toBeInTheDocument;
  });
});
