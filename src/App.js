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
import userContext from "./contexts/userContext";
import useUserProfile from "./hooks/useUserProfile";
function App() {
  const [error, loading, userProfile, user] = useUserProfile();
  if (loading) {
    return <div></div>;
  }
  return (
    <userContext.Provider value={{ user, userProfile }}>
      <Router>
        <div>
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
    </userContext.Provider>
  );
}

export default App;
