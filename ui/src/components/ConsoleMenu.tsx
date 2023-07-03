import React from "react";
import "./ConsoleMenu.css";
import { TextAction } from "../model/TextAction";
import { OnOffMode } from "../model/TextSettings";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { TextObject, TextPlayer } from "../model/TextObject";
import { DialogSelect } from "./DialogSelect";
import { TextCommand, TextLogbook } from "../model/TextConsole";
import { TextVenture } from "../model/TextVenture";

interface ConsoleMenuProps {
  command: TextCommand;
  mode: OnOffMode;
  onModeChanged(mode: OnOffMode): void;
  text: TextVenture;
  onTextChange(text: TextVenture): void;
  appendLogbook(logbookEntry: TextLogbook, hidePopup?: boolean): void;
  onScrollToBottom(): void;
  onPlaySound(url: string): void;
}

export function ConsoleMenu(props: ConsoleMenuProps) {
  const text = props.text;
  const player = text.players[text.currentPlayerId] as TextPlayer;

  function toggleMode() {
    props.onModeChanged(props.mode === "on" ? "off" : "on");
  }

  return (
    <div className={["ConsoleMenu", props.mode].join(" ")}>
      <div className="Logbook">
        {text.logbook.map((log, idx) => {
          return <TextVentureLogbook key={idx} {...log} />;
        })}
      </div>
      <div className="CommandMenu">
        <Button onClick={toggleMode}>
          <Icon>chat</Icon>
        </Button>
        <div className="CurrentCommand">
          {text.commandMode === "action" ? (
            <span>
              {player.shortName}
              {": "}
              {commandToString(props.command)}
            </span>
          ) : (
            <></>
          )}
          {text.commandMode === "conversation" ? (
            <DialogSelect
              text={text}
              command={props.command}
              personTalkedTo={props.command.objects[0]}
              onTextChange={props.onTextChange}
              appendLogbook={props.appendLogbook}
              onScrollToBottom={props.onScrollToBottom}
              onPlaySound={props.onPlaySound}
            />
          ) : (
            <></>
          )}
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
  const personTalkedTo = log.objects[log.personTalkedToIndex ?? 0];
  if (
    log.objects.length > 0 &&
    personTalkedTo &&
    (personTalkedTo.type === "person" || personTalkedTo.type === "player")
  ) {
    let responseStyle = [
      "Response",
      log.style ?? "",
      personTalkedTo.type,
      personTalkedTo.id,
    ].join(" ");
    const questionStyle = ["Question", "player", log.playerId ?? ""].join(" ");
    return (
      <div className="ConsoleMenuLog">
        <div className="Command">
          {log.playerName}: {log.command}
        </div>
        {log.question ? (
          <div className={questionStyle}>
            <span className="Talk">{log.question}</span>
          </div>
        ) : (
          <></>
        )}
        {log.response ? (
          <div className={responseStyle}>
            <span className="Talker">{personTalkedTo.name}:</span>{" "}
            <span className="Talk">{log.response}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  const responseStyle = [
    "Response",
    "player",
    log.playerId ?? "",
    log.style ?? "",
  ].join(" ");
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
