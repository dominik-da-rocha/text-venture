import React from "react";
import { TextVenture } from "../model/TextVenture";
import { Anecdote } from "./Anecdote";

export interface SceneHeaderProps {
  text: TextVenture;
}

export function SceneHeader(props: SceneHeaderProps) {
  return (
    <div className="SceneHeader">
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
