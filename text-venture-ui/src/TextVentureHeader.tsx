import React from "react";
import { TextVenture } from "./TextVenture";

export interface TextVentureHeaderProps {
  text: TextVenture;
}

export function TextVentureHeader(props: TextVentureHeaderProps) {
  return (
    <header>
      <h1>{props.text.name}</h1>
      <h2>{props.text.description}</h2>
    </header>
  );
}
