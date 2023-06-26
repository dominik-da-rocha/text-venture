import React from "react";
import "./ActionMenu.css";
import { TextAction, TextActionMap } from "../model/TextAction";
import { iMap } from "./Utils";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { OnOffMode } from "../model/TextSettings";
import { CommandMode } from "../model/TextConsole";

interface ActionMenuProps {
  actions: TextActionMap;
  currentAction: TextAction | undefined;
  onAction(action: TextAction): void;
  mode: OnOffMode;
  onModeChanged(mode: OnOffMode): void;
  commandMode: CommandMode;
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
              disabled={props.commandMode !== "action"}
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
  disabled?: boolean;
}

function TextVentureAction(props: TextVentureActionProps) {
  return (
    <Button
      className={["TextVentureAction"].join()}
      checked={props.checked}
      disabled={props.disabled}
      accent
      onClick={() => {
        props.onAction(props.action);
      }}
    >
      {props.action.name}
    </Button>
  );
}
