import React, { useEffect, useState } from "react";
import { BiLinkAlt } from "react-icons/bi";

/**
 *
 * @param {string} className - Allows styling of the button otherwise use default class for button
 * @param {string} text - Has a default text of "Share" otherwise use text passed into component
 * @param {string|Array} urlToWatch - State or States to watch for. When an update is triggered the correct url will be linked to the button.
 *
 * CSS is located at /src/data-browser/graphs/graphs.css
 */

const CopyURLButton = ({ className, text, urlToWatch }) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setCopied(false);

    // Hide tooltip after 2.5 seconds
    setTimeout(() => {
      setShowTooltip(false);
    }, 2500);
  }, [urlToWatch, showTooltip]);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setShowTooltip(true);
  }

  return (
    <>
      <button
        className={className ? className : "CopyURLButton"}
        onClick={copy}
      >
        <div style={{ display: "flex" }}>
          <BiLinkAlt
            style={{ marginRight: "4px", fill: "white" }}
            fontWeight={"bold"}
          />
          {text ? text : "Link"}
          {showTooltip ? (
            <span
              className="tooltiptext"
              style={showTooltip ? { visibility: "visible" } : ""}
            >
              Link Copied
            </span>
          ) : (
            ""
          )}
        </div>
      </button>
    </>
  );
};

export default CopyURLButton;
