import React from "react";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/index";
import { animateScroll as scroll } from "react-scroll";

import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import classNames from "classnames";

function Header() {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const location = useLocation();

  const enHeaderProps = [
    {
      title: "MORUROA FILES",
      path: "/",
    },
    {
      title: "ABOUT",
      path: "/about",
    },
    {
      title: "INVESTIGATION",
      path: "/investigation/moruroa-files",
      children: [
        {
          title: "Moruroa Files",
          path: "/investigation/moruroa-files",
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
    },{
      title: "Cookies",
      path: "/cook",
    }
  ];

  const frHeaderProps = [
    {
      title: "MURUROA FILES",
      path: "/",
    },
    {
      title: "A PROPOS",
      path: "/about",
    },
    {
      title: "Enquête",
      path: "/investigation/moruroa-files",
      children: [
        {
          title: "Mururoa Files",
          path: "/investigation/moruroa-files",
        },
        {
          title: "La farce des indemnisation.",
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

  const handleToggleMenu = () => {
    dispatch(toggleSidebar(!isSidebarOpen));
  };

  return (
    <>
      <header className={classes.container}>
        <div className={classes.header}>
          <button
            className={`${classes.menu} ${
              isSidebarOpen && classes["menu--active"]
            }`}
            onClick={handleToggleMenu}
          >
            <span className={classes["menu__bar"]} />
          </button>

          <nav className={classes["nav-container"]}>
            {(language === "en" ? enHeaderProps : frHeaderProps).map((item) => {
              if (!item?.children) {
                return (
                  <Link
                    key={item.path}
                    className={classNames(classes["nav-link"], {
                      [classes["nav-link--active"]]:
                        location.pathname === item.path,
                    })}
                    to={"/" + language + item.path}
                    onClick={() => {
                      dispatch(toggleSidebar(false));
                      scroll.scrollToTop();
                    }}
                  >
                    {item.title}
                  </Link>
                );
              }

              return (
                <div className={classes["nav-link-menu"]} key={item.path}>
                  <Link
                    key={item.path}
                    className={classNames(classes["nav-link"], {
                      [classes["nav-link--active"]]: item.children.some(
                        (child) => child.path === location.pathname
                      ),
                    })}
                    to={"/" + language + item.path}
                    onClick={() => {
                      dispatch(toggleSidebar(false));
                      scroll.scrollToTop();
                    }}
                  >
                    {item.title}
                  </Link>

                  <nav className={classes["nav-children"]}>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={"/" + language + child.path}
                        className={classes["nav-child"]}
                        onClick={() => {
                          dispatch(toggleSidebar(false));
                          scroll.scrollToTop();
                        }}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
