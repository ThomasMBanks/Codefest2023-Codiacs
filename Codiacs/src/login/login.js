import { useNavigate } from "react-router-dom";

import "./login.css";

import listetingEarLogoTop from "../images/LISTENING EAR ICON CMYK TOP.jpg";
import listetingEarLogoBottom from "../images/LISTENING_EAR_ICON_CMYK_BOTTOM.jpg";
import listetingEarLogoMain from "../images/LISTENING EAR MAIN.jpg.png";

function LoginPage(props) {
  const navigate = useNavigate();

  return (
    <>
      <div class="background_branding">
        <div>
          <img
            src={listetingEarLogoTop}
            class="top_branding login_top_branding"
            alt="Listening Ear Logo"
            aria-label="Listening Ear Logo"
          />
        </div>
        <div>
          <img
            src={listetingEarLogoBottom}
            class="bottom_branding login_bottom_branding"
            alt="Listening Ear Logo"
            aria-label="Listening Ear Logo"
          />
        </div>
      </div>

      <div class="login">
        <form action="">
          <div>
            <img
              src={listetingEarLogoMain}
              class="logo_centeral"
              alt="Listening Ear Logo"
              aria-label="Listening Ear Logo"
            />
          </div>
          <div class="input_display">
            <label for="Username">Username</label>
            <input
              placeholder="Please Enter Username"
              class="user_input"
              type="text"
              aria-label="Please Enter Username"
            />
          </div>
          <div class="input_display">
            <label for="Password">Password</label>
            <input
              placeholder="Please Enter Password"
              class="user_input"
              type="password"
              aria-label="Please Enter Password"
            />
          </div>
          <div class="login_buttons">
            <button
              type="button"
              class="button"
              aria-label="Retry Button"
              style={{ minWidth: "48%" }}
            >
              Retry
            </button>
            <button
              type="button"
              class="button"
              aria-label="Confirm Button"
              onClick={() => navigate("/")}
              style={{ minWidth: "48%" }}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
