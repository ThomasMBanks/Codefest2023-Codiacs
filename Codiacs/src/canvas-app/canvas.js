import { useNavigate } from "react-router-dom";
import "./canvas.css";
// import canvas_script from "./canvas_script.js";
import { useEffect, useState } from "react";
import Button from "../components/Button/Button.tsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Modal from "../components/Modal/Modal.tsx";
import AppBackground from "../AppBackground";

function Canvas(props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState("jpeg");
  const [drawingStack, setDrawingStack] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
  };

  useEffect(() => {
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

        const paintCanvas = document.querySelector(".js-paint");
        const context = paintCanvas.getContext("2d");
        setDrawingStack((prevDrawingStack) => [
          ...prevDrawingStack,
          context.getImageData(0, 0, paintCanvas.width, paintCanvas.height),
        ]);
        setUndoStack([]);
      };
      const stopDrawingMouseOut = () => {
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

      paintCanvas.addEventListener("mousedown", startDrawing);
      paintCanvas.addEventListener("mousemove", drawLine);
      paintCanvas.addEventListener("mouseup", stopDrawing);
      paintCanvas.addEventListener("mouseout", stopDrawingMouseOut);
      paintCanvas.addEventListener("touchstart", startDrawing);
      paintCanvas.addEventListener("touchmove", drawLine);
      paintCanvas.addEventListener("touchend", stopDrawing);
      paintCanvas.addEventListener("touchcancel", stopDrawingMouseOut);

      // Clean up event listeners when the component unmounts
      return () => {
        paintCanvas.removeEventListener("mousedown", startDrawing);
        paintCanvas.removeEventListener("mousemove", drawLine);
        paintCanvas.removeEventListener("mouseup", stopDrawing);
        paintCanvas.removeEventListener("mouseout", stopDrawingMouseOut);
        paintCanvas.removeEventListener("touchstart", startDrawing);
        paintCanvas.removeEventListener("touchmove", drawLine);
        paintCanvas.removeEventListener("touchend", stopDrawing);
        paintCanvas.removeEventListener("touchcancel", stopDrawingMouseOut);
        window.removeEventListener("resize", updateCanvasSize);
      };
    }
  }, []);

  // Function to update canvas size based on CSS width and height
  function updateCanvasSize() {
    // Get the canvas element
    const canvas = document.getElementById("paint-canvas");

    // Store the current drawing state
    if (canvas) {
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
    const canvas = document.getElementById("paint-canvas");
    const context = canvas.getContext("2d");

    // Clear the entire canvas
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      //setDrawingStack([]);
      // setUndoStack((prevUndoStack) => [
      //   ...prevUndoStack,
      //   context.getImageData(0, 0, canvas.width, canvas.height),
      // ]);
      //setUndoStack([]);
      setDrawingStack((prevDrawingStack) => [
        ...prevDrawingStack,
        context.getImageData(0, 0, canvas.width, canvas.height),
      ]);
    }
  };

  const undoCanvas = () => {
    const paintCanvas = document.querySelector(".js-paint");
    const context = paintCanvas.getContext("2d");
    if (context && drawingStack.length >= 2) {
      context.putImageData(drawingStack[drawingStack.length - 2], 0, 0);
      setUndoStack((prevUndoStack) => [
        ...prevUndoStack,
        drawingStack[drawingStack.length - 1],
      ]);
      setDrawingStack([...drawingStack.slice(0, -1)]);
    } else if (context && drawingStack.length === 1) {
      clearCanvas();
      setUndoStack((prevUndoStack) => [
        ...prevUndoStack,
        drawingStack[drawingStack.length - 1],
      ]);
      setDrawingStack([]);
    }
  };

  const redoCanvas = () => {
    const paintCanvas = document.querySelector(".js-paint");
    const context = paintCanvas.getContext("2d");
    if (context && undoStack.length >= 1) {
      context.putImageData(undoStack[undoStack.length - 1], 0, 0);
      setDrawingStack((prevDrawingStack) => [
        ...prevDrawingStack,
        undoStack[undoStack.length - 1],
      ]);
      setUndoStack([...undoStack.slice(0, -1)]);
    }
  };

  const saveCanvas = () => {
    setShowModal(false);
    const canvas = document.getElementById("paint-canvas");

    // Use html2canvas library to capture the canvas content as an image
    html2canvas(canvas).then((canvas) => {
      // Generate today's date components
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const year = today.getFullYear();

      // Construct the filename with today's date in DD_MM_YYYY format
      const filename = `canvas_image_${day}_${month}_${year}.${selectedFileType}`;

      // Convert the canvas to a data URL representing the image
      if (selectedFileType === "pdf") {
        const imageDataURL = canvas.toDataURL("image/jpeg");
        // Create a new jsPDF instance with landscape orientation
        const pdf = new jsPDF("landscape");

        // Calculate the aspect ratio of the canvas
        const aspectRatio = canvas.width / canvas.height;

        // Calculate the width and height of the PDF page based on the canvas size
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pageWidth / aspectRatio;

        // Add the canvas image as a page to the PDF
        pdf.addImage(imageDataURL, "JPEG", 0, 0, pageWidth, pageHeight);

        // Save the PDF file
        pdf.save(filename);
      } else {
        // Convert the canvas to a data URL representing the image
        const imageDataURL = canvas.toDataURL("image/" + selectedFileType);
        // Create a link element
        const link = document.createElement("a");
        link.href = imageDataURL;

        // Set the filename for the downloaded file
        link.download = filename;

        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger a click event on the link to start the download
        link.click();

        // Remove the link from the document body
        document.body.removeChild(link);
      }
    });
  };

  const printCanvas = () => {
    const canvas = document.getElementById("paint-canvas");

    // Print canvas content
    var printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(
      "<html><head><title>DTR Canvas</title></head><body>"
    );
    printWindow.document.write(
      '<img src="' + canvas.toDataURL() + '" style="width:100%;">'
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <>
      <AppBackground />
      <div style={{ position: "relative" }}>
        <div className="row" style={{ marginTop: "20vh" }}>
          <div className="col-md-12">
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
            <Button children={<>Clear &#128465;</>} onClick={clearCanvas} />
            <Button children={<>Undo &#8617;</>} onClick={undoCanvas} />
            <Button children={<>Redo &#8618;</>} onClick={redoCanvas} />
            <Button
              children={<>Save &#128190;</>}
              onClick={() => setShowModal(true)}
            />
            <Button children={<>Print &#128424;</>} onClick={printCanvas} />
          </div>
        </div>
        <div className="row p-0">
          <div className="col-md-12 p-0">
            <canvas
              id="paint-canvas"
              data-testid="paint-canvas"
              className="js-paint  paint-canvas"
              draggable="false"
              aria-label="Monster drawing area"
              role="img"
            ></canvas>
          </div>
          <button className="button back_button" onClick={() => navigate("/")}>
            <i
              className="fas_back_arrow fa-solid fa-arrow-left"
              alt="back button"
            ></i>
            Back
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          heading="Select file type"
          footer={
            <Button light onClick={saveCanvas}>
              Download
            </Button>
          }
          noClose={undefined}
          onClose={() => setShowModal(false)}
        >
          <select
            className="form-select"
            value={selectedFileType}
            onChange={handleFileTypeChange}
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
          </select>
        </Modal>
      )}
    </>
  );
}
export default Canvas;
