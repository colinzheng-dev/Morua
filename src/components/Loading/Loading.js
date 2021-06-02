import Layout from "../Layout/Layout";

import classes from "./Loading.module.scss";
import { ReactComponent as LoadingIcon } from "../../assets/icons/loader.svg";

function Loading() {
  return (
    <Layout>
      <div className={classes.container}>
        <LoadingIcon className={classes.icon} />
        <span className={classes.text}>Loading, please wait</span>
      </div>
    </Layout>
  );
}

export default Loading;
