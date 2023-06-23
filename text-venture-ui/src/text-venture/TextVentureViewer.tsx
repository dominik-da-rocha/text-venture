import React, { useEffect, useRef, useState } from "react";
import { TextVentureScene } from "./TextVentureScene";
import { TextVentureHeader } from "./TextVentureHeader";
import { TextVentureActions } from "./TextVentureActions";
import {
  TextVentureConsole,
  TextVentureLogbook,
  commandToString,
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
  TextLogbook,
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
import { TextSettings } from "../model/TextSettings";

interface TextVentureViewerProps {
  onSettingsChanged(copy: {
    textMode: import("../model/TextSettings").TextMode;
    textSize: import("../model/TextSettings").TextSize;
    lightMode: import("../model/TextSettings").TextLightMode;
    deviceMode: import("../model/TextSettings").TextDeviceMode;
    consoleMode: import("../model/TextSettings").TextOnOffMode;
    inventoryMode: import("../model/TextSettings").TextOnOffMode;
  }): unknown;
  settings: TextSettings;
  text: TextVenture;
  onTextChanged(text: TextVenture | undefined): void;
}

export function TextVentureViewer(props: TextVentureViewerProps) {
  const className = [
    "TextVenture",
    props.settings.deviceMode,
    props.settings.lightMode,
    props.settings.textMode,
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
  const settings = props.settings;
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

  function toLogbook(command: TextCommand): TextLogbook {
    const log: TextLogbook = {
      actionId: command.action.id,
      objects: command.objects.map((o) => {
        return {
          type: o.type,
          id: o.id,
          name: o.name,
        };
      }),
      command: commandToString(command),
      response: command.response,
      question: command.question,
      style: command.style,
      playerName: command.playerName,
      playerId: command.playerId,
    };
    return log;
  }

  function appendLog(command: TextCommand) {
    const logbookEntry = toLogbook(command);
    const newLogbook = [logbookEntry, ...text.logbook];
    while (newLogbook.length > text.commandLogMaxLength) {
      newLogbook.splice(newLogbook.length - 1, 1);
    }
    text.logbook = newLogbook;
    props.onTextChanged(text);
    showPopup(() => <TextVentureLogbook {...logbookEntry} />);
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
        setTimeout(
          () =>
            setCurrentCommand({
              type: "command",
              action: TextActionNone,
              objects: [],
              response: "",
            }),
          1000
        );
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
        command.playerName = player?.name;
        command.playerId = player?.id;
        command.response = randomItem(interaction.responses);
        appendLog(command);
        return true;
      case "simple":
        command.playerName = player?.name;
        command.playerId = player?.id;
        command.response = interaction.response;
        appendLog(command);
        return true;
      case "lookAt":
        command.playerName = player?.name;
        command.playerId = player?.id;
        command.response =
          getDescription(command.objects[0].description) ??
          randomItem(interaction.responses);
        appendLog(command);
        selectPlayer(command.objects[0]);
        return true;
      case "give-item-to":
        command.playerName = player?.name;
        command.playerId = player?.id;
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
        command.playerName = player?.name;
        command.playerId = player?.id;
        command.response = randomItem(interaction.responses);
        appendLog(command);
        removeObjectFromScenesDescription(command.objects[0]);
        giveFromItemTo(scene, command.objects[0], player);
        return true;
      case "random-talk-to":
        command.playerName = player?.name;
        command.playerId = player?.id;
        command.question = randomItem(interaction.questions);
        command.response = randomItem(interaction.responses);
        appendLog(command);
        return true;
    }

    command.response = "Note from the programmer: That should not happen!";
    appendLog(command);

    return true;
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

  return (
    <>
      <TextVentureConsole
        title={text.commandLogTitle}
        commandLog={text.logbook}
        command={currentCommand}
        player={player}
        mode={settings.consoleMode}
        onModeChanged={(mode) => {
          let copy = { ...settings };
          copy.consoleMode = mode;
          props.onSettingsChanged(copy);
        }}
      />

      <TextVentureInventory
        onObjectClick={handleObjectClick}
        player={player}
        mode={settings.inventoryMode}
        onModeChanged={(mode) => {
          let copy = { ...settings };
          copy.inventoryMode = mode;
          props.onSettingsChanged(copy);
        }}
      />

      <TextVentureActions
        currentAction={currentCommand.action}
        actions={text.actions}
        onAction={handleAction}
        mode={props.settings.actionMode}
        onModeChanged={(mode) => {
          let copy = { ...settings };
          copy.actionMode = mode;
          props.onSettingsChanged(copy);
        }}
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

function logInteraction(text: string, obj?: any) {
  if (obj) {
    return console.log(text, obj);
  } else {
    return console.log(text);
  }
}
