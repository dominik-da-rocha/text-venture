import React, { useRef } from "react";
import "./Settings.css";
import {
  TextLightMode,
  TextMode,
  TextSettings,
  TextSize,
} from "../model/TextSettings";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { useShowPopup } from "./PopupAlert";

export interface SettingsDataItem {
  id: string;
  name: string;
  data: any;
  onChange(data: any): void;
}

export interface SettingsProps {
  settings: TextSettings;
  onChange(settings: TextSettings): void;
  dataItems: SettingsDataItem[];
}

export function Settings(props: SettingsProps) {
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
        {props.dataItems.length > 0 ? (
          <>
            <li>
              <h3>Memory</h3>
            </li>
            <li className="center">
              <div className="warn alert-box">
                <h3>Attention!</h3>
                <p>Resetting the local storage will terminate all your data!</p>
                <p>Also uploading a file may corrupt your game state!</p>
                <p>Please make a backup before you proceed!</p>
              </div>
            </li>
          </>
        ) : (
          <></>
        )}
        {props.dataItems.map((dataItem) => {
          return (
            <li key={dataItem.id}>
              <label>{dataItem.name}</label>
              <div>
                <ButtonStorageDownload {...dataItem} />
                <ButtonStorageUpload {...dataItem} />
                <ButtonStorageClear {...dataItem} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ButtonStorageUpload(props: SettingsDataItem) {
  const loadRef = useRef<HTMLInputElement>(null);
  const showPopup = useShowPopup();

  function handleLoadChange(event: any) {
    const file = event?.target?.files?.item(0) as File | null | undefined;
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function (event: ProgressEvent<FileReader>) {
        const data = event.target?.result;
        if (typeof data === "string") {
          try {
            props.onChange(JSON.parse(data));
          } catch (err) {
            let a = err as any;
            showPopup(() => (
              <div>
                <h3>Error</h3>
                <div>{a.message}</div>
              </div>
            ));
          }
        }
      };
      reader.readAsText(file);
    }
  }
  return (
    <Button className="warn" onClick={() => loadRef.current?.click()}>
      <Icon>upload</Icon>
      <input
        style={{ display: "none" }}
        type="file"
        ref={loadRef}
        onChange={handleLoadChange}
      />
    </Button>
  );
}

function ButtonStorageDownload(props: SettingsDataItem) {
  const saveRef = useRef<HTMLAnchorElement>(null);
  function handleDownload() {
    if (saveRef.current) {
      if (props.data) {
        saveRef.current.href =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(props.data, null, 2));
        saveRef.current.download = props.id + ".json";
        saveRef.current.click();
      }
    }
  }

  return (
    <Button onClick={() => handleDownload()}>
      <Icon>download</Icon>
      <a style={{ display: "none" }} href={"?"} ref={saveRef}>
        save-text
      </a>
    </Button>
  );
}

function ButtonStorageClear(props: SettingsDataItem) {
  const showPopup = useShowPopup();
  return (
    <Button
      className="warn"
      onClick={() => {
        props.onChange(undefined);
        showPopup(() => (
          <div>
            <h4>Info</h4>
            <div>Rested {props.name}</div>
          </div>
        ));
      }}
    >
      <Icon>delete</Icon>
    </Button>
  );
}
