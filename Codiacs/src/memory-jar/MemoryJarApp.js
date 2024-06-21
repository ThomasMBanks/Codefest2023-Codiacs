import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import tinycolor from "tinycolor2";

import AppBackground from "../AppBackground";
import Memory from "./Memory";
import Textbox from "../components/Textbox/Textbox.tsx";
import Button from "../components/Button/Button.tsx";
import "./MemoryJarApp.css";
import MemoryJarFilling from "./MemoryJarFilling.js";

function MemoryJarApp() {
  const [memories, setMemories] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [memoryToAdd, setMemoryToAdd] = useState("");
  const [memoryColour, setMemoryColour] = useState("#000000");
  const [selectedMemory, setSelectedMemory] = useState(
    "Click on a memory to read it here"
  );
  const [fillingJar, setFillingJar] = useState(false);
  const [editingMemory, setEditingMemory] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  function handleAdd() {
    var jarColour = tinycolor(memoryColour);
    jarColour.setAlpha(0.75);

    setMemories([
      ...memories,
      { memory: memoryToAdd, memoryColour: memoryColour, jarColour: jarColour },
    ]);
    setMemoryToAdd("");
  }

  function handleEdit() {
    var jarColour = tinycolor(memoryColour);
    jarColour.setAlpha(0.75);

    var tempMemories = [...memories];
    tempMemories[memories.indexOf(selectedMemory)] = {
      memory: memoryToAdd,
      memoryColour: memoryColour,
      jarColour: jarColour,
    };

    setMemories(tempMemories);
    setSelectedMemory("Click on a memory to read it here");
    setEditingMemory(false);
    setMemoryToAdd("");
  }

  function handleFill() {
    setFillingJar(true);

    var tempAmounts = Array(memories.length).fill(50);
    setAmounts(tempAmounts);
  }

  function displayMemory(memoryObj) {
    setSelectedMemory(memoryObj);
  }

  return (
    <>
      <AppBackground setIsDarkMode={setIsDarkMode} />

      <div className="row" style={{ marginTop: "2.5%" }}>
        {!fillingJar ? (
          <>
            <div className="col-sm-6" style={{ paddingLeft: "5%" }}>
              <Textbox
                size="lg"
                rows="8"
                onChange={(e) => setMemoryToAdd(e.target.value)}
                value={memoryToAdd}
              />
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                <input
                  data-testid="color-picker"
                  type="color"
                  className="js-color-picker color-picker me-4"
                  style={{ height: "50px", width: "100px" }}
                  aria-label="Select colour for memory"
                  value={memoryColour}
                  onChange={(e) => setMemoryColour(e.target.value)}
                />
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    children={editingMemory ? "Add changes" : "Add"}
                    onClick={editingMemory ? handleEdit : handleAdd}
                    disabled={memories.length === 5 || memoryToAdd === ""}
                    aria-label="Add memory, thought or feeling"
                    style={{ marginTop: "0px" }}
                  />

                  <Button
                    children="Fill your jar!"
                    onClick={handleFill}
                    disabled={memories.length === 0}
                    aria-label="Fill your jar"
                    style={{ marginTop: "0px" }}
                  />
                </div>
              </div>

              <div>
                {memories.map((memoryObj, index) => (
                  <Memory
                    key={index}
                    memory={memoryObj.memory}
                    amounts={amounts}
                    counter={index}
                    memoryColour={memoryObj.memoryColour}
                    showSlider={false}
                    onClick={() => {
                      editingMemory ? void 0 : displayMemory(memoryObj);
                    }}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </div>

            <div className="col-sm-5 memory-box-outer">
              <div className="memory-box-inner">
                <div
                  style={{ minHeight: "calc(70vh - 200px)", color: "black" }}
                >
                  {selectedMemory.memory}
                </div>
                <Button
                  onClick={() => {
                    setMemoryToAdd(selectedMemory.memory);
                    setMemoryColour(selectedMemory.memoryColour);
                    setEditingMemory(true);
                  }}
                  style={{ margin: "0px" }}
                >
                  Edit this memory
                </Button>
              </div>
            </div>
          </>
        ) : (
          <MemoryJarFilling
            memories={memories}
            amounts={amounts}
            setFillingJar={setFillingJar}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </>
  );
}

export default MemoryJarApp;
