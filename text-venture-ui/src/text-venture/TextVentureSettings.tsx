import React from "react";
import "./TextVentureSettings.css";

import { TextSettings } from "../model/TextSettings";

export interface TextVentureSettingsProps {
  settings: TextSettings;
}

export function TextVentureSettings(props: TextVentureSettingsProps) {
  return <></>;
}

/*

  function toggleConsole() {
    text.consoleMode = text.consoleMode === "on" ? "off" : "on";
    props.onTextChanged(text);
  }
  function toggleInventory() {
    text.inventoryMode = text.inventoryMode === "on" ? "off" : "on";
    props.onTextChanged(text);
  }

  function toggleLight() {
    text.lightMode = text.lightMode === "light" ? "dark" : "light";
    props.onTextChanged(text);
  }

  function toggleDevice() {
    text.deviceMode = text.deviceMode === "mobile" ? "desktop" : "mobile";
    props.onTextChanged(text);
  }

  function evalCommandLoad() {
    loadRef.current?.click();
  }

  function evalCommandSave() {
    if (saveRef.current) {
      saveRef.current.download = text.id + ".json";
      const data = JSON.stringify(text, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      saveRef.current.href = window.URL.createObjectURL(blob);
      saveRef.current.click();
    }
  }

  function evalCommandReset() {
    props.onTextChanged(undefined);
  }



        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={notImplemented}>
            <img className="aboutButton" src="/icons/logo.svg" alt="TxT" />
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>

        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={notImplemented}>
            <Icon>upload_file</Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={notImplemented}>
            <Icon>restart_alt</Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={notImplemented}>
            <Icon>
              {props.deviceMode === "mobile" ? "computer" : "smartphone"}
            </Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={notImplemented}>
            <Icon>
              {props.lightMode === "dark" ? "light_mode" : "dark_mode"}
            </Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button
            onClick={notImplemented}
            checked={props.inventoryMode === "on"}
          >
            <Icon>list</Icon>
          </Button>
        </li>
        <li className={showMenu ? "show" : "hide"}>
          <Button onClick={notImplemented} checked={props.consoleMode === "on"}>
            <Icon>chat</Icon>
          </Button>
        </li>


        */
