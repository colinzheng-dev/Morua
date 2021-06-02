import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import Mapbox from "../Mapbox/Mapbox";
import { PXS_PER_STEP } from "../../config/constants";

import classes from "./MapStoryMode.module.scss";

function MapStoryMode({
  src = "/dataset/Investigation/Chapter1 - Nuclear Reconstruction/en/[ALD-3 1 Gambier Islands population].json",
}) {
  const [data, setData] = useState(null);
  const [registerTriggers, setRegisterTriggers] = useState(false);
  const [mapProps, setMapProps] = useState({
    zoom: 0.0,
    center: [],
    toggleLayer: {
      layer: "",
      visibility: "",
    },
    bearing: 0.0,
    pitch: 0.0,
  });
  const ref = useRef(null);
  const [expandImage, setExpandImage] = useState("");
  const [isImageExpand, setIsImageExpand] = useState(false);
  const [panelsPos, setPanelsPos] = useState([]);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        const firstStep = data.story[0].steps[0];
        setData(data);
        setMapProps((m) => ({
          ...m,
          mapStyle: data.style,
          zoom: firstStep[0].zoom,
          center: [firstStep[0].center[1], firstStep[0].center[0]],
          toggleLayer: {
            layer: "",
            visibility: "",
          },
        }));

        let pos = [];

        for (let i = 0; i < data.story.length; i++) {
          let subStepTotal = 0;

          for (let j = 0; j < i; j++) {
            subStepTotal += data.story[j].steps.length;
          }

          pos.push(subStepTotal * PXS_PER_STEP + window.innerHeight * 1.9);
        }

        setPanelsPos(pos);
      });
  }, [src]);

  useEffect(() => {
    const scrollFunc = () => {
      const container = ref.current;

      gsap.registerPlugin(ScrollTrigger);

      registerMapScrollTriggerPoints(container);
      setRegisterTriggers(true);
    };

    if (ref?.current && data) {
      const imgElement = ref.current.querySelectorAll("img");
      if (imgElement.length > 0) {
        Array.from(imgElement).forEach((img) => {
          img.onclick = () => {
            onOpenModal();
            setExpandImage(img.src);
          };
        });
      }
      ref.current.style.height = (countMapSteps() + 1.5) * PXS_PER_STEP + "px";
      !registerTriggers && scrollFunc();
    }
  });

  const onOpenModal = () => setIsImageExpand(true);
  const onCloseModal = () => setIsImageExpand(false);

  const countMapSteps = () => {
    let stepCount = 0;

    data.story.forEach(({ steps }) => {
      stepCount += steps.length;
    });

    return stepCount;
  };

  const setMapContent = (mapTriggerId, order) => {
    let sectionSteps = [],
      sectionId = 0,
      stepId = 0;

    data.story.forEach(({ steps }) => {
      sectionSteps.push(steps.length);
    });

    let stepSum = 0;

    while (1) {
      stepSum += sectionSteps[sectionId];
      if (stepSum >= mapTriggerId) break;
      sectionId++;
    }

    //find out ID of section and step in each section.
    stepSum -= sectionSteps[sectionId];
    stepId = mapTriggerId > stepSum ? mapTriggerId - stepSum : mapTriggerId;

    const mapStepInfo = data.story[sectionId].steps[stepId - 1];
    // update coordinate or toggle layer
    mapStepInfo.forEach((subStep) => {
      if (subStep.hasOwnProperty("zoom")) {
        if (subStep.hasOwnProperty("bearing")) {
          setMapProps((m) => ({
            ...m,
            zoom: subStep.zoom,
            center: [subStep.center[1], subStep.center[0]],
            bearing: subStep.bearing,
            pitch: subStep.pitch,
          }));
        } else {
          setMapProps((m) => ({
            ...m,
            zoom: subStep.zoom,
            center: [subStep.center[1], subStep.center[0]],
          }));
        }
      } else {
        if (order === "DOWN")
          setMapProps((m) => ({
            ...m,
            toggleLayer: {
              layer: subStep.layer,
              visibility: subStep.visible ? "visible" : "none",
            },
          }));
        else if (order === "UP")
          setMapProps((m) => ({
            ...m,
            toggleLayer: {
              layer: subStep.layer,
              visibility: subStep.visible ? "none" : "visible",
            },
          }));
      }
    });
  };

  const registerMapScrollTriggerPoints = (container) => {
    let mapStPt = [],
      mapEnPt = [],
      stepCount = countMapSteps();

    for (let idx = 0; idx < stepCount; idx++) {
      if (idx === 0) {
        mapStPt[0] = 0;
        mapEnPt[0] = PXS_PER_STEP;
      } else {
        mapStPt[idx] = mapEnPt[idx - 1];
        mapEnPt[idx] = mapStPt[idx] + PXS_PER_STEP;
      }

      ScrollTrigger.create({
        trigger: container,
        start:
          mapStPt[idx] === 0
            ? container.offsetTop
            : mapStPt[idx] + container.offsetTop,
        end: mapEnPt[idx] + container.offsetTop,
        onEnter: () => setMapContent(idx + 1, "DOWN"),
        onLeaveBack: () => setMapContent(idx + 1, "UP"),
      });
    }
  };

  return (
    mapProps.center.length &&
    data && (
      <div ref={ref} className={classes.container}>
        <Modal
          open={isImageExpand}
          onClose={onCloseModal}
          classNames={{ modal: classes.modal }}
          center
        >
          <img
            className={classes["image-expand-container"]}
            src={expandImage}
            alt={expandImage}
          />
        </Modal>

        {data.story.map((item, idx) => {
          return item.description.length ? (
            <div
              key={panelsPos[idx]}
              className={classes["story-panel"]}
              style={{
                top: `${panelsPos[idx]}px`,
              }}
            >
              <ReactMarkdown source={item.description} />
            </div>
          ) : (
            <></>
          );
        })}
        <Mapbox {...mapProps} />
      </div>
    )
  );
}

export default MapStoryMode;
