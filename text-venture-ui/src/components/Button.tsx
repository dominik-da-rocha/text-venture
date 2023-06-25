import React from "react";
import "./Button.css";

export interface ButtonProps {
  children: React.ReactNode;
  accent?: boolean;
  onClick(): void;
  className?: string;
  hidden?: boolean;
  checked?: boolean;
}

export function Button(props: ButtonProps) {
  if (props.hidden) {
    return <></>;
  }
  return (
    <button
      className={[
        props.className ?? "",
        props.accent ? "accent" : "",
        props.checked ? "checked" : "",
      ].join(" ")}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
