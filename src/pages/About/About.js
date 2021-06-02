import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import Layout from "../../components/Layout/Layout";
import classes from "./About.module.scss";

import Logos from "../../assets/images/about_3_combined.png";

function About(props) {
  const { language } = useParams();
  const [markDown, setMarkDown] = useState("");

  useEffect(() => {
    fetch(`/dataset/About/${language}/[About].md`)
      .then((res) => res.text())
      .then((text) => setMarkDown(text));
  }, [language]);
  return (
    <Layout title={language === "en" ? "About" : "A PROPOS"}>
      <div className={classes.container}>
        <ReactMarkdown source={markDown} />

        <div className={classes.divider} />

        <img className={classes.logo} src={Logos} alt="logos" />
      </div>
    </Layout>
  );
}

export default About;
