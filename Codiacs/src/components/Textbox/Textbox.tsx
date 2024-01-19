import React, { ChangeEventHandler } from "react";
import "./Textbox.css";

export interface TextboxComponentProps {
  size: string;
  label?: string;
  labelledBy?: string;
  onChange?: ChangeEventHandler<any>;
  value?: string;
}

function Textbox({
  size,
  label,
  labelledBy,
  onChange,
  value,
}: TextboxComponentProps) {
  return labelledBy && size === "sm" ? (
    <input
      className="textbox"
      type="text"
      aria-labelledby={labelledBy}
      value={value}
      onChange={onChange}
    />
  ) : labelledBy && size === "lg" ? (
    <textarea
      className="textarea"
      aria-labelledby={labelledBy}
      value={value}
      onChange={onChange}
    />
  ) : size === "sm" ? (
    <input
      className="textbox"
      type="text"
      aria-label={label}
      value={value}
      onChange={onChange}
    />
  ) : size === "lg" ? (
    <textarea
      className="textarea"
      aria-label={label}
      value={value}
      onChange={onChange}
    />
  ) : (
    <></>
  );
}

export default Textbox;
