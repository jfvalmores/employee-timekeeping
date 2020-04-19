import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import {
  Home,
  Employee,
  PortalPage,
  NotFoundPage,
} from '../views'
import { useSelector } from 'react-redux'

const App = () => {
  const isLoggedIn = useSelector(state => state.main.isLoggedIn)

  return (
    <Router>
      <Switch>
        {isLoggedIn ?
          <PrivateRoutes /> : <PublicRoutes />
        }
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/portal" component={PortalPage} />
      <Redirect to="/portal" />
    </Switch>
  );
}

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/employee-management" component={Employee} />
      <Redirect to="/home" />
    </Switch>
  )
}

export default App;