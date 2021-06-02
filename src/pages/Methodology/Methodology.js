import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdownWithHtml from "react-markdown/with-html";

import Layout from "../../components/Layout/Layout";
import classes from "./Methodology.module.scss";

function Methodology() {
  const { language } = useParams();
  const [markDown, setMarkDown] = useState("");

  useEffect(() => {
    fetch(`/dataset/Methodology/${language}/[Methodology].md`)
      .then((res) => res.text())
      .then((text) => setMarkDown(text));
  }, [language]);

  return (
    <Layout title={language === "en" ? "METHODOLOGY" : "MÉTHODOLOGIE"}>
      <div className={classes.container}>
        <ReactMarkdownWithHtml allowDangerousHtml children={markDown} />
      </div>
    </Layout>
  );
}

export default Methodology;
