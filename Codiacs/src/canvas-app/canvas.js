import "./canvas.css";
import canvas_script from "./canvas_script.js";

import AppHeader from "../AppHeader";
function Canvas(props) {
  console.log("canvas.js loaded");
  return (
    <>
      <AppHeader setPageValue={props.setPageValue} title="Drawing Canvas" />

      <main style={{ marginTop: "3%" }}>
        <div className="left-block">
          <div className="colors">
            <button type="button" value="#0000ff"></button>
            <button type="button" value="#009fff"></button>
            <button type="button" value="#0fffff"></button>
            <button type="button" value="#bfffff"></button>
            <button type="button" value="#000000"></button>
            <button type="button" value="#333333"></button>
            <button type="button" value="#666666"></button>
            <button type="button" value="#999999"></button>
            <button type="button" value="#ffcc66"></button>
            <button type="button" value="#ffcc00"></button>
            <button type="button" value="#ffff00"></button>
            <button type="button" value="#ffff99"></button>
            <button type="button" value="#003300"></button>
            <button type="button" value="#555000"></button>
            <button type="button" value="#00ff00"></button>
            <button type="button" value="#99ff99"></button>
            <button type="button" value="#f00000"></button>
            <button type="button" value="#ff6600"></button>
            <button type="button" value="#ff9933"></button>
            <button type="button" value="#f5deb3"></button>
            <button type="button" value="#330000"></button>
            <button type="button" value="#663300"></button>
            <button type="button" value="#cc6600"></button>
            <button type="button" value="#deb887"></button>
            <button type="button" value="#aa0fff"></button>
            <button type="button" value="#cc66cc"></button>
            <button type="button" value="#ff66ff"></button>
            <button type="button" value="#ff99ff"></button>
            <button type="button" value="#e8c4e8"></button>
            <button type="button" value="#ffffff"></button>
          </div>
          <div className="brushes">
            <button type="button" value="1"></button>
            <button type="button" value="2"></button>
            <button type="button" value="3"></button>
            <button type="button" value="4"></button>
            <button type="button" value="5"></button>
          </div>
          <div className="buttons">
            <button id="clear" type="button">
              Clear
            </button>
            <button id="save" type="button">
              Save
            </button>
          </div>
        </div>
        <div className="right-block">
          <canvas id="paint-canvas" width="640" height="400"></canvas>
          <script src={canvas_script} defer></script>
        </div>
      </main>

      {/* {document.getElementById("paint-canvas") !== null ? (
        <script src={canvas_script}></script> : null
      )} */}
      {/* <OpenCanvas /> */}
    </>
  );
}
export default Canvas;