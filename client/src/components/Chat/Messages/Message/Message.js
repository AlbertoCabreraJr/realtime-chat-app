import "./message.css";
import { useSelector } from "react-redux";

const Message = ({ message: { text, user } }) => {
  const currentUser = useSelector((state) => state.user);

  let isSentByCurrentUser = false;

  const trimmedCurrentUser = currentUser.name.trim();

  if (user === trimmedCurrentUser) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedCurrentUser}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
