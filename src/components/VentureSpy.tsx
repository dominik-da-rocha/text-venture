import { useEffect, useState } from "react";
import {
  Button,
  ButtonDownload,
  ButtonUpload,
  UploadEventArgs,
} from "./Button";
import { Icon } from "./Icon";
import "./VentureSpy.css";
import { TextActionId, TextActionIds } from "../model/TextAction";
import { useShowPopup } from "./PopupAlert";
import { MigrationHandlerMap, useLocalState } from "./LocalState";

interface SpyCommandAction {
  type: "action";
  actionId: TextActionId;
  objectsIds: string[];
  wait: number;
}

interface SpyCommandDialog {
  type: "dialog";
  wait: number;
  dialogId: string;
}

type SpyCommand = SpyCommandAction | SpyCommandDialog;

interface SpyState {
  version: 1;
  filename: string;
  commands: SpyCommand[];
}

export interface VentureSpyProps {
  onSpyCommand(command: SpyCommand): void;
}

export function VentureSpy(props: VentureSpyProps) {
  const [mode, setMode] = useState<"on" | "off">("on");
  const [play, setPlay] = useState<"play" | "stop">("stop");
  const [index, setIndex] = useState<number>(-1);
  const [state, setState] = useLocalState<SpyState>(
    "text-venture.spy.filename",
    { version: 1, filename: "tv-spy.json", commands: [] },
    "local",
    new MigrationHandlerMap()
  );
  const showPopup = useShowPopup();

  function toggleOnOff() {
    setMode(mode === "off" ? "on" : "off");
  }

  function togglePlay() {
    setPlay(play === "play" ? "stop" : "play");
  }

  function nextStep() {
    setPlay("stop");
    const idx = (index + 1) % state.commands.length;
    setIndex(idx);
    scrollTo(idx);
    const cmd = state.commands[idx];
    if (cmd) {
      onSpyCommand(cmd);
    }
  }

  function previousStep() {
    setPlay("stop");
    let idx = index - 1;
    if (idx < 0) idx = state.commands.length - 1;
    setIndex(idx);
    scrollTo(idx);
    const cmd = state.commands[idx];
    if (cmd) {
      onSpyCommand(cmd);
    }
  }

  function addCommandAction() {
    let newCmd = [...state.commands];
    newCmd.push({
      type: "action",
      actionId: "none",
      objectsIds: [],
      wait: 1000,
    });
    setState({ ...state, commands: newCmd });
    setTimeout(() => {
      scrollTo(state.commands.length);
    }, 1);
  }

  function addCommandDialog() {
    let newCmd = [...state.commands];
    newCmd.push({
      type: "dialog",
      wait: 1000,
      dialogId: "",
    });
    setState({ ...state, commands: newCmd });
    setTimeout(() => {
      scrollTo(state.commands.length);
    }, 1);
  }

  function setCommandAction(value: string, idx: number): void {
    const action = state.commands[idx];
    if (action.type === "action") {
      action.actionId = value as TextActionId;
      state.commands[idx] = action;
      setState({ ...state, commands: state.commands });
    }
  }

  function setCommandObjects(value: string, idx: number): void {
    const action = state.commands[idx];
    if (action.type === "action") {
      action.objectsIds = value
        .split(",")
        .map((val) => val.trim().toLowerCase());
      state.commands[idx] = action;
      setState({ ...state });
    }
  }

  function setCommandDialogId(value: string, idx: number): void {
    const dialog = state.commands[idx];
    if (dialog.type === "dialog") {
      dialog.dialogId = value;
      state.commands[idx] = dialog;
      setState({ ...state });
    }
  }

  function setCommandWait(value: string, idx: number): void {
    const wait = Number.parseInt(value);
    if (!Number.isNaN(wait)) {
      state.commands[idx].wait = wait;
      setState({ ...state });
    }
  }

  function scrollTo(idx: number) {
    let id = "text-venture-spy-command-" + idx;
    let el = document.getElementById(id);
    if (el !== null) {
      el.scrollIntoView();
    }
  }

  function removeCommand(idx: number) {
    state.commands.splice(idx, 1);
    setState({ ...state });
  }

  const onSpyCommand = props.onSpyCommand;

  useEffect(() => {
    if (play === "stop") {
    } else if (play === "play") {
      setTimeout(() => {
        const cmd = state.commands[index];
        if (cmd) {
          onSpyCommand(cmd);
        }
        let idx = index + 1;
        setIndex(idx);
        scrollTo(idx);
        if (index >= state.commands.length) {
          setPlay("stop");
        }
      }, state.commands[index]?.wait ?? 1);
    }
    return () => {};
  }, [play, index, state.commands, onSpyCommand]);

  function onUploadChanged(event: UploadEventArgs): void {
    setState({ ...state, filename: event.filename, commands: event.data });
  }

  return (
    <div className={["VentureSpy", mode].join(" ")}>
      <div className="Header">Text Venture Spy</div>
      <div className="SpyOnOff">
        <Button onClick={toggleOnOff}>
          <Icon>build</Icon>
        </Button>
        <ButtonDownload
          className="ButtonMargin"
          data={state.commands}
          filename={state.filename}
        />
        <ButtonUpload
          onChange={onUploadChanged}
          onError={(e) => showPopup(() => <>{e.message}</>, 10000)}
        />
        <Button className="ButtonMargin" onClick={previousStep}>
          <Icon>skip_previous</Icon>
        </Button>
        <Button onClick={togglePlay}>
          <Icon>{play === "play" ? "stop" : "play_arrow"}</Icon>
        </Button>
        <Button onClick={nextStep}>
          <Icon>skip_next</Icon>
        </Button>
      </div>
      <div className="CommandControl">
        <Button onClick={addCommandAction}>
          <Icon>pan_tool</Icon>
        </Button>
        <Button onClick={addCommandDialog}>
          <Icon>chat</Icon>
        </Button>
        <input
          placeholder="filename"
          value={state.filename}
          onChange={(e) => setState({ ...state, filename: e.target.value })}
        ></input>
      </div>
      <div className="Commands">
        {state.commands.map((command, idx) => {
          return (
            <div key={idx} id={"text-venture-spy-command-" + idx}>
              <div
                className={[
                  "CommandInputs",
                  idx === index ? "running" : "",
                ].join(" ")}
              >
                <label>{idx}</label>
                {command.type === "action" ? (
                  <select
                    value={command.actionId}
                    onChange={(e) => setCommandAction(e.target.value, idx)}
                  >
                    {TextActionIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                ) : (
                  <></>
                )}
                {command.type === "action" ? (
                  <input
                    className="objects"
                    value={command.objectsIds.join(",")}
                    onChange={(e) => setCommandObjects(e.target.value, idx)}
                    placeholder="object1,object2,..."
                  />
                ) : (
                  <></>
                )}
                {command.type === "dialog" ? (
                  <input
                    className="dialogId"
                    value={command.dialogId}
                    onChange={(e) => setCommandDialogId(e.target.value, idx)}
                    placeholder="dialogId"
                  />
                ) : (
                  <></>
                )}
                <input
                  className="wait"
                  type="number"
                  step={100}
                  placeholder="wait"
                  value={command.wait}
                  onChange={(e) => setCommandWait(e.target.value, idx)}
                ></input>
                <Button onClick={() => removeCommand(idx)}>
                  <Icon>delete</Icon>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
