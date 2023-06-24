import React from "react";
import { TextVenture } from "./../model/TextVenture";
import { Anecdote } from "../utils/Anecdote";

export interface TextVentureHeaderProps {
  text: TextVenture;
}

export function TextVentureHeader(props: TextVentureHeaderProps) {
  return (
    <div className="TextVentureHeader">
      <h1>{props.text.name}</h1>
      <div className="Subtitle">{props.text.description}</div>
      <Anecdote
        chronicler={props.text.anecdote.chronicler}
        source={props.text.anecdote.source}
      >
        {props.text.anecdote.quote}
      </Anecdote>
    </div>
  );
}
