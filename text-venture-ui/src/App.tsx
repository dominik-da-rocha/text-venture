import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { TextVentureViewer } from "./text-venture/TextVentureViewer";
import { CaptainHuntersSpaceQuest } from "./data/CapitanHuntersSpaceQuest";
import { TextVenture, toTextVenture } from "./model/TextVenture";
import {} from "./utils/PopupAlert";

function useLocalState<T>(id: string, defaultValue: T): [T, React.Dispatch<T>] {
  const [state, setState] = useState<T>(() => {
    const text = localStorage.getItem(id);
    if (text === null) {
      localStorage.setItem(id, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      localStorage.setItem(id, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  return [
    state,
    (value: T) => {
      if (value === undefined) {
        setState({ ...defaultValue });
        localStorage.setItem(id, JSON.stringify(defaultValue));
        return;
      }
      setState({ ...value });
      localStorage.setItem(id, JSON.stringify(value));
    },
  ];
}

function App() {
  const [text, setText] = useLocalState<TextVenture>(
    "venture",
    toTextVenture(CaptainHuntersSpaceQuest)
  );

  return (
    <BrowserRouter>
      <TextVentureViewer text={text} onTextChanged={setText} />
    </BrowserRouter>
  );
}

export default App;
