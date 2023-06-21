import React from "react";
import { TextVenture } from "./../model/TextVenture";

export interface TextVentureHeaderProps {
  text: TextVenture;
}

export function TextVentureHeader(props: TextVentureHeaderProps) {
  return (
    <div className="TextVentureHeader">
      <h1>{props.text.name}</h1>
      <h2>{props.text.description}</h2>
    </div>
  );
}
