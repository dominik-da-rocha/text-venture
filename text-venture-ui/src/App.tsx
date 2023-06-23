import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TextVentureViewer } from "./text-venture/TextVentureViewer";
import { CaptainHuntersSpaceQuest } from "./data/CapitanHuntersSpaceQuest";
import { TextVenture, toTextVenture } from "./model/TextVenture";
import { TextSettings } from "./model/TextSettings";
import { DefaultSettings } from "./data/DefaultSettings";
import { useLocalState } from "./utils/useLocalState";
import { Navbar } from "./utils/Navbar";
import { About, Home } from "./utils/Home";
import { Settings } from "./utils/Settings";

function App() {
  const [captainHuntersSpaceQuest, setCaptainHuntersSpaceQuest] = useLocalState<
    TextVenture
  >(
    "text-venture.captain-hunters-space-quest",
    toTextVenture(CaptainHuntersSpaceQuest)
  );
  const [settings, setSettings] = useLocalState<TextSettings>(
    "text-venture.settings",
    DefaultSettings
  );

  return (
    <BrowserRouter>
      <div
        className={[
          "App",
          settings.lightMode,
          settings.deviceMode,
          settings.textMode,
          settings.textSize,
        ].join(" ")}
      >
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/settings"
              element={<Settings settings={settings} onChange={setSettings} />}
            />
            <Route path="/help" element={<Lorem title="Help" />} />
            <Route
              path="/captain-hunters-space-quest"
              element={
                <TextVentureViewer
                  text={captainHuntersSpaceQuest}
                  onTextChanged={setCaptainHuntersSpaceQuest}
                  settings={settings}
                  onSettingsChanged={setSettings}
                />
              }
            />
          </Routes>
        </div>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

function Lorem(props: { title: string }) {
  const ps = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
    "Chapter 7",
    "Chapter 8",
  ];
  return (
    <div>
      <h1>{props.title}</h1>
      <div className="Subtitle">Something to Do</div>
      {ps.map((p) => {
        return (
          <p key={p}>
            <h3>{p}</h3>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        );
      })}
    </div>
  );
}

export default App;
