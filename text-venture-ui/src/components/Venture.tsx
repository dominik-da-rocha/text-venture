import React, { useEffect, useState } from "react";
import {
  SceneSwitchEffect,
  Scene,
  sceneEffectChangeTime,
  sceneSwitchEffectEnd,
  sceneSwitchEffectStart,
} from "./Scene";
import { SceneHeader } from "./SceneHeader";
import { ActionMenu } from "./ActionMenu";
import {
  ConsoleMenu,
  TextVentureLogbook,
  commandToString,
} from "./ConsoleMenu";
import { InventoryMenu } from "./InventoryMenu";
import { TextActionNone, TextAction } from "../model/TextAction";
import { getByIdOrFirst, matchesAny, matchesOneOf, randomItem } from "./Utils";
import { TextCommand, TextLogbook, TextVenture } from "../model/TextVenture";
import {
  TextInteraction,
  TextObjectPattern,
  TextActionPattern,
} from "../model/TextInteraction";
import { TextScene } from "../model/TextScene";
import { useShowPopup } from "./PopupAlert";
import { TextSettings } from "../model/TextSettings";
import {
  TextObject,
  TextToken,
  TextDescription,
  TextPlayer,
} from "../model/TextObject";

interface VentureProps {
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

export function Venture(props: VentureProps) {
  const className = [
    "TextVenture",
    props.settings.deviceMode,
    props.settings.lightMode,
    props.settings.textMode,
  ].join(" ");
  return (
    <div className={className}>
      <VentureWrapper {...props}></VentureWrapper>
    </div>
  );
}

export function VentureWrapper(props: VentureProps) {
  const text = props.text;
  const settings = props.settings;
  const [currentCommand, setCurrentCommand] = useState<TextCommand>({
    type: "command",
    action: TextActionNone,
    objects: [],
    response: "",
  });
  const [sceneSwitchEffect, setSceneSwitchEffect] = useState<SceneSwitchEffect>(
    () => sceneSwitchEffectEnd
  );
  const showPopup = useShowPopup();

  useEffect(() => {
    if (sceneSwitchEffect === sceneSwitchEffectStart) {
      var tout = setTimeout(() => {
        setSceneSwitchEffect(sceneSwitchEffectEnd);
      }, sceneEffectChangeTime);
    }
    return () => {
      clearTimeout(tout);
    };
  }, [sceneSwitchEffect]);

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
    while (newLogbook.length > text.logbookMaxLength) {
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
        if (newCommand.action.id === "none" && text.actions["look-at"]) {
          newCommand.action = text.actions["look-at"];
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
      case "look-at":
        command.playerName = player?.name;
        command.playerId = player?.id;
        command.response =
          getDescription(command.objects[0].description) ??
          randomItem(interaction.responses);
        appendLog(command);
        return true;
      case "look-at-player":
        command.playerName = player?.name;
        command.playerId = player?.id;
        command.response = randomItem(interaction.responses);
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

  function handleAction(action: TextAction) {
    updateCurrentCommand(action, undefined);
  }

  function handleRenderToken(type: string, id: string): TextToken | undefined {
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
        case "link":
          return text.links[id];
        case "style":
          return {
            type: "style",
            id: id,
          };
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

      if (player && i.matchesPlayer && i.matchesPlayer !== player.id) {
        logInteraction("does not match player");
        return false;
      }
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
      setSceneSwitchEffect(sceneSwitchEffectStart);
      setTimeout(() => {
        text.currentSceneId = scene.id;
        props.onTextChanged(text);
        window.scrollTo({ top: 0 });
      }, sceneEffectChangeTime);
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
        typeof scene.paragraphs === "string"
          ? [scene.paragraphs]
          : scene.paragraphs;
      const description: string[] = [];
      paragraphs.forEach((paragraph) => {
        if (paragraph.indexOf("{" + object.type + ":" + object.id + ":") < 0) {
          description.push(paragraph);
        }
      });
      if (description.length !== paragraphs.length) {
        scene.paragraphs = description;
        text.scenes[scene.id] = scene;
        props.onTextChanged(text);
      }
    }
  }

  return (
    <>
      <ConsoleMenu
        title={text.logbookTitle}
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

      <InventoryMenu
        onObjectClick={handleObjectClick}
        player={player}
        mode={settings.inventoryMode}
        onModeChanged={(mode) => {
          let copy = { ...settings };
          copy.inventoryMode = mode;
          props.onSettingsChanged(copy);
        }}
      />

      <ActionMenu
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

      <div className={sceneSwitchEffect}>
        {scene.id === Object.keys(text.scenes)[0] && (
          <SceneHeader text={text} />
        )}

        <Scene
          scene={scene}
          onNextDialog={handleNextDialog}
          onObjectClick={handleObjectClick}
          onRenderToken={handleRenderToken}
        ></Scene>
      </div>
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
