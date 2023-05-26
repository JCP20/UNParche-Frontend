import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  MailOutlined,
} from "@ant-design/icons";

const ShareSocials = ({ url }: { url: string }) => {
  return (
    <div className="share-socials">
      <span>Compartir en:</span>
      <div className="share-icon-collections">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
        >
          <FacebookOutlined className="share-icon" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent("Revisa este evento en UnParche!\n")}\n`}
          target="_blank"
        >
          <TwitterOutlined className="share-icon" />
        </a>
        {/* <a>
          <MailOutlined className="share-icon" />
        </a> */}
      </div>
    </div>
  );
};

export default ShareSocials;
