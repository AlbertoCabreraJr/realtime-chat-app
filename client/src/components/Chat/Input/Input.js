import "./input.css";
import send from "../../../pictures/send.png";

const Input = ({ message, setMessage, sendMessageHandler }) => {
  return (
    <div className="input-container">
      <div className="input-message-container">
        <input
          type="text"
          className="input-message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessageHandler(e) : null)}
        />
      </div>
      <img
        src={send}
        className="send-message"
        onClick={sendMessageHandler}
        alt="Send-Logo"
      />
    </div>
  );
};

export default Input;
