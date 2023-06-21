import React from "react";
import { TextOnOffMode, TextObject, TextPlayer } from "./TextVenture";

export interface TextVentureInventoryProps {
  player: TextPlayer | undefined;
  onObjectClick(object: TextObject): void;
  mode: TextOnOffMode;
}

export function TextVentureInventory(props: TextVentureInventoryProps) {
  return (
    <div className={["TextVentureInventory", props.mode].join(" ")}>
      {props.player === undefined ? (
        <></>
      ) : (
        <>
          <hr></hr>
          <h2>{props.player?.name}</h2>
          <hr></hr>
          <h3>Inventory</h3>
          <ul>
            {props.player.things.map((thing) => (
              <li key={thing.id}>
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
          <hr></hr>
        </>
      )}
    </div>
  );
}
