import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./DeclassifiedDocument.module.scss";

import Layout from "../../components/Layout/Layout";
import { ReactComponent as DocENTimeLine } from "../../assets/svgs/DeclassifiedDoc-timeline_EN.svg";
import { ReactComponent as DocFRTimeLine } from "../../assets/svgs/DeclassifiedDoc-timeline_FR.svg";

function DeclassifiedDocument() {
  const [docList, setDocList] = useState([]);
  const [desc, setDesc] = useState("");
  const { language } = useParams();

  useEffect(() => {
    fetch(`/dataset/Declassified Documents/${language}/documentsList.json`)
      .then((res) => res.json())
      .then((json) => {
        setDocList(json);
      });

    fetch(
      `/dataset/Declassified Documents/${language}/[Declassified Documents].md`
    )
      .then((res) => res.text())
      .then((text) => {
        setDesc(text);
      });
  }, [language]);

  const getFileName = (file) => {
    return file["fname"].split(".").slice(0, -1).join(".");
  };

  return (
    <Layout
      title={
        language === "en" ? "DECLASSIFIED DOCUMENTS" : "DOCUMENTS DECLASSIFIES"
      }
    >
      <div className={classes["story-container"]}>
        <p>{desc}</p>
      </div>

      {language === "en" ? <DocENTimeLine /> : <DocFRTimeLine />}

      <div className={classes["browse-doc-container"]}>
        <h1>
          {language === "en" ? "Browse in documents" : "Explorer les documents"}
        </h1>
        <ul>
          {docList.map((docDir) => {
            return (
              <li>
                <div className={classes["top-dir-list-item"]}>
                  {Object.keys(docDir)}
                </div>
                <ul>
                  {Object.values(docDir).map((subDir) => {
                    return !subDir[0].hasOwnProperty("fname") ? (
                      <ul>
                        {Object.values(subDir).map((childDir) => {
                          return (
                            <li>
                              <div className={classes["child-dir-list-item"]}>
                                {Object.keys(childDir)}
                              </div>
                              <ul>
                                {Object.values(childDir)[0].map((childFile) => {
                                  return (
                                    <li className={classes["file-list-tiem"]}>
                                      <Link 
                                        to={{
                                          pathname: `/documents/${childFile["docId"]}`,
                                          state: {
                                            path: childFile["path"]
                                          }
                                        }} 
                                        key={childFile["path"]}>
                                          {getFileName(childFile)}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <ul>
                        {Object.values(subDir).map((childFile) => {
                          return (
                            <li className={classes["file-list-tiem"]}>
                              <Link 
                                to={{
                                  pathname: `/documents/${childFile["docId"]}`,
                                  state: {
                                    path: childFile["path"]
                                  }
                                }} 
                                key={childFile["path"]}>
                                  {getFileName(childFile)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default DeclassifiedDocument;
