import React from "react";
import { TextAction, TextActionGameControl, TextActionMap } from "./TextAction";
import { iMap } from "./Util";

interface TextVentureActionBarProps {
  actions: TextActionMap;
  onAction(action: TextAction): void;
}

export function TextVentureActionBar(props: TextVentureActionBarProps) {
  const actions = props.actions;
  return (
    <aside className="Actions">
      <h3>Actions</h3>
      <ul>
        {iMap(actions, (action) => (
          <TextVentureAction
            key={action.id}
            action={action}
            onAction={props.onAction}
          />
        ))}
      </ul>

      <h3>Game</h3>

      <ul>
        {TextActionGameControl.map((action) => (
          <TextVentureAction
            key={action.id}
            action={action}
            onAction={props.onAction}
          />
        ))}
      </ul>
    </aside>
  );
}

interface TextVentureActionProps {
  action: TextAction;
  onAction(action: TextAction): void;
}

function TextVentureAction(props: TextVentureActionProps) {
  if (props.action.disabled) {
    return <></>;
  }
  return (
    <a
      href="?"
      onClick={(event) => {
        event.preventDefault();
        props.onAction(props.action);
      }}
    >
      {props.action.name}
    </a>
  );
}
