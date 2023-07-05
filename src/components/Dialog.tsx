import React from "react";
import "./Dialog.css";
import { Button } from "./Button";
import { Icon } from "./Icon";

export interface DialogProps {
  open?: boolean;
  title: React.ReactNode;
  children?: React.ReactNode;
  onClose?(): void;
}

export function Dialog(props: DialogProps) {
  if (!Boolean(props.open)) {
    return <></>;
  }
  return (
    <div className="Dialog">
      <div className="Panel">
        <div className="Header">
          <div>{props.title}</div>
          {props.onClose ? (
            <Button onClick={props.onClose}>
              <Icon>close</Icon>
            </Button>
          ) : (
            <Button onClick={() => {}}>
              <></>
            </Button>
          )}
        </div>
        <div className="Content">{props.children}</div>
      </div>
    </div>
  );
}
