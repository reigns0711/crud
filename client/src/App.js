import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

//Components
import Login from "./components/Login";
import Signup from "./components/Signup";
import store from "./store";
import Alert from "./components/layout/Alert";

//redux
import {userLoaded} from "./components/actions/auth"
import setAuthToken from "./components/utils/setAuthToken";

if(localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {

  useEffect(()=> {
    store.dispatch(userLoaded());
  }, [])




  return (
    <Provider store={store}>
      <Fragment>
        <Alert />
        <BrowserRouter>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    </Provider>
  );
}

export default  App;
