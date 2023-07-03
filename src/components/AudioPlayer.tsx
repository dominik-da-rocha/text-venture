import React, { useEffect, useState } from "react";
import "./AudioPlayer.css";
import { Button } from "./Button";
import { Icon } from "./Icon";

export interface AudioState {
  playing: boolean;
  setUrl(url: string): void;
  url: string | null;
  toggleMute(): void;
  togglePlay(): void;
  mute: boolean;
}

export function useAudio() {
  const [mute, setMute] = useState(false);
  const [url, setUrlIntern] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    if (mute) {
      setPlaying(false);
    } else {
      setPlaying(!playing);
    }
  }

  function toggleMute() {
    const newMute = !mute;
    setMute(newMute);
    if (newMute) {
      setPlaying(false);
    }
  }

  function setUrl(url: string | null) {
    if (!mute && url) {
      setAudio(new Audio(url));
      setPlaying(true);
      setUrlIntern(url);
    } else {
      setPlaying(false);
      setAudio(null);
      setUrlIntern(null);
    }
  }

  useEffect(() => {
    if (audio !== null) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    audio?.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio?.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  const state: AudioState = {
    playing: playing,
    setUrl: setUrl,
    toggleMute: toggleMute,
    togglePlay: togglePlay,
    url: url,
    mute: mute,
  };
  return state;
}

export function AudioPlayer(props: AudioState) {
  return (
    <>
      <Button onClick={() => props.toggleMute()}>
        <Icon className={props.mute ? "on" : "off"}>
          {props.mute ? "music_off" : "music_note"}
        </Icon>
      </Button>
      <Button
        onClick={() => props.togglePlay()}
        disabled={props.mute || props.url === null}
      >
        <Icon className={props.playing ? "on" : "off"}>
          {props.playing ? "pause" : "play_arrow"}
        </Icon>
      </Button>
    </>
  );
}
