import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import StaffRoute from "./components/private-route/StaffRoute";
import TenantRoute from "./components/private-route/TenantRoute";

import Navbar from "./components/layout/Navbar";
// Login Flow
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
//Staff Flow
import AuditList from "./components/AuditList";
import Directory from "./components/TenantList";
import Checklist from "./components/Checklist";
import ChecklistNonFB from "./components/ChecklistNonFB";
import CreateTenant from "./components/auth/CreateTenant";
import ViewAuditAuditor from "./components/ViewAudit";
//Tenant Flow
import TenantHome from "./components/tenant/TenantHome";
import TenantEditAudit from "./components/tenant/EditAudit";
import ViewAuditTenant from "./components/ViewAuditTenant";
//Error warning
import MessageDisplay from "./components/MessageDisplay";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MessageDisplay />
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <StaffRoute exact path="/auditlist" component={AuditList} />
              <StaffRoute exact path="/checklistFB" component={Checklist} />
              <StaffRoute
                exact
                path="/checklistNonFB"
                component={ChecklistNonFB}
              />
              <StaffRoute exact path="/directory" component={Directory} />
              <StaffRoute exact path="/createtenant" component={CreateTenant} />
              <StaffRoute
                exact
                path="/viewaudit"
                component={ViewAuditAuditor}
              />

              <TenantRoute exact path="/tenant" component={TenantHome} />
              <TenantRoute
                exact
                path="/viewaudittenant"
                component={ViewAuditTenant}
              />
              <TenantRoute
                exact
                path="/tenant/editAudit"
                component={TenantEditAudit}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
