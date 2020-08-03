import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import ActiveUser from '~/pages/ActiveUser';
import ActiveCompanies from '~/pages/ActiveCompanies';
import PendingCompanies from '~/pages/PendingCompanies';
import EditCompany from '~/pages/EditCompany';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/active-user" exact component={ActiveUser} />

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
    </Switch>
  );
}
