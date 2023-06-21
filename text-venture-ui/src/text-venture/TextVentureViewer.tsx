import React, { useEffect, useRef, useState } from "react";
import "./TextVentureViewerDesktop.css";
import "./TextVentureViewerMobile.css";
import "./TextVentureViewer.css";

import { TextVentureScene } from "./TextVentureScene";
import { TextVentureHeader } from "./TextVentureHeader";
import { TextVentureActions } from "./TextVentureActions";
import {
  TextVentureConsole,
  TextVentureConsoleLog,
} from "./TextVentureConsole";
import { TextVentureInventory } from "./TextVentureInventory";
import { TextActionNone, TextAction } from "./../model/TextAction";
import {
  getByIdOrFirst,
  matchesAny,
  matchesOneOf,
  randomItem,
} from "./../utils/Utils";
import {
  TextCommand,
  TextDescription,
  TextObject,
  TextPlayer,
  TextVenture,
} from "./../model/TextVenture";
import {
  TextInteraction,
  TextObjectPattern,
  TextActionPattern,
} from "./../model/TextInteraction";
import { TextScene } from "./../model/TextScene";
import { PopupAlertProvider, useShowPopup } from "../utils/PopupAlert";

interface TextVentureViewerProps {
  text: TextVenture;
  onTextChanged(text: TextVenture | undefined): void;
}

export function TextVentureViewer(props: TextVentureViewerProps) {
  const className = [
    "TextVenture",
    props.text.deviceMode,
    props.text.lightMode,
    props.text.textMode,
  ].join(" ");
  return (
    <div className={className}>
      <PopupAlertProvider>
        <TextVentureViewerWrapper {...props}></TextVentureViewerWrapper>
      </PopupAlertProvider>
    </div>
  );
}

