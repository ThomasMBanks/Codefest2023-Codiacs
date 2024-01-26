import React from "react";
import "./Button.css";

export interface ButtonComponentProps {
  media?: any;
  children: string;
  onClick: Function;
  light?: true | undefined;
}

function Button({ media, children, onClick, light }: ButtonComponentProps) {
  var buttonClass: string = "button";
  if (light) {
    buttonClass = buttonClass + " light";
  }

  return (
    <button className={buttonClass} onClick={() => onClick()}>
      {media && <span className="media-span">{media}</span>}
      <span>{children}</span>
    </button>
  );
}

export default Button;
