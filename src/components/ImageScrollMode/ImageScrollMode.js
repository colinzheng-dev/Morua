import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PXS_PER_IMAGE } from "../../config/constants";

import classes from "./ImageScrollMode.module.scss";
import classNames from "classnames";

const stepCount = 26;

function ImageScrollMode({
  src = "/dataset/Investigation/Chapter1 - Nuclear Reconstruction/en/[ENC-6 List of children PART 2].json",
}) {
  const ref = useRef(null);
  const [background, setBackground] = useState("");
  const [imgDir, setImgDir] = useState("");
  const [registerTriggers, setRegisterTriggers] = useState(false);
  const [panelsPos, setPanelsPos] = useState([]);
  const [story, setStory] = useState([]);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        setImgDir(data.imgDir);
        setStory(data.story);
        preloadImages(data.imgDir);
      });
  }, [src]);

  useEffect(() => {
    const scrollFunc = () => {
      const container = ref.current;
      gsap.registerPlugin(ScrollTrigger);

      registerImageScrollTriggers(container);
      setRegisterTriggers(true);
    };

    if (ref?.current && story && imgDir.length) {
      ref.current.style.height = (stepCount + 0.5) * PXS_PER_IMAGE + "px";

      let pos = [];

      for (let i = 0; i < stepCount; i++)
        pos[i] = window.innerHeight / 3 + window.innerHeight * i + 50;

      setPanelsPos(pos);

      !registerTriggers && scrollFunc();
    }
  }, [registerTriggers, story]);

  const registerImageScrollTriggers = (container) => {
    let mapStPt = [],
      mapEnPt = [];

    for (let idx = 0; idx < stepCount; idx++) {
      if (idx === 0) {
        mapStPt[0] = 0;
        mapEnPt[0] = PXS_PER_IMAGE;
      } else {
        mapStPt[idx] = mapEnPt[idx - 1];
        mapEnPt[idx] = mapStPt[idx] + PXS_PER_IMAGE;
      }

      ScrollTrigger.create({
        trigger: container,
        start:
          mapStPt[idx] === 0
            ? container.offsetTop
            : mapStPt[idx] + container.offsetTop,
        end: mapEnPt[idx] + container.offsetTop,
        onEnter: () => setENCImage(idx),
        onEnterBack: () => setENCImage(idx),
      });
    }
  };

  const setENCImage = (idx) => {
    setBackground(() => `${imgDir}/p${idx + 1}.png`);
  };

  const preloadImages = () => {
    let images = [];
    for (let idx = 0; idx < stepCount; idx++) {
      images[idx] = new Image();
      images[idx].src = `${imgDir}/p${idx + 1}.png`;
    }
  };

  return (
    story && (
      <div ref={ref} className={classes.container}>
        <img
          className={classes["image-box"]}
          src={background}
          alt="ENC-6 List of children"
        />
        {story.map((item, idx) => {
          return (
            story[idx].text.length && (
              <div
                className={classNames(classes["text-panel"], {
                  [classes["panel-26"]]: idx === stepCount - 1,
                })}
                key={panelsPos[idx]}
                style={{
                  top: `${panelsPos?.length > 0 ? panelsPos[idx] : 0}px`,
                }}
              >
                {item.text}
              </div>
            )
          );
        })}
      </div>
    )
  );
}

export default ImageScrollMode;
