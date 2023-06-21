import React, { useState } from "react";
import {
  TextAction,
  TextActionAbout,
  TextActionConsole,
  TextActionDevice,
  TextActionInventory,
  TextActionLight,
  TextActionLoad,
  TextActionMap,
  TextActionReset,
  TextActionSave,
} from "./TextAction";
import { iMap } from "./Util";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { TextDeviceMode, TextLightMode, TextOnOffMode } from "./TextVenture";

interface TextVentureActionsProps {
  actions: TextActionMap;
  currentAction: TextAction | undefined;
  onAction(action: TextAction): void;
  menuButton?: boolean;
  lightMode: TextLightMode;
  deviceMode: TextDeviceMode;
  consoleMode: TextOnOffMode;
  inventoryMode: TextOnOffMode;
}

export function TextVentureActions(props: TextVentureActionsProps) {
  const [menu, setMenu] = useState(false);
  const actions = props.actions;
  const showMenu = !props.menuButton || menu;
  function toggleMenu() {
    setMenu(!menu);
  }
  return (
    <div className={["TextVentureActions"].join()}>
      <ul>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionAbout)}>
            <img className="aboutButton" src="/icons/logo.svg" alt="TxT" />
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionSave)}>
            <Icon>save</Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionLoad)}>
            <Icon>upload_file</Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionReset)}>
            <Icon>restart_alt</Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionDevice)}>
            <Icon>
              {props.deviceMode === "mobile" ? "computer" : "smartphone"}
            </Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionLight)}>
            <Icon>
              {props.lightMode === "dark" ? "light_mode" : "dark_mode"}
            </Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button
            onClick={() => props.onAction(TextActionInventory)}
            checked={props.inventoryMode === "on"}
          >
            <Icon>list</Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button
            onClick={() => props.onAction(TextActionConsole)}
            checked={props.consoleMode === "on"}
          >
            <Icon>chat</Icon>
          </Button>
        </li>
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
