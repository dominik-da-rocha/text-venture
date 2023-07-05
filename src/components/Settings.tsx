import React, { useRef } from "react";
import "./Settings.css";
import {
  LightMode,
  LightModes,
  FontStyle,
  TextSettings,
  FontSize,
  FontSizes,
  FontStyles,
  StorageMode,
  StorageModes,
  ReadingSpeeds,
  ReadingSpeed,
} from "../model/TextSettings";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { useShowPopup } from "./PopupAlert";
import { toFirstLetterUppercase } from "./Utils";

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
              copy.lightMode = e.target.value as LightMode;
              props.onChange(copy);
            }}
          >
            {LightModes.map((mode) => {
              return (
                <option value={mode} key={mode}>
                  {toFirstLetterUppercase(mode)}
                </option>
              );
            })}
          </select>
        </li>

        <li>
          <label>Font Style</label>
          <select
            value={props.settings.fontStyle}
            onChange={(e) => {
              const copy = { ...props.settings };
              copy.fontStyle = e.target.value as FontStyle;
              props.onChange(copy);
            }}
          >
            {FontStyles.map((style) => {
              return (
                <option value={style} key={style}>
                  {toFirstLetterUppercase(style)}
                </option>
              );
            })}
          </select>
        </li>

        <li>
          <label>Font Size</label>
          <select
            value={props.settings.textSize}
            onChange={(e) => {
              const copy = { ...props.settings };
              copy.textSize = e.target.value as FontSize;
              props.onChange(copy);
            }}
          >
            {FontSizes.map((size) => {
              return (
                <option value={size} key={size}>
                  {toFirstLetterUppercase(size)}
                </option>
              );
            })}
          </select>
        </li>

        <li>
          <label>Reading Speed</label>
          <select
            value={props.settings.readingSpeed ?? "medium"}
            onChange={(e) => {
              const copy = { ...props.settings };
              copy.readingSpeed = e.target.value as ReadingSpeed;
              props.onChange(copy);
            }}
          >
            {ReadingSpeeds.map((speed) => {
              return (
                <option value={speed} key={speed}>
                  {toFirstLetterUppercase(speed)}
                </option>
              );
            })}
          </select>
        </li>
        {props.dataItems.length > 0 ? (
          <>
            <li>
              <h3>Storage</h3>
            </li>
            <li>
              <div className="center">
                <div className="warn alert-box ">
                  <h3>Attention!</h3>
                  <p>
                    Changing the storage mode might terminate all your data!
                  </p>
                  <p>Also uploading a file may corrupt your game state!</p>
                  <p>Please make a backup before you proceed!</p>
                </div>
              </div>
            </li>
            <li>
              <label>Storage Mode</label>
              <select
                value={props.settings.storageMode}
                onChange={(e) => {
                  const copy = { ...props.settings };
                  copy.storageMode = e.target.value as StorageMode;
                  props.onChange(copy);
                }}
              >
                {StorageModes.map((style) => {
                  return (
                    <option value={style} key={style}>
                      {toFirstLetterUppercase(style)}
                    </option>
                  );
                })}
              </select>
            </li>
            {props.settings.storageMode === "local" ? (
              <>
                <div>Local storage is stored until you delete it.</div>
              </>
            ) : (
              <></>
            )}
            {props.settings.storageMode === "session" ? (
              <div>
                Session Storage is stored until you close the browser tab
              </div>
            ) : (
              <></>
            )}
            {props.settings.storageMode === "memory" ? (
              <div>Memory Storage is stored until the tab reloads</div>
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
          </>
        ) : (
          <></>
        )}
      </ul>
      <footer>v{props.settings.version}</footer>
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
            showPopup(
              () => (
                <div>
                  <h3>Error</h3>
                  <div>{a.message}</div>
                </div>
              ),
              10 * 1000
            );
          }
        }
      };
      reader.readAsText(file);
    }
  }
  return (
    <Button className="red-alert" onClick={() => loadRef.current?.click()}>
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
      className="red-alert"
      onClick={() => {
        props.onChange(undefined);
        showPopup(
          () => (
            <div>
              <h4>Info</h4>
              <div>Rested {props.name}</div>
            </div>
          ),
          10 * 1000
        );
      }}
    >
      <Icon>delete</Icon>
    </Button>
  );
}
