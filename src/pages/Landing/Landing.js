import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { changeLanguage } from "../../store/index";
import Layout from "../../components/Layout/Layout";

import classes from "./Landing.module.scss";

import Logos from "../../assets/images/landing_3_combined.png";
import { ReactComponent as TitleTextIcon } from "../../assets/icons/title-text.svg";

function Landing() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEnEnter = () => {
    dispatch(changeLanguage("en"));
    history.push("/en/investigation/moruroa-files");
  };
  const handleFrEnter = () => {
    dispatch(changeLanguage("fr"));
    history.push("/fr/investigation/moruroa-files");
  };

  return (
    <Layout className={classes.container} isLanding={true}>
      <video
        className={classes["bg-video"]}
        src="https://fp-nuclear-bucket.s3.eu-west-3.amazonaws.com/VIDEO/LANDING+PAGE.mp4"
        alt="Landing"
        playsInline={true}
        autoPlay={true}
        loop={true}
        muted
      />

      <img src={Logos} alt="logos" className={classes["logo-group"]} />

      <div className={classes["title-group"]}>
        <div className={classes["title-svg"]}>
          <TitleTextIcon />
        </div>
      </div>

      <div className={classes["btn-lang-group"]}>
        <div onClick={handleFrEnter} className={classes["btn-lang"]}>
          FRANÇAIS
        </div>
        <div onClick={handleEnEnter} className={classes["btn-lang"]}>
          ENGLISH
        </div>
      </div>
    </Layout>
  );
}

export default Landing;
