import "./input.scss";

import sendButton from "../../Icons/sendButton.png";

export default function Input({ message, setMessage, sendMessage }) {
  return (
    <>
      <form action="" className="form">
        <input
          type="text"
          name=""
          className="input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button
          className="sendButton"
          onClick={(event) => sendMessage(event)}
          type="submit"
        >
          <img src={sendButton} alt="send" />
        </button>
      </form>
    </>
  );
}
