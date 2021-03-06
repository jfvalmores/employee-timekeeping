import React from 'react';
import {
  Row,
  Col,
  Button,
  Popover,
  Dropdown,
  OverlayTrigger,
} from 'react-bootstrap';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const Header = ({ user, doLogout, toast }) => {
  return (
    <Row id="main-header">
      <h4>Employee Time Tracker</h4>
      <Col />
      {user ?
        <>
          <h4 style={{ marginRight: 10 }}>{`Hi, ${user.first_name} `}</h4>
          {user.admin_flag &&
            <Dropdown id="admin-dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Administration
              </Dropdown.Toggle>

              <Dropdown.Menu id="admin-dropdown-menu">
                <Dropdown.Item as={Link} to="/home">
                  Home
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/employee-management">
                  Employee Management
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          <Button variant="outline-info" onClick={doLogout}>Logout</Button>
        </>
        :
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover id="login-form">
              <Popover.Title as="h3">Enter employee credentials</Popover.Title>
              <Popover.Content>
                <LoginForm toast={toast} />
              </Popover.Content>
            </Popover>
          }>
          <Button variant="outline-info">Login here</Button>
        </OverlayTrigger>
      }
    </Row>
  );
}

export default Header;