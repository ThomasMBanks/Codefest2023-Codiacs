import { React, useState } from "react";
import "./memory.css";

function Memory(props) {
  const [amount, setAmount] = useState(50);

  var borderColour = props.memoryColour;
  if (props.memoryColour === "#ffffff") {
    borderColour = "#000000";
  }

  var className = "memory-icon";
  if (props.showSlider) {
    className += " with-slider";
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className={className}
        style={{
          border: "1px solid " + borderColour,
          backgroundColor: props.memoryColour,
        }}
        onClick={props.onClick}
      >
        <div className="memory-text">{props.memory}</div>

        {props.showSlider && (
          <div className="form-group mt-2">
            <input
              type="range"
              className="form-control-range"
              id="amountSlider"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                props.amounts[props.counter] = e.target.value;
                props.createPercentages();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Memory;
