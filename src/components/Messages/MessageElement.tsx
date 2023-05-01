import React from "react";

interface MessageElementProps {
  message: any;
  sentByMe: boolean;
  ref?: React.MutableRefObject<any>;
}

const MessageElement = ({ message, sentByMe, ref }: MessageElementProps) => {
  return (
    <div
      ref={ref}
      className={sentByMe ? "message messageRight" : "message messageLeft"}
    >
      <div>
        <p className="message__sentAt">{message.createdAt}</p>
      </div>

      <p className="message__text">{message.text}</p>
    </div>
  );
};

export default MessageElement;
