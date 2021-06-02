import { useEffect, useState } from "react";
import classes from "./VideoLoopTextMode.module.scss";
import classNames from "classnames";
import { Player, BigPlayButton } from "video-react";

function VideoLoopTextMode({
  src = "/dataset/Investigation/Chapter1 - Nuclear Reconstruction/en/[ALD-5 Aldebaran reconstruction - alt].json",
}) {
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setStory(data));
  }, [src]);

  return (
    <>
      {story && (
        <div className={classNames(classes.container)}>
          <div className={classes["video-container"]}>
            <Player
              src={story.videoSrc}
              poster={story.poster}
              playsInline={true}
              preload={"auto"}
              type={"video/mp4"}
              className={classes["video-background"]}
            >
              <BigPlayButton position="center" />
            </Player>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoLoopTextMode;
