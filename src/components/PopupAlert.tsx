import React, { useEffect, useState, createContext, useContext } from "react";
import "./PopupAlert.css";

export interface PopupAlertValues {
  showPopup(content: () => React.ReactNode, time: number): void;
}

const PopupAlertDefault: PopupAlertValues = {
  showPopup: function (content: () => React.ReactNode, time: number): void {},
};

export const PopupAlertContext = createContext<PopupAlertValues>(
  PopupAlertDefault
);

export function useShowPopup() {
  return useContext(PopupAlertContext).showPopup;
}

export interface PopupAlertProviderProps {
  children: React.ReactNode;
}

export interface Alert {
  id: number;
  content: () => React.ReactNode;
  style?: string;
  time: number;
}

let alertId = 0;

export function PopupAlertProvider(props: PopupAlertProviderProps) {
  const [items, setItems] = useState<Alert[]>([]);
  function handleClose(item: Alert, idx: number) {
    item.style = "close";
    items[idx] = item;
    setItems([...items]);
  }

  function showPopup(content: () => React.ReactNode, time: number) {
    setItems([
      {
        id: ++alertId,
        content: content,
        time: time,
      },
      ...items,
    ]);
  }

  return (
    <PopupAlertContext.Provider value={{ showPopup: showPopup }}>
      {props.children}
      <div className="PopupAlertPanel">
        {items.map((item, idx) => {
          return (
            <PopupAlert
              key={item.id}
              className={item.style}
              time={item.time}
              onClose={() => handleClose(item, idx)}
            >
              {item.content()}
            </PopupAlert>
          );
        })}
      </div>
    </PopupAlertContext.Provider>
  );
}

export interface PopupAlertProps {
  children: React.ReactNode;
  className?: string;
  onClose(): void;
  time: number;
}

export function PopupAlert(props: PopupAlertProps) {
  const [state, setState] = useState("close");
  const time = Math.max(props.time, 5000);

  useEffect(() => {
    console.log("closing popup in " + time / 1000.0 + " s");
    let timeout1 = setTimeout(() => {
      setState("open");
    }, 100);

    let timeout2 = setTimeout(() => {
      setState("close");
    }, time);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [time]);

  return (
    <div className={["PopupAlert", props.className, state].join(" ")}>
      <button className="Button" onClick={props.onClose}>
        ⨯
      </button>
      <div className="PopAlertMessage">{props.children}</div>
    </div>
  );
}
