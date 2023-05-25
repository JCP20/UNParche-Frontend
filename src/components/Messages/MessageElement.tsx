import React from "react";

interface MessageElementProps {
  message: any;
  sentByMe: boolean;
  ref?: React.MutableRefObject<any>;
}

const MessageElement = ({ message, sentByMe, ref }: MessageElementProps) => {
  const extractURL = (messageText: string) => {
    // Regular expression to extract URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = messageText.match(urlRegex);
    return urls ? urls[0] : null;
  };

  const renderMessageContent = () => {
    const url = extractURL(message.text);
    if (url) {
      const parts = message.text.split(url);
      return (
        <p className="message__text">
          {parts[0]}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          {parts[1]}
        </p>
      );
    } else {
      return <p className="message__text">{message.text}</p>;
    }
  };

  return (
    <div
      ref={ref}
      className={sentByMe ? "message messageRight" : "message messageLeft"}
    >
      <div>
        <p className="message__sentAt">{message.createdAt}</p>
      </div>
      {/* <p className="message__text">{message.text}</p> */}
      {renderMessageContent()}
    </div>
  );
};

export default MessageElement;
