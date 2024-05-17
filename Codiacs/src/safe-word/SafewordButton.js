import "./SafewordButton.css";
function SafewordButton(props) {
  return (
    <button
      className="btn circle my-2"
      onClick={() => alert("Safe Word button pressed. Please stop.")}
    >
      <span
        style={{
          fontWeight: "bold",
          fontSize: "15pt",
          wordWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        {props.name ? props.name : "Safe Word"}
      </span>
    </button>
  );
}

export default SafewordButton;
