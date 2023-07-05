import React from "react";
import "./App.css";
import "./theme/Theme.css";
import "./data/01-prologue/PrologueQuest.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Venture } from "./components/Venture";
import {
  TextVenture,
  TextVentureMigration,
  toTextVenture,
} from "./model/TextVenture";
import { TextSettingMigration, TextSettings } from "./model/TextSettings";
import { DefaultSettings } from "./data/DefaultSettings";
import { useLocalState } from "./components/LocalState";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Settings } from "./components/Settings";
import { PopupAlertProvider } from "./components/PopupAlert";
import { PrologueQuest } from "./data/01-prologue/PrologueQuest";
import { GuestBook } from "./components/GuestBook";
import { About } from "./components/About";
import { useAudio } from "./components/AudioPlayer";

function App() {
  const [settings, setSettings] = useLocalState<TextSettings>(
    "text-venture.settings",
    DefaultSettings,
    "local",
    TextSettingMigration
  );

  const [prologueQuest, setPrologueQuest] = useLocalState<TextVenture>(
    "text-venture." + PrologueQuest.id,
    toTextVenture(PrologueQuest),
    settings.storageMode,
    TextVentureMigration
  );

  const audio = useAudio();

  const chapters = [
    {
      ...prologueQuest,
      setter: setPrologueQuest,
      disabled: false,
    },
  ];

  function handlePlaySound(url: string) {
    audio.setUrl(url);
  }

  return (
    <HashRouter>
      <div
        className={[
          "App",
          settings.lightMode,
          settings.fontStyle,
          settings.textSize,
        ].join(" ")}
      >
        <PopupAlertProvider>
          <div className="Content">
            <Routes>
              <Route path="" element={<Home chapters={chapters} />} />
              <Route path="about" element={<About />} />
              <Route
                path="settings"
                element={
                  <Settings
                    settings={settings}
                    onChange={setSettings}
                    dataItems={chapters.map((chapter) => {
                      return {
                        id: chapter.id,
                        name: chapter.name,
                        data: chapter,
                        onChange: chapter.setter,
                      };
                    })}
                  />
                }
              />
              <Route path="guest-book" element={<GuestBook />} />
              {chapters.map((chapter) => {
                return (
                  <Route
                    key={chapter.id}
                    path={chapter.id}
                    element={
                      <Venture
                        text={chapter}
                        onTextChanged={chapter.setter}
                        settings={settings}
                        onSettingsChanged={setSettings}
                        onPlaySound={handlePlaySound}
                      />
                    }
                  />
                );
              })}
            </Routes>
          </div>
          <Navbar audio={audio} />
        </PopupAlertProvider>
      </div>
    </HashRouter>
  );
}

export default App;
