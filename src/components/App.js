import LoginPage from "./LoginPage";
import Signup from "./Signup";
import History from "./History";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import UserContext from "../context/UserContext";
import MakeTransaction from "./MakeTransaction";

export default function App() {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/income" exact>
            <MakeTransaction />
          </Route>
          <Route path="/outcome" exact>
            <MakeTransaction />
          </Route>
          <Route path="/history" exact>
            <History />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
