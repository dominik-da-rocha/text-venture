import React from "react";
import "./ActionMenu.css";
import { TextAction, TextActionMap } from "../model/TextAction";
import { iMap } from "./Utils";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { TextOnOffMode } from "../model/TextSettings";

interface ActionMenuProps {
  actions: TextActionMap;
  currentAction: TextAction | undefined;
  onAction(action: TextAction): void;
  mode: TextOnOffMode;
  onModeChanged(mode: TextOnOffMode): void;
}

export function ActionMenu(props: ActionMenuProps) {
  const actions = props.actions;
  function toggleMenu() {
    props.onModeChanged(props.mode === "on" ? "off" : "on");
  }
  return (
    <div className={["ActionMenu", props.mode].join(" ")}>
      <div className="Actions">
        {iMap(actions, (action) => {
          if (action.hidden) {
            return undefined;
          }
          return (
            <TextVentureAction
              key={action.id}
              action={action}
              onAction={props.onAction}
              checked={props.currentAction?.id === action.id}
            />
          );
        })}
      </div>

      <Button className="ActionButton" onClick={() => toggleMenu()}>
        <Icon>add</Icon>
      </Button>
    </div>
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
