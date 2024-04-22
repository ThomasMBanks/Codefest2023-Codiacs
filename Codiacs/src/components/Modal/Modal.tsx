import React from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent.tsx";
import "./Modal.css";

export interface ModalComponentProps {
  heading: string;
  subheading?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  noClose?: true | undefined;
  onClose?: Function;
}

function Modal({
  heading,
  subheading,
  children,
  footer,
  noClose,
  onClose,
}: ModalComponentProps) {
  return (
    <div className="modal-overlay">
      {createPortal(
        <ModalContent
          heading={heading}
          subheading={subheading}
          footer={footer}
          noClose={noClose}
          onClose={onClose}
        >
          {children}
        </ModalContent>,
        document.body
      )}
    </div>
  );
}

export default Modal;
