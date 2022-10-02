import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./signin";

const Auth = () => {
  return (
    <Switch>
      <Route path="/auth" component={Signin} />
    </Switch>
  );
};

export default Auth;
