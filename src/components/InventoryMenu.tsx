import React from "react";
import "./InventoryMenu.css";
import { OnOffMode } from "../model/TextSettings";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { TextPlayer, TextObject } from "../model/TextObject";

export interface InventoryMenuProps {
  player: TextPlayer | undefined;
  onObjectClick(object: TextObject): void;
  mode: OnOffMode;
  onModeChanged(mode: OnOffMode): void;
}

export function InventoryMenu(props: InventoryMenuProps) {
  return (
    <>
      <div className={["InventoryMenu", props.mode].join(" ")}>
        <div className="Header">
          <Button
            className="InventoryMenuButton"
            onClick={() =>
              props.onModeChanged(props.mode === "on" ? "off" : "on")
            }
          >
            <Icon>inventory</Icon>
          </Button>
          <h4 className={["Player", props.player?.id].join(" ")}>
            {props.player?.name}
          </h4>
        </div>
        {props.player === undefined ? (
          <></>
        ) : (
          <div className="Inventory">
            <h4>Inventory</h4>
            <ul className="Items">
              {props.player.things.map((thing) => (
                <li
                  key={thing.id}
                  className={"Item SceneObject " + thing.type + " " + thing.id}
                  onClick={(event) => {
                    event.preventDefault();
                    props.onObjectClick(thing);
                  }}
                >
                  <span>{thing.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
