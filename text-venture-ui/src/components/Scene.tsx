import React from "react";
import "./Scene.css";
import { TextScene } from "../model/TextScene";
import { TextObject, TextToken } from "../model/TextObject";

export type SceneSwitchEffect = "start-scene-switch" | "end-scene-switch";
export const sceneEffectChangeTime = 500;
export const sceneSwitchEffectStart = "start-scene-switch";
export const sceneSwitchEffectEnd = "end-scene-switch";

export interface SceneProps {
  scene: TextScene | undefined;
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
  onNextDialog(dialog: undefined): void;
}

export function Scene(props: SceneProps) {
  return <SceneSelect {...props} />;
}

function SceneSelect(props: SceneProps) {
  if (props.scene !== undefined) {
    switch (props.scene.type) {
      case "scene":
        return <SceneViewer {...props} />;
    }
  }

  return <article className="warn">No scene or conversation selected!</article>;
}

interface SceneViewerProps extends SceneProps {}

function SceneViewer(props: SceneViewerProps) {
  if (!props.scene) {
    return <></>;
  }
  return (
    <div key={props.scene?.id} className="Scene">
      <h2>{props.scene.name}</h2>
      <SceneTextViewer
        className="Paragraphs"
        text={props.scene.paragraphs ?? []}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
        firstLetterLarge
      />
      <SceneTextViewer
        className="Footnotes"
        text={props.scene.footnotes ?? []}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
      />
    </div>
  );
}

interface SceneTextViewerProps {
  className: string;
  text: string | string[];
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
  firstLetterLarge?: boolean;
}

function SceneTextViewer(props: SceneTextViewerProps) {
  if (typeof props.text === "string") {
    return (
      <SceneTextArrayViewer
        className={props.className}
        text={[props.text]}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
        firstLetterLarge={props.firstLetterLarge}
      />
    );
  } else {
    return (
      <SceneTextArrayViewer
        className={props.className}
        text={props.text}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
        firstLetterLarge={props.firstLetterLarge}
      />
    );
  }
}

interface SceneTextArrayViewerProps {
  className: string;
  text: string[];
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
  firstLetterLarge?: boolean;
}

function SceneTextArrayViewer(props: SceneTextArrayViewerProps) {
  const paragraphs = props.text.map((p, pkey) => {
    const spans = p
      .split(/({[a-z-]*:[a-z-]*:[a-zA-Z -,.—_:"']*})/)
      .map((s, skey) => {
        if (s.startsWith("{") && s.endsWith("}")) {
          const tokens = s.substring(1, s.length - 1).split(":");
          const tokenType = tokens[0];
          const tokenId = tokens[1];
          const tokenText = tokens[2];
          const object = props.onRenderToken(tokenType, tokenId);
          const warn =
            object === undefined || tokens.length < 3 ? "warn nop" : "";
          const className = [object?.type, object?.id, warn].join(" ");
          switch (object?.type) {
            case "link":
              return (
                <a
                  title={warn ? s : ""}
                  key={skey}
                  href={object.url}
                  target={object.isInternal ? undefined : "_blank"}
                  rel={object.isInternal ? undefined : "noreferrer noopener"}
                  className={"SceneLink " + className}
                >
                  {warn ? "⚠" : ""}
                  {tokenText ?? s}
                </a>
              );
            case "style":
              return (
                <span
                  key={skey}
                  className={"SceneStyle " + className + " " + object.id}
                >
                  {tokens[2]}
                </span>
              );
            default:
              return (
                <span
                  title={warn ? s : ""}
                  key={skey}
                  className={"SceneObject " + className}
                  onClick={(event) => {
                    event.preventDefault();
                    if (object !== undefined) {
                      props.onObjectClick(object);
                    }
                  }}
                >
                  {warn ? "⚠" : ""}
                  {tokenText ?? s}
                </span>
              );
          }
        } else {
          return (
            <span key={skey} className="Text">
              {s}
            </span>
          );
        }
      });
    const className = [
      "Paragraph",
      pkey === 0 && props.firstLetterLarge ? " first-letter-large" : "",
    ].join(" ");
    return (
      <p className={className} key={pkey}>
        {spans}
      </p>
    );
  });
  return <div className={props.className}>{paragraphs}</div>;
}
