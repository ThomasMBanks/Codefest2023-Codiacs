import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBackground from "../AppBackground";
import "./MonsterPage.css";
import Button from "../components/Button/Button.tsx";
import AppHeader from "../AppHeader.js";

function MonsterPage() {
  const [isEating, setIsEating] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isDrawing, setIsDrawing] = useState(true);
  const [textEntered, setTextEntered] = useState("");
  const [monstersName, setMonstersName] = useState("");
  const [isDraggable, setIsDraggable] = useState(false);
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const navigate = useNavigate();

  let burp = new Audio("burp-37726.mp3");
  const lightBlueHex = "#50c7f2";
  const darkBlueHex = "#3b6db4";
  // const monsterMessages = [
  //   "That was tasty",
  //   "More please!",
  //   "Thank you!",
  //   "Delicious!",
  //   "Yummy!",
  // ];

  useEffect(() => {
    if (nameSubmitted) {
      // Initial call to set canvas size based on initial window size
      updateCanvasSize();

      // Add event listener to window's resize event
      window.addEventListener("resize", updateCanvasSize);

      const paintCanvas = document.querySelector(".js-paint");
      const context = paintCanvas.getContext("2d");
      if (context) {
        context.lineCap = "round";

        const colorPicker = document.querySelector(".js-color-picker");

        colorPicker.addEventListener("change", (event) => {
          context.strokeStyle = event.target.value;
        });

        const lineWidthRange = document.querySelector(".js-line-range");
        const lineWidthLabel = document.querySelector(".js-range-value");

        lineWidthRange.addEventListener("input", (event) => {
          const width = event.target.value;
          lineWidthLabel.innerHTML = width;
          context.lineWidth = width;
        });

        let x = 0,
          y = 0;
        let isMouseDown = false;

        const stopDrawing = () => {
          isMouseDown = false;
        };
        const startDrawing = (event) => {
          isMouseDown = true;
          [x, y] = [event.offsetX, event.offsetY];
        };
        const drawLine = (event) => {
          if (isMouseDown) {
            const newX = event.offsetX;
            const newY = event.offsetY;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(newX, newY);
            context.stroke();
            //[x, y] = [newX, newY];
            x = newX;
            y = newY;
          }
        };

        if (!isDraggable && !isEating) {
          paintCanvas.addEventListener("mousedown", startDrawing);
          paintCanvas.addEventListener("mousemove", drawLine);
          paintCanvas.addEventListener("mouseup", stopDrawing);
          paintCanvas.addEventListener("mouseout", stopDrawing);
          paintCanvas.addEventListener("touchstart", startDrawing);
          paintCanvas.addEventListener("touchmove", drawLine);
          paintCanvas.addEventListener("touchend", stopDrawing);
          paintCanvas.addEventListener("touchcancel", stopDrawing);
        } else {
          paintCanvas.removeEventListener("mousedown", startDrawing);
          paintCanvas.removeEventListener("mousemove", drawLine);
          paintCanvas.removeEventListener("mouseup", stopDrawing);
          paintCanvas.removeEventListener("mouseout", stopDrawing);
          paintCanvas.removeEventListener("touchstart", startDrawing);
          paintCanvas.removeEventListener("touchmove", drawLine);
          paintCanvas.removeEventListener("touchend", stopDrawing);
          paintCanvas.removeEventListener("touchcancel", stopDrawing);
        }

        // Clean up event listeners when the component unmounts
        return () => {
          paintCanvas.removeEventListener("mousedown", startDrawing);
          paintCanvas.removeEventListener("mousemove", drawLine);
          paintCanvas.removeEventListener("mouseup", stopDrawing);
          paintCanvas.removeEventListener("mouseout", stopDrawing);
          paintCanvas.removeEventListener("touchstart", startDrawing);
          paintCanvas.removeEventListener("touchmove", drawLine);
          paintCanvas.removeEventListener("touchend", stopDrawing);
          paintCanvas.removeEventListener("touchcancel", stopDrawing);
          window.removeEventListener("resize", updateCanvasSize);
        };
      }
    }
  }, [nameSubmitted, isDraggable, isEating]);

  useEffect(() => {
    if (isEating) {
      burp.currentTime = 0; // Reset audio to beginning
      burp.play();

      const canvas = document.getElementById("monster-canvas");
      const context = canvas.getContext("2d");

      // Clear the entire canvas
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      setTextEntered("");

      setTimeout(() => {
        setIsEating(false);
        setIsDraggable(false);
      }, 3000);
    }
  }, [isEating]);

  // Function to update canvas size based on CSS width and height
  function updateCanvasSize() {
    if (isDrawing && !isDraggable) {
      // Get the canvas element
      const canvas = document.getElementById("monster-canvas");

      // Store the current drawing state
      const context = canvas.getContext("2d");
      const lineWidth = context.lineWidth;
      const strokeStyle = context.strokeStyle;

      // Get the computed styles of the canvas element
      const computedStyles = window.getComputedStyle(canvas);

      // Get the CSS height and width in pixels
      const cssWidth = computedStyles.getPropertyValue("width");
      const cssHeight = computedStyles.getPropertyValue("height");

      // Remove "px" from the values to get only the numeric part
      const widthInPixels = parseInt(cssWidth, 10);
      const heightInPixels = parseInt(cssHeight, 10);

      // Set the width and height HTML attributes of the canvas element
      canvas.setAttribute("width", widthInPixels.toString());
      canvas.setAttribute("height", heightInPixels.toString());

      // Redraw the canvas content
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
    }
  }

  const clearCanvas = () => {
    const canvas = document.getElementById("monster-canvas");
    const context = canvas.getContext("2d");

    // Clear the entire canvas
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = lightBlueHex;
    e.target.style.color = "black";
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = darkBlueHex;
    e.target.style.color = "white";
  };

  const handleButtonClick = () => {
    setIsDraggable(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    //const canvasData = event.dataTransfer.getData('monster-canvas');
    //const canvas = document.getElementById(canvasData);
    //const dropzone = document.getElementById('dropzone');
    //dropzone.appendChild(canvas);
    if (isDraggable) {
      setIsEating(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <AppBackground />
      <AppHeader />
      <h2>Worry Monster</h2>
      <div className="m-4">
        <div className="row" style={{ position: "relative" }}>
          <div className="col-md-8 p-1">
            <div hidden={isEating}>
              {nameSubmitted ? (
                <>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="drawCheckbox"
                          checked={isDrawing}
                          onChange={() => setIsDrawing(!isDrawing)}
                          aria-labelledby="drawCheckboxLabel"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="drawCheckbox"
                          id="drawCheckboxLabel"
                        >
                          Draw
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="textCheckbox"
                          checked={isText}
                          onChange={() => setIsText(!isText)}
                          aria-labelledby="textCheckboxLabel"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="textCheckbox"
                          id="textCheckboxLabel"
                        >
                          Text
                        </label>
                      </div>
                    </div>
                    <div className="col-md-8" hidden={!isDrawing}>
                      <input
                        data-testid="color-picker"
                        type="color"
                        className="js-color-picker  color-picker me-2"
                        aria-label="Select color"
                      />
                      <input
                        type="range"
                        id="pixel-size-picker"
                        className="js-line-range"
                        min="1"
                        max="80"
                        defaultValue={"1"}
                        aria-label="Select pixel size"
                      />
                      <label
                        className="js-range-value ms-1 me-3"
                        htmlFor="pixel-size-picker"
                      >
                        1 px
                      </label>
                      <Button
                        children={"Clear"}
                        onClick={clearCanvas}
                        style={{ marginTop: "0px" }}
                      />
                    </div>
                  </div>
                  <div className="row p-0" hidden={!isDrawing}>
                    <div className="col-md-12 p-0">
                      <canvas
                        id="monster-canvas"
                        data-testid="monster-canvas"
                        className="js-paint  paint-canvas"
                        draggable={isDraggable}
                        aria-label="Monster drawing area"
                        role="img"
                        style={{
                          cursor: isDraggable ? "pointer" : "crosshair",
                        }}
                      ></canvas>
                    </div>
                  </div>
                  {isText && (
                    <div className="row">
                      <div
                        className="col-md-12 p-0"
                        style={{
                          cursor: isDraggable ? "pointer" : "text",
                        }}
                        draggable={isDraggable}
                      >
                        <textarea
                          className="form-control"
                          placeholder="Enter your worry here"
                          rows={isDrawing ? "3" : "10"}
                          value={textEntered}
                          onChange={(e) => setTextEntered(e.target.value)}
                          style={{
                            textAlign: "center",
                            pointerEvents: isDraggable ? "none" : "auto",
                            fontFamily: "Comic Sans MS",
                            marginLeft: "0.5rem",
                            marginRight: "0.5rem",
                            marginTop: isDrawing ? "" : "0.5rem",
                            marginBottom: "0.5rem",
                            border: "2px #3b6db4 solid",
                          }}
                          aria-label="Enter your worry"
                        ></textarea>
                      </div>
                    </div>
                  )}
                  {(isDrawing || isText) && !isEating ? (
                    <div className="text-center">
                      <Button
                        className="my-2"
                        children={
                          isDraggable
                            ? `Now drag your worry to ${monstersName}!`
                            : `Click here when you're ready to feed ${monstersName}!`
                        }
                        onClick={handleButtonClick}
                        disabled={isDraggable}
                        aria-label={
                          isDraggable
                            ? `Now drag your worry to ${monstersName}!`
                            : `Click here when you're ready to feed ${monstersName}!`
                        }
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <h4 className="mb-4">Name your Worry Monster:</h4>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="monster-name-input"
                      placeholder="Enter name"
                      aria-label="Enter name"
                      aria-describedby="button-addon2"
                      onChange={(e) => setMonstersName(e.target.value)}
                    />
                    <button
                      className="btn"
                      type="button"
                      style={{
                        color: "black",
                        backgroundColor: lightBlueHex,
                        border: lightBlueHex,
                      }}
                      onMouseEnter={(e) => handleButtonHover(e)}
                      onMouseLeave={(e) => handleButtonLeave(e)}
                      id="button-addon2"
                      disabled={!monstersName}
                      onClick={() => setNameSubmitted(true)}
                      aria-label="Submit monster name"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="alert alert-primary"
              style={{
                color: "black",
                backgroundColor: lightBlueHex,
                margin: "0px 10px 10px 10px",
                padding: "10px",
              }}
            >
              {isEating ? (
                <>
                  <b>{monstersName}</b> is eating...
                </>
              ) : (
                <>
                  Hello!&nbsp;
                  {monstersName && (
                    <>
                      I am&nbsp;
                      <b>{monstersName}</b>
                    </>
                  )}
                </>
              )}
            </div>
            {isEating ? (
              <img
                id=""
                src="img/worry-eater-mouth-closed.png"
                alt="Worry Monster Eating"
                className="img-fluid"
                draggable="false"
                style={{ width: "80%" }}
                aria-label="Worrying Monster Eating"
              />
            ) : (
              <img
                id="dropzone"
                data-testid="monster-hungry-img"
                src="img/worry-eater-mouth-open.png"
                alt="Worry Monster Hungry"
                className="img-fluid"
                draggable="false"
                style={{ width: "70%" }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                aria-label="Worry Monster Hungry"
              />
            )}
          </div>
        </div>
        {/* <div class="back_button_container">
          <button class="back_button" onClick={() => navigate("/")}>
            <i
              class="fas_back_arrow fa-solid fa-arrow-left"
              alt="back button"
            ></i>
          </button>
        </div> */}
      </div>
    </>
  );
}

export default MonsterPage;
