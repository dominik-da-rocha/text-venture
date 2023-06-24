import React from "react";
import "./Anecdote.css";

export interface AnecdoteProps {
  children?: React.ReactNode;
  chronicler: string;
  source: string;
}

export function Anecdote(props: AnecdoteProps) {
  return (
    <div className="Anecdote">
      <span className="Quote">{props.children}</span>
      <span className="Quotation">
        <span className="Chronicler">– {props.chronicler}</span>
        <span>, </span>
        <span className="Source">{props.source}</span>
      </span>
    </div>
  );
}
