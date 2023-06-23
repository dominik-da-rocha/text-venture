import React, { useEffect, useState } from "react";
import "./Settings.css";
import {
  TextLightMode,
  TextMode,
  TextSettings,
  TextSize,
} from "../model/TextSettings";
import { Button } from "./Button";
import { Icon } from "./Icon";

export interface SettingsProps {
  settings: TextSettings;
  onChange(settings: TextSettings): void;
}

export function Settings(props: SettingsProps) {
  const [counter, setCounter] = useState(0);
  const [localStorageKeys, setLocalStorageKeys] = useState<string[]>([]);

  function update() {
    setCounter(counter + 1);
  }

  useEffect(() => {
    const localStorageKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key) {
        localStorageKeys.push(key);
      }
    }
    setLocalStorageKeys(localStorageKeys);
  }, [counter]);

  return (
    <div className="Settings">
      <h1>Settings</h1>
      <div className="Subtitle"></div>
      <ul>
        <li>
          <h3>Appearance</h3>
        </li>
        <li>
          <label>Light Mode</label>
          <select
            value={props.settings.lightMode}
            onChange={(e) => {
              const copy = { ...props.settings };
              copy.lightMode = e.target.value as TextLightMode;
              props.onChange(copy);
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </li>

        <li>
          <label>Font Style</label>
          <select
            value={props.settings.textMode}
            onChange={(e) => {
              const copy = { ...props.settings };
              copy.textMode = e.target.value as TextMode;
              props.onChange(copy);
            }}
          >
            <option value={"serif"}>Serif</option>
            <option value={"sans-serif"}>Sans Serif</option>
            <option value={"monospace"}>Monospace</option>
            <option value={"cursive"}>Cursive</option>
          </select>
        </li>

        <li>
          <label>Font Size</label>
          <select
            value={props.settings.textSize}
            onChange={(e) => {
              const copy = { ...props.settings };
              copy.textSize = e.target.value as TextSize;
              props.onChange(copy);
            }}
          >
            <option value={"small"}>Small</option>
            <option value={"medium"}>Medium</option>
            <option value={"large"}>Large</option>
          </select>
        </li>
        {localStorageKeys.length > 0 ? (
          <>
            <li>
              <h3>Memory</h3>
            </li>
            <li>
              <div className="warn alert-box">
                <h3>Alert</h3>
                <p>Deleting the local storage will terminate all your data!</p>
                <p>Please make a backup before you proceed!</p>
              </div>
            </li>
          </>
        ) : (
          <></>
        )}
        {localStorageKeys.map((key) => {
          return (
            <li key={key}>
              <label>{key}</label>
              <div>
                <Button onClick={() => {}}>
                  <Icon>upload</Icon>
                </Button>
                <Button onClick={() => {}}>
                  <Icon>download</Icon>
                </Button>
                <Button
                  className="warn"
                  onClick={() => {
                    localStorage.removeItem(key);
                    update();
                  }}
                >
                  <Icon>delete</Icon>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
