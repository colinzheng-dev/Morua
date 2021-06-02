import { useRef, useEffect, useState } from "react";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classes from "./VideoAnimationMode.module.scss";
import classNames from "classnames";

function VideoAnimationMode({
  src = "/dataset/Investigation/Chapter1 - Nuclear Reconstruction/en/[CEN-3 Fallout].json",
}) {
  const [story, setStory] = useState(null);
  const [panelsPos, setPanelsPos] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setStory(data));
  }, [src]);

  useEffect(() => {
    if (story && story?.section.length > 0 && !panelsPos?.length > 0) {
      // set height of the text panels
      let pos = [];

      if (ref.current) {
        ref.current.style.height = story.totalPoint * 850 + "px";
        for (let i = 0; i < story.section.length; i++) {
          pos[i] = story.section[i].point * 850;
        }
        setPanelsPos(pos);
      }
    }
  }, [story]);

  useEffect(() => {
    const scrollFunc = () => {
      const element = ref.current;
      const video = element.querySelector(`.${classes["video-background"]}`);

      let src = video.currentSrc || video.src;
      once(document.documentElement, "touchstart", function (e) {
        video.play();
        video.pause();
      });
      gsap.registerPlugin(ScrollTrigger);
      let tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      once(video, "loadedmetadata", () => {
        tl.fromTo(
          video,
          {
            currentTime: 0,
          },
          {
            currentTime: video.duration || 1,
          }
        );
      });
      /* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
      setTimeout(function () {
        if (window["fetch"]) {
          fetch(src)
            .then((response) => response.blob())
            .then((response) => {
              var blobURL = URL.createObjectURL(response);
              var t = video.currentTime;
              once(document.documentElement, "touchstart", function (e) {
                video.play();
                video.pause();
              });
              video.setAttribute("src", blobURL);

              video.currentTime = t + 0.01;
            });
        }
      }, 1000);
    };

    ref?.current && scrollFunc();
  });

  const once = (el, event, fn, opts) => {
    const onceFn = () => {
      el.removeEventListener(event, onceFn);
      fn.apply(this, arguments);
    };
    el.addEventListener(event, onceFn, opts);
    return onceFn;
  };

  return (
    <>
      {story && (
        <div ref={ref} className={classNames(classes.container)}>
          <div className={classes["video-container"]}>
            <video
              src={story.videoSrc}
              playsInline={true}
              webkit-playsinline="true"
              preload={"auto"}
              type={"video/mp4"}
              className={classes["video-background"]}
            />
          </div>

          {story.section.map(({ point, content }, i) => {
            return (
              <div
                key={point}
                className={classes["text-panel"]}
                style={{
                  top: `${panelsPos?.length > 0 ? panelsPos[i] : 0}px`,
                }}
              >
                <ReactMarkdownWithHtml children={content} allowDangerousHtml />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default VideoAnimationMode;
