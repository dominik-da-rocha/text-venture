import React from "react";
import "./TextVentureConsole.css";
import { TextAction } from "./../model/TextAction";
import {
  TextCommand,
  TextLogbook,
  TextObject,
  TextPlayer,
} from "./../model/TextVenture";
import { TextOnOffMode } from "../model/TextSettings";
import { Button } from "../utils/Button";
import { Icon } from "../utils/Icon";

interface TextVentureConsoleProps {
  commandLog: TextLogbook[];
  command: TextCommand;
  title: string;
  player: TextPlayer;
  mode: TextOnOffMode;
  onModeChanged(mode: TextOnOffMode): void;
}

export function TextVentureConsole(props: TextVentureConsoleProps) {
  function toggleMode() {
    props.onModeChanged(props.mode === "on" ? "off" : "on");
  }
  return (
    <div className={["TextVentureConsole", props.mode].join(" ")}>
      <div className="Logbook">
        {props.commandLog.map((log, idx) => {
          return <TextVentureLogbook key={idx} {...log} />;
        })}
      </div>
      <div className="CurrentCommand">
        <Button onClick={toggleMode}>
          <Icon>chat</Icon>
        </Button>
        {commandToString(props.command)}
      </div>
    </div>
  );
}

export function commandToString(command: TextCommand) {
  return (
    command.action.name + " " + joinObjects(command.objects, command.action)
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

export function TextVentureLogbook(log: TextLogbook) {
  if (
    log.actionId === "talkTo" &&
    log.objects.length > 0 &&
    (log.objects[0].type === "person" || log.objects[0].type === "player")
  ) {
    const person = log.objects[0];
    let responseStyle = [
      "Response",
      log.style ?? "",
      person.type,
      person.id,
    ].join(" ");
    const questionStyle = ["Question", "player", log.playerId ?? ""].join(" ");
    return (
      <div className="TextVentureConsoleLog">
        <div className="Command">{log.command}:</div>
        {log.question ? (
          <div className={questionStyle}>
            <span className="Talker">{log.playerName}:</span>
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
  const responseStyle = ["Response", "player", log.playerId ?? ""].join(" ");
  return (
    <div className="TextVentureConsoleLog">
      <div className="Command">{log.command}</div>
      <div className={responseStyle}>
        {log.playerName ? (
          <span className="Talker">{log.playerName}:</span>
        ) : (
          <></>
        )}
        <span className="Talk">{log.response}</span>
      </div>
    </div>
  );
}
