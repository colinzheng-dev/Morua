import Loadable from "react-loadable";

import Loading from "../components/Loading/Loading";

const AboutPage = Loadable({
  loader: () => import("../pages/About/About"),
  loading: Loading,
});
const DeclassifiedDocument = Loadable({
  loader: () => import("../pages/DeclassifiedDocument/DeclassifiedDocument"),
  loading: Loading,
});
const InvestigationPage = Loadable({
  loader: () => import("../pages/Investigation/Investigation"),
  loading: Loading,
});
const TeamPage = Loadable({
  loader: () => import("../pages/Team/Team"),
  loading: Loading,
});
const MethodologyPage = Loadable({
  loader: () => import("../pages/Methodology/Methodology"),
  loading: Loading,
});
const BookPage = Loadable({
  loader: () => import("../pages/Book/Book"),
  loading: Loading,
});

const VideoAnimationMode = Loadable({
  loader: () => import("../components/VideoAnimationMode/VideoAnimationMode"),
  loading: Loading,
});

const CookiesPage = Loadable({
  loader: () => import("../pages/Cookies/Cookies"),
  loading: Loading,
});

const routes = [
  { path: "/:language/about", page: AboutPage },
  { path: "/:language/cook", page: CookiesPage },
  { path: "/:language/declassified-documents", page: DeclassifiedDocument },
  {
    path: "/:language/investigation/:chapterTitle",
    page: InvestigationPage,
  },
  { path: "/:language/team", page: TeamPage },
  { path: "/:language/methodology", page: MethodologyPage },
  { path: "/:language/book", page: BookPage },
  { path: "/:language/test", page: VideoAnimationMode }
];

export default routes;
