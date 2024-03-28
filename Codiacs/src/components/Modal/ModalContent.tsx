import React from "react";
import FocusTrap from "focus-trap-react"
import CloseButton from "react-bootstrap/CloseButton";
import "./ModalContent.css";
import Button from "../Button/Button.tsx";

export interface ModalContentProps {
  heading: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  noClose?: true | undefined;
  onClose?: Function;
}

function ModalContent({
  heading,
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
        <h1>{heading}</h1>
        {children}
        <div className="modal-footer">{footer}</div>
      </div>
    </FocusTrap>
  );
}

export default ModalContent;
