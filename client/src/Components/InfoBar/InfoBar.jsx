import closeIcon from "../../Icons/closeIcon.png";
import onlineIcon from "../../Icons/onlineIcon.png";
import "./infobar.scss";

export default function InfoBar({ room }) {
  return (
    <>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <img src={onlineIcon} alt="online image" className="onlineIcon" />
          <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
          <a href="/">
            <img src={closeIcon} alt="Close image" />
          </a>
        </div>
      </div>
    </>
  );
}
