import NotFound from "./containers/NotFound";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>,
       {/* Finally, catch all unmatched routes  */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
