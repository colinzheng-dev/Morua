import classes from "./Layout.module.scss";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Hero from "../../components/Hero/Hero";

const Layout = (props) => {console.log(props)
  const { children, title, titleAlign, isLanding } = props;

  return (
    <div className={classes.layout} {...props}>
      {!isLanding && <Header />}
      <Sidebar />
      {title && <Hero title={title} align={titleAlign} />}

      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Layout;
