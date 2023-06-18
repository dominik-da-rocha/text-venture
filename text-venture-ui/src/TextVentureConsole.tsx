import React from "react";
import { TextCommand, TextLog, TextObject, TextPlayer } from "./TextVenture";
import { TextAction } from "./TextAction";

interface TextVentureConsoleProps {
  commandLog: TextLog[];
  command: TextCommand;
}

function commandToString(command: TextCommand) {
  return (
    command.action.name + " " + joinObjects(command.objects, command.action)
  );
}

export function TextVentureConsole(props: TextVentureConsoleProps) {
  return (
    <footer>
      <h3>Console</h3>
      <div>{commandToString(props.command)}</div>
      {props.commandLog.map((log, idx) => {
        if (log.type === "command") {
          let responseStyle = "Response " + (log.style ?? "");
          if (
            log.action.id === "talkTo" &&
            log.objects.length > 0 &&
            (log.objects[0].type === "person" ||
              log.objects[0].type === "player")
          ) {
            const questionStyle = [
              "Question",
              "player",
              log.talkerId ?? "",
            ].join(" ");
            const person = log.objects[0];
            responseStyle = [responseStyle, person.type, person.id].join(" ");
            return (
              <div key={idx} className="Logbook">
                <div className="Command">{commandToString(log)}</div>
                {log.question ? (
                  <div className={questionStyle}>
                    {log.talker}: '{log.question}'
                  </div>
                ) : (
                  <></>
                )}
                <div className={responseStyle}>
                  {log.objects[0].name}: '{log.response}'
                </div>
              </div>
            );
          }
          return (
            <div key={idx} className="Logbook">
              <div className="Command">{commandToString(log)}</div>
              <div className={responseStyle}>{log.response}</div>
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
    </footer>
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
