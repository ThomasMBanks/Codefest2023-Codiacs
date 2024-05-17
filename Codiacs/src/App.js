import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

import LandingPage from "./landing-page/landing";
import Canvas from "./canvas-app/canvas";
import VolcanoApp from "./volcano-app/VolcanoApp";
import EMDRPage from "./emdr-app/EMDRPage";
import MemoryJarApp from "./memory-jar/MemoryJarApp";
import MonsterPage from "./monster-app/MonsterPage";
import LoginPage from "./login/login.js";
import AppHeader from "./AppHeader.js";

function App() {
  //const [backgroundColour, setBackgroundColour] = useState("white");
  const [usersName, setUsersName] = useState("");
  const [theme, setTheme] = useState("light");
  const [isPopOut, setIsPopOut] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlPopout = searchParams.get("popout");
    if (urlPopout) setIsPopOut(urlPopout === "true");
  }, [location]);

  return (
    <div
      id="app"
      className={
        "App " +
        (["light", "white"].includes(theme)
          ? "bg-light text-dark"
          : "bg-dark text-light")
      }
      data-testid="app"
      //style={{ backgroundColor: backgroundColour }}
    >
      {!isPopOut && (
        <AppHeader
          setUsersName={setUsersName}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      <Routes>
        <Route path="/">
          <Route
            index
            element={<LandingPage usersName={usersName} theme={theme} />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="memory-jar" element={<MemoryJarApp />} />
          <Route path="canvas" element={<Canvas />} />
          <Route path="emotion-volcano" element={<VolcanoApp />} />
          <Route path="worry-monster" element={<MonsterPage />} />
          <Route
            path="emdr"
            element={<EMDRPage theme={theme} onThemeChange={setTheme} />}
          >
            <Route
              path="/emdr/popout/:popout/size/:size/speed/:speed/theme/:theme"
              element={<EMDRPage />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
