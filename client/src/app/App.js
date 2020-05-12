import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  Home,
  Employee,
  PortalPage,
  NotFoundPage,
} from '../views';
import { setPopup } from '../state/operations';
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.main.isLoggedIn);
  const popup = useSelector(state => state.main.popup);

  return (
    <>
      <Router>
        <Switch>
          {isLoggedIn ?
            <PrivateRoutes /> : <PublicRoutes />
          }
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
      <Toast
        id="toast"
        show={popup.open}
        onClose={() => setPopup(dispatch, { ...popup, open: false })}>
        <Toast.Header className={popup.type}>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Alert</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{popup.message}</Toast.Body>
      </Toast>
    </>
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
  );
}

export default App;