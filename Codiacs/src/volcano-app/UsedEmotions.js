import { React } from "react";
import "../components/Button/Button.css";

function UsedEmotions(props) {
  const words = props.emotions;

  return (
    <>
      {words.map((word) => {
        return (
          <div
            key={word}
            className="used-emotion button"
            style={{ position: "relative", zIndex: 1, cursor: "default" }}
          >
            {word}
          </div>
        );
      })}
    </>
  );
}

export default UsedEmotions;
