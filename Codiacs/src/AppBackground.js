import React, { useRef, useEffect, useState } from "react";
//import SafewordButton from "./safe-word/SafewordButton";
import listetingEarLogoTop from "./images/LISTENING EAR ICON CMYK TOP.jpg";
import listetingEarLogoBottom from "./images/LISTENING_EAR_ICON_CMYK_BOTTOM.jpg";
import listetingEarLogoTopDark from "./images/LISTENING_EAR_ICON_CMYK_TOP_DARK.png";
import listetingEarLogoBottomDark from "./images/LISTENING_EAR_ICON_CMYK_BOTTOM_DARK.png";
//import listetingEarLogoTopRight from "./images/LISTENING EAR MAIN.jpg.png";
import "./fontawesome-free-6.5.1-web/css/all.css";

function AppBackground(props) {
  const elementRef = useRef(null);
  const [isDark, setIsDark] = useState(false);
  const setIsDarkMode = props.setIsDarkMode ? props.setIsDarkMode : null;

  useEffect(() => {
    if (elementRef.current) {
      const parentElement = elementRef.current.parentElement;
      setIsDark(parentElement.className.split(" ").includes("bg-dark"));

      // Callback function to execute when mutations are observed
      const handleMutations = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.attributeName === "class") {
            //console.log("Parent class name changed:", parentElement.className);
            setIsDark(parentElement.className.split(" ").includes("bg-dark"));
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(handleMutations);

      // Start observing the target node for configured mutations
      observer.observe(parentElement, { attributes: true });

      // Clean up the observer when the component unmounts
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (setIsDarkMode) {
      setIsDarkMode(isDark);
    }
  }, [isDark]);

  return (
    <>
      <div ref={elementRef} className="background_branding">
        {!props.hideBackground && (
          <>
            <div>
              <img
                src={isDark ? listetingEarLogoTopDark : listetingEarLogoTop}
                className="top_branding"
                alt="Listening Ear Logo"
                aria-label="Listening Ear Logo"
                draggable={false}
              />
            </div>

            <div>
              <img
                src={
                  isDark ? listetingEarLogoBottomDark : listetingEarLogoBottom
                }
                className="bottom_branding"
                alt="Listening Ear Logo"
                aria-label="Listening Ear Logo"
                draggable={false}
              />
            </div>
          </>
        )}
        {/* <div>
          <img
            src={listetingEarLogoTopRight}
            className="logo_top_right"
            alt="Listening Ear Logo"
            aria-label="Listening Ear Logo"
            draggable={false}
          />
        </div>
        <div className="col-2 text-center safeword">
          <SafewordButton />
        </div> */}
      </div>

      {/* <div
        className="row"
        style={{
          marginTop: "9%",
        }}
      ></div> */}
    </>
  );
}

export default AppBackground;
