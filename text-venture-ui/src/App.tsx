import React from "react";
import "./App.css";
import "./theme/Theme.css";
import "./data/PrologueQuest.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Venture } from "./components/Venture";
import { CaptainHuntersSpaceQuest } from "./data/CapitanHuntersSpaceQuest";
import { TextVenture, toTextVenture } from "./model/TextVenture";
import { TextSettings } from "./model/TextSettings";
import { DefaultSettings } from "./data/DefaultSettings";
import { useLocalState } from "./components/LocalState";
import { Navbar } from "./components/Navbar";
import { About, Home } from "./components/Home";
import { Settings } from "./components/Settings";
import { PopupAlertProvider } from "./components/PopupAlert";
import { PrologueQuest } from "./data/PrologueQuest";
import { GuestBook } from "./components/GuestBook";

function App() {
  const [settings, setSettings] = useLocalState<TextSettings>(
    "text-venture.settings",
    DefaultSettings,
    "local"
  );

  const [prologueQuest, setPrologueQuest] = useLocalState<TextVenture>(
    "text-venture." + PrologueQuest.id,
    toTextVenture(PrologueQuest),
    settings.storageMode
  );

  const [captainHuntersSpaceQuest, setCaptainHuntersSpaceQuest] = useLocalState<
    TextVenture
  >(
    "text-venture.captain-hunters-space-quest",
    toTextVenture(CaptainHuntersSpaceQuest),
    settings.storageMode
  );

  const chapters = [
    { ...prologueQuest, setter: setPrologueQuest },
    { ...captainHuntersSpaceQuest, setter: setCaptainHuntersSpaceQuest },
  ];

  return (
    <HashRouter>
      <div
        className={[
          "App",
          settings.lightMode,
          settings.textMode,
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
                      />
                    }
                  />
                );
              })}
            </Routes>
          </div>
          <Navbar />
        </PopupAlertProvider>
      </div>
    </HashRouter>
  );
}

export default App;
