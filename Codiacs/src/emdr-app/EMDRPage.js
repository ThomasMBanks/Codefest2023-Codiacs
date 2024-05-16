import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EMDR.css";
import AppBackground from "../AppBackground";
import AppHeader from "../AppHeader";

const EMDRPage = (props) => {
  const [speed, setSpeed] = useState(5);
  const [size, setSize] = useState(50);
  const [theme, setTheme] = useState("white");
  const [movement, setMovement] = useState("linear");
  const [fullScreen, setFullScreen] = useState(false);
  const [isMoving, setIsMoving] = useState(true);
  const [isPopOut, setIsPopOut] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const dot = document.getElementById("dot");
    let time = 0;

    function animate() {
      // Get the width of the dot container or the screen
      if (document.getElementById("movementSelect").value === "figureEight") {
        const containerWidth = document.getElementById("dot-col").offsetWidth; // Use dot's container width or window.innerWidth for screen width
        const containerHeight = document.getElementById("dot-col").offsetHeight; // Use dot's container width or window.innerWidth for screen width
        console.log(containerWidth);

        // Update translateX and translateY values dynamically
        const translateX = (Math.sin(time / 100) * (containerWidth - size)) / 2; // Adjust speed and range as needed
        const translateY = (Math.sin(time / 50) * (containerHeight - size)) / 2; // Adjust speed and range as needed

        // Apply transform CSS property to the dot
        dot.style.transform = `translate(${translateX}px, ${translateY}px)`;

        // Increment time for the next frame
        time++;

        // Call animate function recursively for smooth animation
        requestAnimationFrame(animate);
      }
    }

    // Start the animation
    if (movement === "figureEight") animate();
    if (movement === "linear") {
    }

    //reset background colour if browser's forward/backward buttons are clicked
    return () => props.onThemeChange("white");
  }, [movement, props, size]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSpeed = searchParams.get("speed");
    const urlSize = searchParams.get("size");
    const urlTheme = searchParams.get("theme");
    const urlPopout = searchParams.get("popout");

    if (urlSpeed) setSpeed(parseInt(urlSpeed));
    if (urlSize) setSize(parseInt(urlSize));
    if (urlTheme) setTheme(urlTheme === "dark" ? "#212529" : urlTheme);
    if (urlPopout) setIsPopOut(urlPopout === "true");
  }, [location]);

  const handleStartStop = () => {
    setIsMoving(!isMoving);
    const animations = window.document?.querySelectorAll("[data-animation]");
    animations.forEach((animation) => {
      const running = animation.style.animationPlayState || "running";
      animation.style.animationPlayState =
        running === "running" ? "paused" : "running";
    });
  };

  const updateAnimation = () => {
    const dotElement = document.getElementById("dot");
    if (dotElement)
      dotElement.style.setProperty(
        "--animdur",
        `${
          (10.5 - speed) *
          (document.getElementById("dot-col").offsetWidth / 2000)
        }s`
      );
  };

  useEffect(() => {
    updateAnimation();
  }, [speed, fullScreen]);

  useEffect(() => {
    let dot = document.getElementById("dot");
    dot.style.setProperty("--w", `${size * 1.5}px`);
  }, [size]);

  useEffect(() => {
    let dot = document.getElementById("dot");
    dot.style.backgroundColor = theme === "#212529" ? "white" : "black";
    props.onThemeChange(theme);
  }, [theme, props]);

  const handleBackButton = () => {
    props.onThemeChange("white");
    navigate("/");
  };

  const handlePopOut = () => {
    // Specify URL and window properties
    const url =
      window.location.href +
      `?popout=true&size=${size}&speed=${speed}&theme=${
        theme === "#212529" ? "dark" : theme
      }`;
    const windowName = "EMDR Pop Out Window";
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const windowFeatures = "width=" + screenWidth + ",height=" + screenHeight;

    // Open the window
    window.open(url, windowName, windowFeatures);
  };

  // Add event listener to window's resize event
  window.addEventListener("resize", updateAnimation);

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", updateAnimation);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme,
      }}
    >
      {!isPopOut ? (
        <>
          {/* <AppBackground hideBackground={theme} /> */}
          <AppHeader />
          {/* <div class="back_button_container">
            <button class="back_button" onClick={handleBackButton}>
              <i
                class="fas_back_arrow fa-solid fa-arrow-left"
                alt="back button"
              ></i>
            </button>
          </div> */}
        </>
      ) : (
        <button
          id="js-toggle"
          className={
            "btn btn-" + (isMoving ? "danger" : "success") + " m-2 mb-5"
          }
          onClick={() => handleStartStop()}
          aria-label={isMoving ? "Stop movement" : "Start movement"}
        >
          {isMoving ? <>&#10074;&#10074;</> : <>&#9654;</>}
        </button>
      )}
      <div
        data-testid="emdrPage"
        className={`${theme === "#212529" ? " bg-dark text-light" : ""}`}
        style={{ position: "relative", marginTop: isPopOut ? "35vh" : "0vh" }}
      >
        {!isPopOut ? (
          <>
            <h2>EMDR</h2>
            <div className="row">
              <div className={fullScreen ? "" : "col-sm-6"}>
                <div className="mx-2">
                  {!fullScreen && (
                    <>
                      <div className="form-group mt-2">
                        <label htmlFor="sizeSlider" className="me-2">
                          <b>Size</b>
                        </label>
                        <input
                          type="range"
                          className="form-control-range"
                          id="sizeSlider"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          aria-label="Adjust size"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-valuenow={size}
                        />
                      </div>
                      <span>Size: {size}</span>

                      <div className="form-group m-2">
                        <label htmlFor="speedSlider" className="me-2">
                          <b>Speed</b>
                        </label>
                        <input
                          type="range"
                          className="form-control-range"
                          id="speedSlider"
                          max="10"
                          value={speed}
                          onChange={(e) => setSpeed(e.target.value)}
                          aria-label="Adjust speed"
                          aria-valuemin="0"
                          aria-valuemax="10"
                          aria-valuenow={speed}
                        />
                      </div>
                      <span>Speed: {speed}</span>

                      <div className="form-group my-2">
                        <label htmlFor="themeSelect">
                          <b>Background</b>
                        </label>
                        <select
                          className="form-control"
                          id="themeSelect"
                          value={theme}
                          onChange={(e) => setTheme(e.target.value)}
                          aria-label="Select background theme"
                        >
                          <option value="white">Light</option>
                          <option value="#212529">Dark</option>
                          {/* <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option> */}
                          <option value="yellow">Yellow</option>
                        </select>
                      </div>

                      <div className="form-group my-2">
                        <label htmlFor="movementSelect">
                          <b>Movement</b>
                        </label>
                        <select
                          className="form-control"
                          id="movementSelect"
                          value={movement}
                          onChange={(e) => setMovement(e.target.value)}
                          aria-label="Select dot movement pattern"
                        >
                          <option value="linear">Linear</option>
                          {/* <option value="figureEight">Figure of 8</option>
                        <option value="random">Random</option> */}
                        </select>
                      </div>
                    </>
                  )}
                  <button
                    id="js-toggle"
                    className={
                      "btn btn-" +
                      (isMoving ? "danger" : "success") +
                      " m-2 mb-5"
                    }
                    onClick={() => handleStartStop()}
                    aria-label={isMoving ? "Stop movement" : "Start movement"}
                  >
                    {isMoving ? <>&#10074;&#10074;</> : <>&#9654;</>}
                  </button>
                  <button
                    className="btn btn-primary m-2 mb-5"
                    onClick={() => setFullScreen(!fullScreen)}
                    aria-label={fullScreen ? "Show settings" : "Hide settings"}
                  >
                    {fullScreen ? "Show settings" : "Hide settings"}
                  </button>
                  <button
                    className="btn btn-primary m-2 mb-5"
                    onClick={handlePopOut}
                    aria-label="Pop out window"
                  >
                    Pop out window
                  </button>
                </div>
              </div>
              <div className={fullScreen ? "" : "col-sm-6"} id="dot-col">
                {!fullScreen && <p>Preview:</p>}
                <div className="dot-container">
                  <div
                    id="dot"
                    className="dot a-slide"
                    data-animation="stop"
                    aria-label="Moving dot"
                    role="img"
                  ></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="row mt-5">
            <div className="col" id="dot-col">
              <div className="dot-container">
                <div
                  id="dot"
                  className="dot a-slide"
                  data-animation="stop"
                  aria-label="Moving dot"
                  role="img"
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMDRPage;
