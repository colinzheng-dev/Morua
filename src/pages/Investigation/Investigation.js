import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import InfiniteScroll from "react-infinite-scroll-component";
import FullPageMode from "../../components/FullPageMode/FullPageMode";
import MapStoryMode from "../../components/MapStoryMode/MapStoryMode";
import ImageScrollMode from "../../components/ImageScrollMode/ImageScrollMode";
import VideoAnimationMode from "../../components/VideoAnimationMode/VideoAnimationMode";
import VideoLoopTextMode from "../../components/VideoLoopTextMode/VideoLoopTextMode";
import Layout from "../../components/Layout/Layout";
import StoryJump from "../../components/StoryJump/StoryJump";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  updateMoruroaFileCurrentStories,
  updateMoruroaFileAllStories,
} from "../../store";

import classes from "./Investigation.module.scss";
import { ReactComponent as EnTitleTextIcon } from "../../assets/svgs/landing_MORUROA_FILE.svg";
import { ReactComponent as FrTitleTextIcon } from "../../assets/svgs/INVESTIGATION_MORUROA_FRENCH.svg";

import {
  FULL_PAGE,
  MAP_AND_STORY,
  VIDEO_ANIMATION,
  VIDEO_LOOP_TEXT,
  IMAGE_SCROLL,
  CHAPTER1,
  CHAPTER2,
  INVESTIGATION_STORY_PATH,
} from "../../config/constants";

function Investigation() {
  const currentStories = useSelector(
    (state) => state.moruroaFileCurrentStories
  );
  const allStories = useSelector((state) => state.moruroaFileAllStories);
  const dispatch = useDispatch();

  const { chapterTitle, language } = useParams();
  const [chapterStory, setChapterStory] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    fetch(INVESTIGATION_STORY_PATH)
      .then((res) => res.json())
      .then((data) => {
        setChapterStory(data[chapterTitle]);

        if (allStories.length === 0) {
          dispatch(updateMoruroaFileAllStories(data[chapterTitle].story));
        }
      });

    setHasMore(true);
  }, [chapterTitle]);

  const matchPageMode = (mode, src) => {
    let filePath = `${chapterStory.dirPath}${language}/${src}`;

    const storyProps = {
      key: filePath,
      src: filePath,
    };

    switch (mode) {
      case FULL_PAGE:
        return <FullPageMode {...storyProps} />;
      case MAP_AND_STORY:
        return <MapStoryMode {...storyProps} />;
      case IMAGE_SCROLL:
        return !isMobile ? <ImageScrollMode {...storyProps} /> : <></>;
      // case VIDEO_ANIMATION:
      //   return <VideoAnimationMode {...storyProps} />
      case VIDEO_LOOP_TEXT:
        return <VideoLoopTextMode {...storyProps} />;
      default:
        return;
    }
  };

  const fetchMore = () => {
    if (chapterTitle !== CHAPTER1) return;

    if (currentStories.length >= chapterStory.story.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const newStories = chapterStory.story.slice(0, currentStories.length + 1);
      dispatch(updateMoruroaFileCurrentStories(newStories));
    }, 1100);
  };

  return (
    <Layout>
      {chapterStory && (
        <>
          {chapterTitle === CHAPTER1 // Chapter 1
            ? chapterStory.story && (
                <div>
                  <StoryJump />
                  <div className={classes["investigation-header"]}>
                    <div className={classes["investigation-header__title"]}>
                      {language === "en" ? (
                        <EnTitleTextIcon className={classes["header-svg"]} />
                      ) : (
                        <FrTitleTextIcon className={classes["header-svg"]} />
                      )}
                    </div>

                    <p className={classes["investigation-header__sub-title"]}>
                      {language === "en"
                        ? "Investigation into French nuclear tests in the Pacific"
                        : "Enquête sur les essais nucléaires français dans le Pacifique"}
                    </p>
                  </div>

                  <video
                    poster="https://fp-nuclear-bucket.s3.eu-west-3.amazonaws.com/IMAGE/VIDEO+FRAMES/INTRO_loop_first_frame.jpg"
                    className={classes["intro-video"]}
                    src="https://fp-nuclear-bucket.s3.eu-west-3.amazonaws.com/VIDEO/Introduction_Chapter1.mp4"
                    alt="AL "
                    autoPlay={true}
                    playsInline={true}
                    loop={true}
                    muted
                  />

                  <div className={classes["space-1"]}></div>

                  <section key={chapterStory.intro}>
                    {matchPageMode(FULL_PAGE, chapterStory.intro)}
                  </section>

                  <div className={classes["space-2"]}></div>

                  <InfiniteScroll
                    dataLength={currentStories.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    style={{ overflow: "visible" }}
                  >
                    {currentStories.map(({ mode, src }) => (
                      <section key={src}>{matchPageMode(mode, src)}</section>
                    ))}
                  </InfiniteScroll>
                </div>
              )
            : chapterStory.story &&
              (chapterTitle === CHAPTER2 ? ( //Chapter 2
                <div>
                  <video
                    poster="https://fp-nuclear-bucket.s3.eu-west-3.amazonaws.com/IMAGE/VIDEO+FRAMES/FP-local+fallot-frame-001.jpg"
                    className={classes["intro-video"]}
                    src="https://fp-nuclear-bucket.s3.eu-west-3.amazonaws.com/VIDEO/FP-local-fallout.mp4"
                    alt="Chapter2"
                    autoPlay={true}
                    loop={true}
                    muted
                  />
                  <span className={classes["video-caption"]}>
                    {language === "en"
                      ? "Nuclear Fallout in French Polynesia 1966-1974"
                      : "Les retombées radioactives en Polynésie française 1966-1974"}
                  </span>

                  {chapterStory.story.map(({ mode, src }) => {
                    return matchPageMode(mode, src);
                  })}
                </div>
              ) : (
                chapterStory.story.map(({ mode, src }) => {
                  return matchPageMode(mode, src);
                })
              ))}
        </>
      )}
    </Layout>
  );
}

export default Investigation;
