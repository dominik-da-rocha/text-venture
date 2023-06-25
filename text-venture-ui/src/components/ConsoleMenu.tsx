import React from "react";
import "./ConsoleMenu.css";
import { TextAction } from "../model/TextAction";
import { TextCommand, TextLogbook } from "../model/TextVenture";
import { OnOffMode } from "../model/TextSettings";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { TextPlayer, TextObject } from "../model/TextObject";

interface ConsoleMenuProps {
  commandLog: TextLogbook[];
  command: TextCommand;
  title: string;
  player: TextPlayer;
  mode: OnOffMode;
  onModeChanged(mode: OnOffMode): void;
}

export function ConsoleMenu(props: ConsoleMenuProps) {
  function toggleMode() {
    props.onModeChanged(props.mode === "on" ? "off" : "on");
  }
  return (
    <div className={["ConsoleMenu", props.mode].join(" ")}>
      <div className="Logbook">
        {props.commandLog.map((log, idx) => {
          return <TextVentureLogbook key={idx} {...log} />;
        })}
      </div>
      <div className="CommandMenu">
        <Button onClick={toggleMode}>
          <Icon>chat</Icon>
        </Button>
        <div className="CurrentCommand">
          {props.player.shortName}
          {": "}
          {commandToString(props.command)}
        </div>
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
    log.actionId === "talk-to" &&
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
      <div className="ConsoleMenuLog">
        <div className="Command">
          {log.playerName}: {log.command}:
        </div>
        {log.question ? (
          <div className={questionStyle}>
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
    <div className="ConsoleMenuLog">
      <div className="Command">
        {log.playerName}: {log.command}
      </div>
      <div className={responseStyle}>
        <span className="Talk">{log.response}</span>
      </div>
    </div>
  );
}
