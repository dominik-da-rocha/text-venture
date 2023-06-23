import React, { useState } from "react";
import "./TextVentureInventory.css";
import { TextPlayer, TextObject } from "./../model/TextVenture";
import { TextOnOffMode } from "../model/TextSettings";
import { Button } from "../utils/Button";
import { Icon } from "../utils/Icon";

export interface TextVentureInventoryProps {
  player: TextPlayer | undefined;
  onObjectClick(object: TextObject): void;
  mode: TextOnOffMode;
  onModeChanged(mode: TextOnOffMode): void;
}

export function TextVentureInventory(props: TextVentureInventoryProps) {
  return (
    <>
      <div className={["TextVentureInventory", props.mode].join(" ")}>
        <div className="Header">
          <Button
            className="TextVentureInventoryButton"
            onClick={() =>
              props.onModeChanged(props.mode === "on" ? "off" : "on")
            }
          >
            <Icon>inventory</Icon>
          </Button>
          <h4 className="Player">{props.player?.name}</h4>
        </div>
        {props.player === undefined ? (
          <></>
        ) : (
          <div className="Inventory">
            <h4>Inventory</h4>
            <ul>
              {props.player.things.map((thing) => (
                <li key={thing.id}>
                  <a
                    className="thing"
                    href="?"
                    onClick={(event) => {
                      event.preventDefault();
                      props.onObjectClick(thing);
                    }}
                  >
                    - {thing.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
