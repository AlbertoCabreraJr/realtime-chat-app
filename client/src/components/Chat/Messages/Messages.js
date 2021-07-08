import "./messages.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

const Messages = ({ messages }) => {
  return (
    <ScrollToBottom className="messages-container">
      {messages
        .filter((message) => message.text.length > 0)
        .map((message, index) => (
          <div key={index}>
            <Message message={message} />
          </div>
        ))}
    </ScrollToBottom>
  );
};

export default Messages;
