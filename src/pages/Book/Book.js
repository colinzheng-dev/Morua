import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import Layout from "../../components/Layout/Layout";
import classes from "./Book.module.scss";

function Book() {
  const { language } = useParams();
  const [markDown, setMarkDown] = useState("");

  useEffect(() => {
    fetch(`/dataset/TheBook/${language}/[TheBook].md`)
      .then((res) => res.text())
      .then((text) => setMarkDown(text));
  }, [language]);

  useEffect(() => {
    const img = document.querySelector("img");
    if (img) {
      img.addEventListener("click", openPublisherURL);

      return () => {
        img.removeEventListener("click", openPublisherURL);
      };
    }
  });

  const openPublisherURL = () => {
    window.open(
      "https://livre.fnac.com/a15602596/Sebastien-Philippe-Toxique",
      "_blank"
    );
  };

  return (
    <Layout title={language === "en" ? "The Book" : "LE LIVRE"}>
      <div className={classes.container}>
        <ReactMarkdown source={markDown} />
      </div>
    </Layout>
  );
}

export default Book;
