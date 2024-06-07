import { React } from "react";
import Button from "../components/Button/Button.tsx";

function UnusedEmotions(props) {
  const words = props.emotions;
  const setClickedEmotion = props.setClickedEmotion;

  function handleOnDrag(e, emotion) {
    e.dataTransfer.setData("emotion", emotion);
  }

  function handleClick(e, emotion) {
    if (e.key === "Enter") {
      setClickedEmotion(emotion);
    }
  }

  return (
    <>
      {words.map((word) => {
        return (
          <Button
            key={word}
            className="unused-emotion"
            data-testid={word}
            draggable
            onDragStart={(e) => handleOnDrag(e, word)}
            onKeyDown={(e) => handleClick(e, word)}
            aria-label="Press enter to add this emotion to the volcano"
            style={{ position: "relative", zIndex: 1 }}
          >
            {word}
          </Button>
        );
      })}
    </>
  );
}

export default UnusedEmotions;
