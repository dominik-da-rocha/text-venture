import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TextVentureViewer } from "./text-venture/TextVentureViewer";
import { CaptainHuntersSpaceQuest } from "./data/CapitanHuntersSpaceQuest";
import { TextVenture, toTextVenture } from "./model/TextVenture";
import { TextSettings } from "./model/TextSettings";
import { DefaultSettings } from "./data/DefaultSettings";
import { useLocalState } from "./utils/LocalState";
import { Navbar } from "./utils/Navbar";
import { About, Home } from "./utils/Home";
import { Settings } from "./utils/Settings";
import { PopupAlertProvider } from "./utils/PopupAlert";
import { PrefaceQuest } from "./data/PrefaceQuest";

function App() {
  const [settings, setSettings] = useLocalState<TextSettings>(
    "text-venture.settings",
    DefaultSettings
  );
  const [prefaceQuest, setPrefaceQuest] = useLocalState<TextVenture>(
    "text-venture.preface",
    toTextVenture(PrefaceQuest)
  );

  const [captainHuntersSpaceQuest, setCaptainHuntersSpaceQuest] = useLocalState<
    TextVenture
  >(
    "text-venture.captain-hunters-space-quest",
    toTextVenture(CaptainHuntersSpaceQuest)
  );

  const chapters = [
    { ...prefaceQuest, setter: setPrefaceQuest },
    { ...captainHuntersSpaceQuest, setter: setCaptainHuntersSpaceQuest },
  ];

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
        <PopupAlertProvider>
          <div className="Content">
            <Routes>
              <Route path="/" element={<Home chapters={chapters} />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/settings"
                element={
                  <Settings
                    settings={settings}
                    onChange={setSettings}
                    dataItems={[
                      {
                        id: prefaceQuest.id,
                        name: prefaceQuest.name,
                        data: prefaceQuest,
                        onChange: setPrefaceQuest,
                      },
                      {
                        id: captainHuntersSpaceQuest.id,
                        name: captainHuntersSpaceQuest.name,
                        data: captainHuntersSpaceQuest,
                        onChange: setCaptainHuntersSpaceQuest,
                      },
                    ]}
                  />
                }
              />
              {chapters.map((chapter) => {
                return (
                  <Route
                    path={"/" + chapter.id}
                    element={
                      <TextVentureViewer
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
    </BrowserRouter>
  );
}

export default App;
