import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import NeedDashboard from "./pages/NeedDashboard";
import HelperDashboard from "./pages/HelperDashboard";
import Register from "./pages/Register";
import CompleteRegister from "./pages/CompleteRegister";
import BlockedWarning from "./pages/BlockedWarning";
import Login from "./pages/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/register/:category" component={Register} />
        <Route
          path="/completeregister/:category"
          component={CompleteRegister}
        />
        <Route exact path="/completeregister" component={CompleteRegister} />
        <Route exact path="/helperdashboard">
          <HelperDashboard />
        </Route>
        <Route exact path="/needdashboard">
          <NeedDashboard />
        </Route>
        <Route path="/blocked">
          <BlockedWarning />
        </Route>
      </div>
    </Router>
  );
}

export default App;
