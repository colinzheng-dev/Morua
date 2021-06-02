import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";

import DocFrame from "./components/DocFrame/DocFrame";

import routes from "./config/route";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/:language/" component={Landing} />
        <Route path="/login" component={Login} />
        {routes.map(({ path, page }) => (
          <Route key={path} path={path} component={page} />
        ))}
        <Route path="/documents/:docId" component={DocFrame} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
