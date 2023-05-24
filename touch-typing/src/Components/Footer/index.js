import React from "react";
import "./index.css";

function Footer() {
  return (
    <div className="footer-container">
      <p className="created-by">
        Created by{" "}
        <a
          className="username-link"
          href="https://github.com/Lichi-Dev"
          target="_blank"
        >
          @Lichi-Dev
        </a>
      </p>
      <a
        href="https://github.com/Lichi-Dev/TouchTyping"
        className="github-link"
        target="_blank"
      >
        &lt;/&gt; Github
      </a>
    </div>
  );
}

export default Footer;