export function TextVentureViewerWrapper(props: TextVentureViewerProps) {
  const text = props.text;
  const [currentCommand, setCurrentCommand] = useState<TextCommand>({
    type: "command",
    action: TextActionNone,
    objects: [],
    response: "",
  });
  const [blur, setBlur] = useState<"no-blur" | "blur">(() => "blur");
  const showPopup = useShowPopup();

  const saveRef = useRef<HTMLAnchorElement>(null);
  const loadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (blur === "blur") {
      var tout = setTimeout(() => {
        setBlur("no-blur");
      }, 2000);
    }
    return () => {
      clearTimeout(tout);
    };
  }, [blur]);

  const scene = getByIdOrFirst(text.scenes, text.currentSceneId);
  if (scene === undefined) {
    return <div>No scene selected</div>;
  }
  const player = getByIdOrFirst(text.players, text.currentPlayerId);
  if (player === undefined) {
    return <div>No player selected</div>;
  }

  function appendLog(command: TextCommand) {
    const newLog = [command, ...text.commandLog];
    while (newLog.length > text.commandLogMaxLength) {
      newLog.splice(newLog.length - 1, 1);
    }
    text.commandLog = newLog;
    props.onTextChanged(text);
    showPopup(() => <TextVentureConsoleLog {...command} />);
  }

  function updateCurrentCommand(
    action: TextAction | undefined,
    object: TextObject | undefined
  ) {
    let newCommand = { ...currentCommand };
    let update = false;
    if (action && newCommand.action.id !== action.id) {
      newCommand.action = action;
      newCommand.objects = [];
      update = true;
    }

    if (object) {
      const listed = newCommand.objects.find((obj) => obj.id === object.id);
      if (listed === undefined) {
        newCommand.objects.push(object);
        update = true;
        if (newCommand.action.id === "none" && text.actions["lookAt"]) {
          newCommand.action = text.actions["lookAt"];
        }
      }
    }

    if (update) {
      if (runCommand(newCommand)) {
        setCurrentCommand({
          type: "command",
          action: TextActionNone,
          objects: [],
          response: "",
        });
      } else {
        setCurrentCommand(newCommand);
      }
    }
  }

  function runCommand(command: TextCommand): boolean {
    if (command.objects.length >= command.action.minCount) {
      let interaction: TextInteraction | undefined = undefined;
      command.objects.find((o) => {
        interaction = ifMatches(command, o?.interactions);
        if (interaction) {
          console.log("found interaction on " + o.id + ": " + interaction.id);
        }
        return interaction;
      });

      if (interaction) {
        return evalCommand(command, interaction);
      }

      interaction = ifMatches(command, scene?.interactions);
      if (interaction) {
        console.log(
          "found interaction on " + scene?.id + ": " + interaction.id
        );
        return evalCommand(command, interaction);
      }

      interaction = ifMatches(command, player?.interactions);
      if (interaction) {
        console.log(
          "found interaction on " + player?.id + ": " + interaction.id
        );
        return evalCommand(command, interaction);
      }

      interaction = ifMatches(command, text?.interactions);
      if (interaction) {
        console.log("found interaction on " + text?.id + ": " + interaction.id);
        return evalCommand(command, interaction);
      }
    }

    return false;
  }

  function evalCommand(
    command: TextCommand,
    interaction: TextInteraction
  ): boolean {
    command.style = interaction.style;
    switch (interaction.type) {
      case "random":
        command.talker = player?.name;
        command.talkerId = player?.id;
        command.response = randomItem(interaction.responses);
        appendLog(command);
        return true;
      case "simple":
        command.talker = player?.name;
        command.talkerId = player?.id;
        command.response = interaction.response;
        appendLog(command);
        return true;
      case "lookAt":
        command.talker = player?.name;
        command.talkerId = player?.id;
        command.response =
          getDescription(command.objects[0].description) ??
          randomItem(interaction.responses);
        appendLog(command);
        selectPlayer(command.objects[0]);
        return true;
      case "load":
        evalCommandLoad();
        return true;
      case "save":
        evalCommandSave();
        return true;
      case "reset":
        evalCommandReset();
        return true;
      case "give-item-to":
        command.talker = player?.name;
        command.talkerId = player?.id;
        command.response = randomItem(interaction.responses);
        appendLog(command);
        giveFromItemTo(player, command.objects[0], command.objects[1]);
        return true;
      case "walk-to":
        command.response = randomItem(interaction.responses);
        appendLog(command);
        selectScene(command.objects[0]);
        return true;
      case "pick-up":
        command.talker = player?.name;
        command.talkerId = player?.id;
        command.response = randomItem(interaction.responses);
        appendLog(command);
        removeObjectFromScenesDescription(command.objects[0]);
        giveFromItemTo(scene, command.objects[0], player);
        return true;
      case "random-talk-to":
        command.talker = player?.name;
        command.talkerId = player?.id;
        command.question = randomItem(interaction.questions);
        command.response = randomItem(interaction.responses);
        appendLog(command);
        return true;
      case "light":
        toggleLight();
        return true;
      case "device":
        toggleDevice();
        return true;
      case "console":
        toggleConsole();
        return true;
      case "inventory":
        toggleInventory();
        return true;
    }

    command.response = "Note from the programmer: That should not happen!";
    appendLog(command);

    return true;
  }

  function toggleConsole() {
    text.consoleMode = text.consoleMode === "on" ? "off" : "on";
    props.onTextChanged(text);
  }
  function toggleInventory() {
    text.inventoryMode = text.inventoryMode === "on" ? "off" : "on";
    props.onTextChanged(text);
  }

  function toggleLight() {
    text.lightMode = text.lightMode === "light" ? "dark" : "light";
    props.onTextChanged(text);
  }

  function toggleDevice() {
    text.deviceMode = text.deviceMode === "mobile" ? "desktop" : "mobile";
    props.onTextChanged(text);
  }

  function evalCommandLoad() {
    loadRef.current?.click();
  }

  function evalCommandSave() {
    if (saveRef.current) {
      saveRef.current.download = text.id + ".json";
      const data = JSON.stringify(text, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      saveRef.current.href = window.URL.createObjectURL(blob);
      saveRef.current.click();
    }
  }

  function evalCommandReset() {
    props.onTextChanged(undefined);
  }

  function handleLoadChange(event: any) {
    const file = event?.target?.files?.item(0) as File | null | undefined;
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function (event: ProgressEvent<FileReader>) {
        const data = event.target?.result;
        if (typeof data === "string") {
          const json = JSON.parse(data) as TextVenture;
          props.onTextChanged(json);
        }
      };
      reader.readAsText(file);
    }
  }

  function handleAction(action: TextAction) {
    updateCurrentCommand(action, undefined);
  }

  function handleRenderToken(type: string, id: string): TextObject | undefined {
    if (scene) {
      switch (type) {
        case "thing":
          return scene.things.find((t) => t.id === id);
        case "player":
          return text.players[id];
        case "person":
          return scene.persons.find((p) => p.id === id);
        case "scene":
          return text.scenes[id];
      }
    }
    return undefined;
  }

  function handleObjectClick(object: TextObject) {
    const listed = currentCommand.objects.find((obj) => obj.id === object.id);
    if (listed === undefined) {
      updateCurrentCommand(currentCommand.action, object);
    }
  }

  function handleNextDialog(dialog: undefined) {}

  function ifMatches(
    command: TextCommand,
    interactions: TextInteraction[] | undefined
  ): TextInteraction | undefined {
    if (interactions === undefined) {
      return undefined;
    }
    const interaction = interactions.find((i) => {
      logInteraction("---------------------");
      logInteraction("checking interaction: " + i.id);
      const actionMatch = doesActionMatch(command.action, i.matchesAction);
      if (actionMatch) {
        logInteraction("action matched ", i.matchesAction);
        const objectsMatch = doesObjectsMatch(
          command.objects,
          i.matchesObjects
        );
        if (objectsMatch) {
          logInteraction("objects matched ", i.matchesObjects);
        }
        return actionMatch && objectsMatch;
      }
      return false;
    });

    return interaction;
  }

  function doesObjectsMatch(
    objects: TextObject[],
    patterns: TextObjectPattern[] | "any" | undefined
  ): boolean {
    if (patterns === "any") {
      return true;
    }
    if (patterns) {
      if (patterns.length !== objects.length) {
        return false;
      }
      logInteraction("objects length is okay");
      const matches = objects.map((obj, idx) => {
        const pattern = patterns[idx];
        if (matchesAny(pattern?.any)) {
          logInteraction("objects any matches");
          return true;
        }
        if (matchesOneOf(pattern.oneIdOf, obj.id)) {
          logInteraction("objects id matches");
          return true;
        }
        if (pattern.isPlayer && obj.id === player?.id) {
          logInteraction("objects is player matches");
          return true;
        }
        if (matchesOneOf(pattern.oneTypeOf, obj.type)) {
          logInteraction("objects type matches");
          return true;
        }
        if (
          pattern.playerHasIt &&
          player?.things.find((item) => item.id === obj.id) !== undefined
        ) {
          logInteraction("objects player has it matches");
          return true;
        }
        return false;
      });

      let matchAll = true;
      matches.forEach((match) => {
        matchAll = matchAll && match;
      });
      return matchAll;
    }
    return false;
  }

  function doesActionMatch(
    action: TextAction,
    pattern: TextActionPattern | undefined
  ) {
    if (pattern) {
      if (matchesAny(pattern?.any)) {
        return true;
      }
      if (matchesOneOf(pattern?.oneOf, action.id)) {
        return true;
      }
    }
    return false;
  }

  function getDescription(text: TextDescription) {
    if (Array.isArray(text) && text.length > 0) {
      return text[0];
    } else if (typeof text === "string") {
      return text;
    }
    return undefined;
  }

  function selectPlayer(nextPlayer: TextObject) {
    if (
      nextPlayer.type === "player" &&
      nextPlayer.id !== text.currentPlayerId
    ) {
      text.currentPlayerId = nextPlayer?.id;
      props.onTextChanged(text);
    }
  }

  function selectScene(scene: TextObject) {
    if (scene.type === "scene" && scene.id !== text.currentSceneId) {
      setBlur("blur");
      setTimeout(() => {
        text.currentSceneId = scene.id;
        props.onTextChanged(text);
        window.scrollTo({ top: 0 });
      }, 1000);
    }
  }

  function giveFromItemTo(
    owner: TextPlayer | TextScene | undefined,
    item: TextObject,
    receiver: TextObject | undefined
  ) {
    if (owner && receiver) {
      if (
        receiver.type === "person" ||
        receiver.type === "player" ||
        receiver.type === "scene"
      ) {
        const idx = owner.things.findIndex((thing) => item.id === thing.id);
        if (idx >= 0) {
          let thing = owner.things[idx];
          receiver.things.push(thing);
          owner.things.splice(idx, 1);
          props.onTextChanged(text);
        }
      }
    }
  }

  function removeObjectFromScenesDescription(object: TextObject) {
    if (scene) {
      const paragraphs: string[] =
        typeof scene.description === "string"
          ? [scene.description]
          : scene.description;
      const description: string[] = [];
      paragraphs.forEach((paragraph) => {
        if (paragraph.indexOf("{" + object.type + ":" + object.id + ":") < 0) {
          description.push(paragraph);
        }
      });
      if (description.length !== paragraphs.length) {
        scene.description = description;
        text.scenes[scene.id] = scene;
        props.onTextChanged(text);
      }
    }
  }

  if (text.deviceMode === "desktop")
    return (
      <>
        <div className="Center">
          <TextVentureHeader text={text} />
          <div className="TextVentureMain">
            <TextVentureInventory
              player={player}
              onObjectClick={handleObjectClick}
              mode={text.inventoryMode}
            />

            <div className="TextVentureContent">
              <TextVentureScene
                scene={scene}
                blur={blur}
                onObjectClick={handleObjectClick}
                onRenderToken={handleRenderToken}
                onNextDialog={handleNextDialog}
              />

              <TextVentureConsole
                title={text.commandLogTitle}
                commandLog={text.commandLog}
                command={currentCommand}
                mode={text.consoleMode}
              />
            </div>
          </div>
        </div>
        <TextVentureActions
          actions={text.actions}
          onAction={handleAction}
          currentAction={currentCommand.action}
          lightMode={text.lightMode}
          deviceMode={text.deviceMode}
          consoleMode={text.consoleMode}
          inventoryMode={text.inventoryMode}
        />
        <a style={{ display: "none" }} href="?" ref={saveRef}>
          save-text
        </a>
        <input
          style={{ display: "none" }}
          type="file"
          ref={loadRef}
          onChange={handleLoadChange}
        />
      </>
    );
  else {
    return (
      <>
        <TextVentureConsole
          title={text.commandLogTitle}
          commandLog={text.commandLog}
          command={currentCommand}
          mode={text.consoleMode}
        />

        <TextVentureInventory
          onObjectClick={handleObjectClick}
          player={player}
          mode={text.inventoryMode}
        />

        <TextVentureActions
          currentAction={currentCommand.action}
          actions={text.actions}
          onAction={handleAction}
          lightMode={text.lightMode}
          deviceMode={text.deviceMode}
          consoleMode={text.consoleMode}
          inventoryMode={text.inventoryMode}
          menuButton
        />

        {scene.id === Object.keys(text.scenes)[0] && (
          <TextVentureHeader text={text} />
        )}

        <TextVentureScene
          scene={scene}
          blur={blur}
          onNextDialog={handleNextDialog}
          onObjectClick={handleObjectClick}
          onRenderToken={handleRenderToken}
        ></TextVentureScene>

        <a style={{ display: "none" }} href="?" ref={saveRef}>
          save-text
        </a>
        <input
          style={{ display: "none" }}
          type="file"
          ref={loadRef}
          onChange={handleLoadChange}
        />
      </>
    );
  }
}

function logInteraction(text: string, obj?: any) {
  if (obj) {
    return console.log(text, obj);
  } else {
    return console.log(text);
  }
}
