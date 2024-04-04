import React from "react";
import SafewordButton from "./safe-word/SafewordButton";
import listetingEarLogoTop from "./images/LISTENING EAR ICON CMYK TOP.jpg";
import listetingEarLogoBottom from "./images/LISTENING_EAR_ICON_CMYK_BOTTOM.jpg";
import listetingEarLogoTopRight from "./images/LISTENING EAR MAIN.jpg";
import "./fontawesome-free-6.5.1-web/css/all.css";

function AppBackground(props) {
  return (
    <>
      <div className="background_branding">
        {!props.EMDRTheme && (
          <>
            <div>
              <img
                src={listetingEarLogoTop}
                className="top_branding"
                alt="Listening Ear Logo"
                aria-label="Listening Ear Logo"
                draggable={false}
              />
            </div>

            <div>
              <img
                src={listetingEarLogoBottom}
                className="bottom_branding"
                alt="Listening Ear Logo"
                aria-label="Listening Ear Logo"
                draggable={false}
              />
            </div>
          </>
        )}
        <div>
          <img
            src={listetingEarLogoTopRight}
            className="logo_top_right"
            alt="Listening Ear Logo"
            aria-label="Listening Ear Logo"
            draggable={false}
          />
        </div>
      </div>

      <div
        className="row"
        style={{
          marginLeft: "2%",
          marginTop: "2%",
        }}
      >
        <div className="col-2 text-center safeword">
          <SafewordButton />
        </div>
      </div>
    </>
  );
}

export default AppBackground;
