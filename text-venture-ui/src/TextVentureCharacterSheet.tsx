import React from "react";
import { TextObject, TextPlayer } from "./TextVenture";

export interface TextVentureCharacterSheetProps {
  player: TextPlayer | undefined;
  onObjectClick(object: TextObject): void;
}

export function TextVentureCharacterSheet(
  props: TextVentureCharacterSheetProps
) {
  return (
    <aside
      className={"CharacterSheet" + (props.player !== undefined ? " Open" : "")}
    >
      {props.player === undefined ? (
        <></>
      ) : (
        <>
          <h2>{props.player?.name}</h2>
          <h3>Inventory</h3>
          <ul>
            {props.player.things.map((thing) => (
              <li key={thing.id}>
                -{" "}
                <a
                  href="?"
                  onClick={(event) => {
                    event.preventDefault();
                    props.onObjectClick(thing);
                  }}
                >
                  {thing.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
