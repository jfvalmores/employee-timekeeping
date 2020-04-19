import React from 'react'
import {
  Row,
  Col,
  Button,
  Dropdown,
  OverlayTrigger,
} from 'react-bootstrap'
import LoginPopup from './LoginPopup'
import { Link } from 'react-router-dom'

const Header = ({ user, doLogout }) => {
  return (
    <Row id="main-header">
      <h2>Employee Time Tracker</h2>
      <Col />
      {user ?
        <>
          <h2 style={{ marginRight: 10 }}>{`Hi, ${user.first_name} `}</h2>
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
        <OverlayTrigger trigger="click" placement="bottom" overlay={LoginPopup}>
          <Button variant="outline-info">Login here</Button>
        </OverlayTrigger>
      }
    </Row>
  )
}

export default Header