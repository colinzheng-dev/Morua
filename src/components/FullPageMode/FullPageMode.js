import React, { useEffect, useState } from "react";
import ReactMarkdownWithHtml from "react-markdown/with-html";

import classes from "./FullPageMode.module.scss";

function FullPageMode({ src }) {
  const [markDown, setMarkDown] = useState("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => setMarkDown(text));
  });
  return (
    <div className={classes.container}>
      <ReactMarkdownWithHtml children={markDown} allowDangerousHtml />
    </div>
  );
}

export default FullPageMode;
