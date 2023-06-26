import React from "react";
import "./Button.css";

export interface ButtonProps {
  children: React.ReactNode;
  accent?: boolean;
  onClick(): void;
  className?: string;
  hidden?: boolean;
  checked?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  if (props.hidden) {
    return <></>;
  }
  return (
    <button
      className={[
        "Button",
        props.className ?? "",
        props.accent ? "accent" : "",
        props.checked ? "checked" : "",
      ]
        .join(" ")
        .trim()}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
