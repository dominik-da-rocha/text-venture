import React, { useRef } from "react";
import "./Button.css";
import { Icon } from "./Icon";

export interface ButtonProps {
  children?: React.ReactNode;
  accent?: boolean;
  onClick?(): void;
  className?: string;
  hidden?: boolean;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
}

export function Button(props: ButtonProps) {
  if (props.hidden) {
    return <></>;
  }
  return (
    <button
      id={props.id}
      className={[
        "Button",
        props.className ?? "",
        props.accent ? "accent" : "",
        props.checked ? "checked" : "",
      ]
        .join(" ")
        .trim()}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export interface ButtonDownloadProps extends ButtonProps {
  data: any;
  filename: string;
}

export function ButtonDownload(props: ButtonDownloadProps) {
  const saveRef = useRef<HTMLAnchorElement>(null);
  function handleDownload() {
    if (saveRef.current) {
      if (props.data) {
        saveRef.current.href =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(props.data, null, 2));
        saveRef.current.download = props.filename;
        saveRef.current.click();
        if (props.onClick) {
          props.onClick();
        }
      }
    }
  }

  return (
    <Button onClick={() => handleDownload()}>
      {props.children ?? <Icon>download</Icon>}
      <a style={{ display: "none" }} href={"?"} ref={saveRef}>
        save-text
      </a>
    </Button>
  );
}

export interface UploadEventArgs {
  data: any;
  filename: string;
}

export interface ButtonUploadProps extends ButtonProps {
  onChange: (event: UploadEventArgs) => void;
  onError: (err: any) => void;
}

export function ButtonUpload(props: ButtonUploadProps) {
  const loadRef = useRef<HTMLInputElement>(null);

  function handleLoadChange(event: any) {
    if (props.onClick) {
      props.onClick();
    }
    const file = event?.target?.files?.item(0) as File | null | undefined;
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function (event: ProgressEvent<FileReader>) {
        const data = event.target?.result;
        if (typeof data === "string") {
          try {
            props.onChange({
              filename: file.name,
              data: JSON.parse(data),
            });
          } catch (err) {
            props.onError(err);
          }
        }
      };
      reader.readAsText(file);
    }
  }
  return (
    <Button {...props} onClick={() => loadRef.current?.click()}>
      {props.children ?? <Icon>upload</Icon>}
      <input
        style={{ display: "none" }}
        type="file"
        ref={loadRef}
        onChange={handleLoadChange}
      />
    </Button>
  );
}
