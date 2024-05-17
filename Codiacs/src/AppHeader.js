import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SafewordButton from "./safe-word/SafewordButton";
import listetingEarLogoTopRight from "./images/LISTENING EAR MAIN.jpg.png";
import "./fontawesome-free-6.5.1-web/css/all.css";
import Button from "./components/Button/Button.tsx";
import Modal from "./components/Modal/Modal.tsx";

function AppHeader(props) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [usersName, setUsersName] = useState("");
  const [safewordName, setSafewordName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname.split("/")[1] ? false : true;

  useEffect(() => {
    if (isHomePage) {
      setShowSettingsModal(true);
    }
  }, []);

  useEffect(() => {
    setTheme(props.theme || "light");
  }, [props.theme]);

  const handleBackButtonClick = () => {
    if (isHomePage) {
      setShowSettingsModal(true);
    } else {
      navigate(isHomePage ? "/login" : "/");
    }
  };

  const applySettings = () => {
    setShowSettingsModal(false);
    props.setUsersName(usersName);
    props.setTheme(theme);
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-5 text-sm-start">
          <button class="back_button m-3" onClick={handleBackButtonClick}>
            {isHomePage ? (
              <span
                class="text-center fas_back_arrow fa-solid"
                aria-label="Settings"
              >
                ⚙
              </span>
            ) : (
              <i
                class="fas_back_arrow fa-solid fa-arrow-left"
                alt="back button"
              ></i>
            )}
          </button>
        </div>
        <div className="col-sm-2 text-center">
          <SafewordButton name={safewordName} />
        </div>
        <div className="col-md-5 text-md-end">
          <img
            src={listetingEarLogoTopRight}
            className="m-3"
            alt="Listening Ear Logo"
            aria-label="Listening Ear Logo"
            draggable={false}
          />
        </div>
      </div>
      {showSettingsModal && (
        <Modal
          heading="Settings (Under construction)"
          footer={
            <Button light onClick={applySettings}>
              Apply
            </Button>
          }
          noClose
          onClose={() => setShowSettingsModal(false)}
        >
          <label id="nameLabel" htmlFor="nameInput" className="form-label">
            Your name:
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="nameInput"
            value={usersName}
            onChange={(e) => setUsersName(e.target.value)}
            aria-labelledby="nameLabel"
          />
          <label
            id="safewordLabel"
            htmlFor="safewordInput"
            className="form-label"
          >
            Your safe word:
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="safewordInput"
            value={safewordName}
            onChange={(e) => setSafewordName(e.target.value)}
            aria-labelledby="safewordLabel"
          />
          <label
            id="mainThemeLabel"
            htmlFor="mainThemeSelect"
            className="form-label"
          >
            Theme:
          </label>
          <select
            className="form-select"
            id="mainThemeSelect"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            aria-labelledby="mainThemeLabel"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </Modal>
      )}
    </>
  );
}

export default AppHeader;
