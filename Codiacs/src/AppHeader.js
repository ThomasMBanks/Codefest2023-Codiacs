import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SafewordButton from "./safe-word/SafewordButton";
import listetingEarLogoTopRight from "./images/LISTENING EAR MAIN.jpg.png";
import "./fontawesome-free-6.5.1-web/css/all.css";

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname.split("/")[1] ? false : true;

  const handleBackButtonClick = () => {
    navigate(isHomePage ? "/login" : "/");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-5 text-md-start">
          <div class="back_button_container">
            <button
              class={isHomePage ? "sign_out_button" : "back_button"}
              onClick={handleBackButtonClick}
            >
              <i
                class="fas_back_arrow fa-solid fa-arrow-left"
                alt="back button"
              >
                {isHomePage && "Log out"}
              </i>
            </button>
          </div>
        </div>
        <div className="col-md-2 text-center">
          <SafewordButton />
        </div>
        <div className="col-md-5 text-md-end">
          <img
            src={listetingEarLogoTopRight}
            className="logo_top_right"
            alt="Listening Ear Logo"
            aria-label="Listening Ear Logo"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}

export default AppHeader;
