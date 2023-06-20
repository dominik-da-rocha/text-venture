import React, { useState } from "react";
import { TextCommand, TextLog, TextObject } from "./TextVenture";
import { TextAction } from "./TextAction";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface TextVentureConsoleProps {
  commandLog: TextLog[];
  command: TextCommand;
  title: string;
  menuButton?: boolean;
}

function commandToString(command: TextCommand) {
  return (
    command.action.name + " " + joinObjects(command.objects, command.action)
  );
}

export function TextVentureConsoleCurrentCommand(props: {
  command: TextCommand;
}) {
  return (
    <div className="TextVentureConsoleCurrentCommand">
      {commandToString(props.command)}
    </div>
  );
}

export function TextVentureConsole(props: TextVentureConsoleProps) {
  const [menu, setMenu] = useState(false);
  const showMenu = !props.menuButton || menu;

  function toggleMenu() {
    setMenu(!menu);
  }

  return (
    <>
      <div
        className={["TextVentureConsole", showMenu ? "show" : "hidden"].join(
          " "
        )}
      >
        <h2>{props.title}</h2>
        <div>{commandToString(props.command)}</div>
        {props.commandLog.map((log, idx) => {
          if (log.type === "command") {
            if (
              log.action.id === "talkTo" &&
              log.objects.length > 0 &&
              (log.objects[0].type === "person" ||
                log.objects[0].type === "player")
            ) {
              const person = log.objects[0];
              let responseStyle = [
                "Response",
                log.style ?? "",
                person.type,
                person.id,
              ].join(" ");
              const questionStyle = [
                "Question",
                "player",
                log.talkerId ?? "",
              ].join(" ");
              return (
                <div key={idx} className="Logbook">
                  <div className="Command">{commandToString(log)}:</div>
                  {log.question ? (
                    <div className={questionStyle}>
                      <span className="Talker">{log.talker}:</span>
                      <span className="Talk">{log.question}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className={responseStyle}>
                    <span className="Talker">{log.objects[0].name}:</span>{" "}
                    <span className="Talk">{log.response}</span>
                  </div>
                </div>
              );
            }
            const responseStyle = [
              "Response",
              "player",
              log.talkerId ?? "",
            ].join(" ");
            return (
              <div key={idx} className="Logbook">
                <div className="Command">{commandToString(log)}</div>
                <div className={responseStyle}>
                  {log.talker ? (
                    <span className="Talker">{log.talker}:</span>
                  ) : (
                    <></>
                  )}
                  <span className="Talk">{log.response}</span>
                </div>
              </div>
            );
          } else if (log.type === "dialog") {
            return (
              <div key={idx} className="Logbook">
                <div className={log.isPlayer ? "Command" : "Response"}>
                  {log.speaker}: '{log.text}'
                </div>
              </div>
            );
          } else {
            return undefined;
          }
        })}
      </div>
      {props.menuButton ? (
        <Button className="TextVentureConsoleButton" onClick={toggleMenu}>
          <Icon>{menu ? "menu_book" : "chat"}</Icon>
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}

function joinObjects(objects: TextObject[], action: TextAction) {
  if (objects === undefined) {
    return "";
  } else if (objects.length === 0) {
    return "";
  }
  var result = "";
  objects.forEach((obj, idx) => {
    if (idx === 0) {
      result = obj.name;
    } else if (idx === 1) {
      result += (action.preposition ?? " and ") + obj.name;
    } else {
      result += " and " + obj.name;
    }
  });
  return result;
}
