import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "~/pages/Login";
import Dashboard from "~/pages/Dashboard";
import Profile from "~/pages/Profile";
import ActivateUser from "~/pages/ActivateUser";
import ActiveCompanies from "~/pages/ActiveCompanies";
import PendingCompanies from "~/pages/PendingCompanies";
import ActiveUsers from "~/pages/ActiveUsers";
import PendingUsers from "~/pages/PendingUsers";
import EditCompany from "~/pages/EditCompany";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/active-user" exact component={ActivateUser} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
      <Route
        path="/active-companies"
        exact
        component={ActiveCompanies}
        isPrivate
      />
      <Route
        path="/pending-companies"
        exact
        component={PendingCompanies}
        isPrivate
      />
      <Route
        path="/edit-company/:companyId"
        exact
        component={EditCompany}
        isPrivate
      />

      <Route path="/active-users" exact component={ActiveUsers} isPrivate />

      <Route path="/pending-users" exact component={PendingUsers} isPrivate />
    </Switch>
  );
}
