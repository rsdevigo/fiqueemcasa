import React from "react";
import "./App.css";
import Home from "./pages/Home";
import NeedDashboard from "./pages/NeedDashboard";
import HelperDashboard from "./pages/HelperDashboard";
import Register from "./pages/Register";
import CompleteRegister from "./pages/CompleteRegister";
import BlockedWarning from "./pages/BlockedWarning";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/register/:category" component={Register} />
        <Route
          path="/completeregister/:category"
          component={CompleteRegister}
        />
        <Route exact path="/completeregister" component={CompleteRegister} />
        <Route exact path="/helperdashboard" component={HelperDashboard} />
        <Route exact path="/needdashboard" component={NeedDashboard} />
        <Route path="/blockedwarning" component={BlockedWarning} />
      </div>
    </Router>
  );
}

export default App;
