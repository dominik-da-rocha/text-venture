import React from "react";
import "material-icons/iconfont/material-icons.css";

interface IconProps {
  children: string;
  lib?: string;
  className?: string;
}

export function Icon(props: IconProps) {
  return (
    <span
      className={[props.className ?? "", props.lib ?? "material-icons"].join(
        " "
      )}
    >
      {props.children}
    </span>
  );
}
