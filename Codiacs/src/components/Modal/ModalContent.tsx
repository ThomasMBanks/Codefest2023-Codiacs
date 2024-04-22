import React from "react";
import FocusTrap from "focus-trap-react"
import CloseButton from "react-bootstrap/CloseButton";
import "./ModalContent.css";
import Button from "../Button/Button.tsx";

export interface ModalContentProps {
  heading: string;
  subheading?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  noClose?: true | undefined;
  onClose?: Function;
}

function ModalContent({
  heading,
  subheading,
  children,
  footer,
  noClose,
  onClose,
}: ModalContentProps) {
  return (
    <FocusTrap>
      <div className="modal-content">
        {noClose === undefined && onClose && (
          <div data-testid="close-button">
            <CloseButton
              className="close"
              aria-label="Close modal"
              onClick={() => onClose()}
            />
          </div>
        )}
        <div className="headings">
        <h1>{heading}</h1>
          <h2>{subheading}</h2>
      </div>
      {children}
        <div className="modal-footer">{footer}</div>
      </div>
    </FocusTrap>
  );
}

export default ModalContent;
