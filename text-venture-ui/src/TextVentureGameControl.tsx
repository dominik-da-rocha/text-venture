import React, { useState } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import {
  TextAction,
  TextActionAbout,
  TextActionDevice,
  TextActionLight,
  TextActionLoad,
  TextActionReset,
  TextActionSave,
} from "./TextAction";
import { TextDeviceMode, TextLightMode } from "./TextVenture";

export interface TextActionGameControlProps {
  onAction(action: TextAction): void;
  lightMode: TextLightMode;
  deviceMode: TextDeviceMode;
  menuButton?: boolean;
}

export function TextVentureGameControl(props: TextActionGameControlProps) {
  const [menu, setMenu] = useState(false);
  function toggleMenu() {
    setMenu(!menu);
  }
  const menuButton = Boolean(props.menuButton);
  const showMenu = menu || !menuButton;
  return (
    <div className="TextVentureGameControl">
      <ul>
        {menuButton ? (
          <Button onClick={() => toggleMenu()}>
            <Icon className={showMenu ? "icon-show" : "icon-hide"}>menu</Icon>
          </Button>
        ) : (
          <></>
        )}
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionAbout)}>
            <img src="/icons/logo.svg" alt="TxT" />
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
          <Button onClick={() => props.onAction(TextActionLight)}>
            <Icon>
              {props.lightMode === "dark" ? "light_mode" : "dark_mode"}
            </Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={() => props.onAction(TextActionDevice)}>
            <Icon>
              {props.deviceMode === "mobile" ? "computer" : "smartphone"}
            </Icon>
          </Button>
        </li>
        <li>
          <Button onClick={() => console.warn("not implemented")} hidden>
            <Icon>settings</Icon>
          </Button>
        </li>
      </ul>
    </div>
  );
}
