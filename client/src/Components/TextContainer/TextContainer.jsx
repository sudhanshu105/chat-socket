import onlineIcon from "../../Icons/onlineIcon.png";

import "./textContainer.scss";
import InfoBar from "../InfoBar/InfoBar";

const TextContainer = ({ users, room }) => (
  <div className="textContainer">
    <div>
      <InfoBar room={room} />
    </div>
    {users ? (
      <div>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
