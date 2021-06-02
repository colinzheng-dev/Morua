import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useMediaQuery } from "react-responsive";

import { toggleSidebar } from "../../store/index";

import classes from "./Sidebar.module.scss";
import classNames from "classnames";

import { ReactComponent as CloseIcon } from "../../assets/icons/cancel-circle.svg";

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const language = useSelector((state) => state.language);
  const isMobile = useMediaQuery({ query: "(max-width: 1264px)" });
  const dispatch = useDispatch();

  const enItems = [
    {
      title: "Moruroa Files",
      path: "/",
    },
    {
      title: "ABOUT",
      path: "/about",
    },
    {
      title: "INVESTIGATION",
      path: "/investigation/moruroa-files/",
      children: [
        {
          title: "Moruroa Files",
          path: "/investigation/moruroa-files/",
          children: [
            {
              title: "Cancer cluster in the Gambier Islands",
              path: "/investigation/moruroa-files/#ALDEBARAN",
            },
            {
              title: "Forgotten victims of Encelade test",
              path: "/investigation/moruroa-files/#ENCELADE",
            },
            {
              title: "Tahiti's hidden contamination",
              path: "/investigation/moruroa-files/#CENTAURE",
            },
          ],
        },
        {
          title: "The compensation trap",
          path: "/investigation/battle-for-compensation",
        },
        {
          title: "Evidence of a lie",
          path: "/investigation/findings-of-investigation",
        },
      ],
    },
    {
      title: "DECLASSIFIED DOCUMENTS",
      path: "/declassified-documents",
    },
    {
      title: "METHODOLOGY",
      path: "/methodology",
    },
    {
      title: "TEAM",
      path: "/team",
    },
    {
      title: "THE BOOK",
      path: "/book",
    },
  ];

  const frItems = [
    {
      title: "Mururoa Files",
      path: "/",
    },
    {
      title: "A PROPOS",
      path: "/about",
    },
    {
      title: "ENQUETE",
      path: "/investigation/moruroa-files/",
      children: [
        {
          title: "Mururoa Files",
          path: "/investigation/moruroa-files/",
          children: [
            {
              title: "Cluster de cancers aux îles Gambier",
              path: "/investigation/moruroa-files/#ALDEBARAN",
            },
            {
              title: "Les oubliés de l’essai Encelade",
              path: "/investigation/moruroa-files/#ENCELADE",
            },
            {
              title: "La contamination cachée de Tahiti",
              path: "/investigation/moruroa-files/#CENTAURE",
            },
          ],
        },
        {
          title: "La farce des indemnisation",
          path: "/investigation/battle-for-compensation",
        },
        {
          title: "Les preuves du fiasco",
          path: "/investigation/findings-of-investigation",
        },
      ],
    },
    {
      title: "LES DOCUMENTS DÉCLASSIFIÉS",
      path: "/declassified-documents",
    },
    {
      title: "MÉTHODOLOGIE",
      path: "/methodology",
    },
    {
      title: "EQUIPE",
      path: "/team",
    },
    {
      title: "LE LIVRE",
      path: "/book",
    },
  ];

  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains(classes.sidebar)) {
      dispatch(toggleSidebar(false));
    }
  };

  const renderItems = (language === "en" ? enItems : frItems).map((item) => (
    <div className={classes["list-item"]} key={item.title}>
      <Link
        to={"/" + language + item.path}
        className={classes["list-item__title"]}
        onClick={() => dispatch(toggleSidebar(false))}
      >
        {item.title}
      </Link>
      {item?.children && (
        <div className={classes["list-item__children"]}>
          {item.children.map((child) => (
            <div className={classes["list-item__child"]} key={child.title}>
              <Link
                onClick={() => dispatch(toggleSidebar(false))}
                to={"/" + language + child.path}
                className={classes["list-item__child-title"]}
              >
                {child.title}
              </Link>
              {child?.children && (
                <div className={classes["list-item__grandchildren"]}>
                  {isMobile &&
                    child.children.map((gc) => (
                      <HashLink
                        onClick={() => dispatch(toggleSidebar(false))}
                        key={gc.title}
                        to={"/" + language + gc.path}
                        smooth
                        className={classes["list-item__grandchild-title"]}
                      >
                        {gc.title}
                      </HashLink>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  ));

  return (
    <>
      <aside
        onClick={handleCloseSidebar}
        className={classNames(classes.sidebar, {
          [classes["sidebar--active"]]: isSidebarOpen,
        })}
      >
        <div className={classes.container}>
          <button
            className={classes["close-btn"]}
            onClick={() => dispatch(toggleSidebar(false))}
          >
            <CloseIcon className={classes["close-btn__icon"]} />
          </button>

          <div className={classes.list}>{renderItems}</div>
        </div>
      </aside>

      <div
        className={classNames(classes.overlay, {
          [classes["overlay--active"]]: isSidebarOpen,
        })}
      />
    </>
  );
};

export default Sidebar;
