import React from "react";
import { TextObject, TextToken } from "./../model/TextVenture";
import { TextScene } from "./../model/TextScene";

export type SceneSwitchEffect = "start-scene-switch" | "end-scene-switch";
export const sceneEffectChangeTime = 500;
export const sceneSwitchEffectStart = "start-scene-switch";
export const sceneSwitchEffectEnd = "end-scene-switch";

export interface TextVentureSceneProps {
  scene: TextScene | undefined;
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
  onNextDialog(dialog: undefined): void;
}

export function TextVentureScene(props: TextVentureSceneProps) {
  return (
    <div>
      <TextVentureSceneSelect {...props} />
    </div>
  );
}

function TextVentureSceneSelect(props: TextVentureSceneProps) {
  if (props.scene !== undefined) {
    switch (props.scene.type) {
      case "scene":
        return <SceneViewer {...props} />;
    }
  }

  return <article className="warn">No scene or conversation selected!</article>;
}

interface SceneViewerProps extends TextVentureSceneProps {}

function SceneViewer(props: SceneViewerProps) {
  if (!props.scene) {
    return <></>;
  }
  return (
    <div key={props.scene?.id} className="TextVentureScene">
      <div className="Description">
        <h2>{props.scene.name}</h2>
        <SceneTextViewer
          text={props.scene.paragraphs ?? []}
          onRenderToken={props.onRenderToken}
          onObjectClick={props.onObjectClick}
        />
      </div>
    </div>
  );
}

interface SceneTextViewerProps {
  text: string | string[];
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
}

function SceneTextViewer(props: SceneTextViewerProps) {
  if (typeof props.text === "string") {
    return (
      <SceneTextArrayViewer
        text={[props.text]}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
      />
    );
  } else {
    return (
      <SceneTextArrayViewer
        text={props.text}
        onRenderToken={props.onRenderToken}
        onObjectClick={props.onObjectClick}
      />
    );
  }
}

interface SceneTextArrayViewerProps {
  text: string[];
  onRenderToken(type: string, id: string): TextToken | undefined;
  onObjectClick(object: TextObject): void;
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
          const warn = object === undefined || tokens.length < 3 ? "warn" : "";
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
                <a
                  title={warn ? s : ""}
                  key={skey}
                  href={tokenId}
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
                </a>
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
    return (
      <p
        className={"Paragraph" + (pkey === 0 ? " first-letter" : "")}
        key={pkey}
      >
        {spans}
      </p>
    );
  });
  return <div className="Paragraphs">{paragraphs}</div>;
}
