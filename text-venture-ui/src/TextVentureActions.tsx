import React, { useState } from "react";
import { TextAction, TextActionMap } from "./TextAction";
import { iMap } from "./Util";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface TextVentureActionsProps {
  actions: TextActionMap;
  currentAction: TextAction | undefined;
  onAction(action: TextAction): void;
  menuButton?: boolean;
}

export function TextVentureActions(props: TextVentureActionsProps) {
  const [menu, setMenu] = useState(false);
  const actions = props.actions;
  const showMenu = !props.menuButton || menu;
  function toggleMenu() {
    setMenu(!menu);
  }
  return (
    <ul className={["TextVentureActions"].join()}>
      {iMap(actions, (action) => {
        if (action.hidden) {
          return undefined;
        }

        return (
          <li key={action.id} className={showMenu ? "show" : "hide"}>
            <TextVentureAction
              action={action}
              onAction={props.onAction}
              checked={props.currentAction?.id === action.id}
            />
          </li>
        );
      })}

      {props.menuButton ? (
        <Button onClick={toggleMenu}>
          <Icon className={showMenu ? "icon-hide" : "icon-show"}>
            {menu ? "add" : "close"}
          </Icon>
        </Button>
      ) : (
        <></>
      )}
    </ul>
  );
}

interface TextVentureActionProps {
  action: TextAction;
  onAction(action: TextAction): void;
  checked?: boolean;
}

function TextVentureAction(props: TextVentureActionProps) {
  return (
    <Button
      className={["TextVentureAction"].join()}
      checked={props.checked}
      accent
      onClick={() => {
        props.onAction(props.action);
      }}
    >
      {props.action.name}
    </Button>
  );
}
