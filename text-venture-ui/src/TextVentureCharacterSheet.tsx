import React, { useState } from "react";
import { TextObject, TextPlayer } from "./TextVenture";
import { Button } from "./Button";
import { Icon } from "./Icon";

export interface TextVentureCharacterSheetProps {
  player: TextPlayer | undefined;
  onObjectClick(object: TextObject): void;
  menuButton?: boolean;
}

export function TextVentureCharacterSheet(
  props: TextVentureCharacterSheetProps
) {
  const [menu, setMenu] = useState(false);
  const showMenu = !props.menuButton || menu;

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <>
      {showMenu ? (
        <div
          className={
            "CharacterSheet" + (props.player !== undefined ? " Open" : "")
          }
        >
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
      ) : (
        <></>
      )}
      {props.menuButton ? (
        <Button
          className="TextVentureCharacterSheetButton"
          onClick={toggleMenu}
        >
          <Icon>list</Icon>
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
