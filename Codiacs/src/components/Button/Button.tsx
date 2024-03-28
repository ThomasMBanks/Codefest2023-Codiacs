import React from "react";
import "./Button.css";

export interface ButtonComponentProps {
  media?: any;
  children: string;
  onClick?: Function;
  light?: true | undefined;
  className?: string | undefined;
}

function Button({
  media,
  children,
  onClick,
  light,
  className,
  ...props
}: ButtonComponentProps) {
  var buttonClass: string = "button";
  if (className) {
    buttonClass += " " + className;
  }
  if (light) {
    buttonClass += " light";
  }

  return (
    <button
      className={buttonClass}
      data-testid={children}
      onClick={onClick && (() => onClick())}
      {...props}
    >
      {media && <span className="media-span">{media}</span>}
      <span>{children}</span>
    </button>
  );
}

export default Button;
