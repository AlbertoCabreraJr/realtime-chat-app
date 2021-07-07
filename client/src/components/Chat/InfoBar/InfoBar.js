import "./infobar.css";

const InfoBar = ({ goBackHandler, logoutHandler, room: { roomName } }) => {
  return (
    <div className="infobar-container">
      <div id="left">
        <button className="infobar-goback-button" onClick={goBackHandler}>
          Go Back
        </button>
      </div>
      <div id="right">
        <button className="infobar-logout-button" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <div id="center">{roomName}</div>
    </div>
  );
};

export default InfoBar;
