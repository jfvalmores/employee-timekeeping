import React from 'react'
import {
  Popover,
} from 'react-bootstrap'
import LoginForm from './LoginForm'

const LoginPopup = (
  <Popover id="login-form">
    <Popover.Title as="h3">Enter employee credentials</Popover.Title>
    <Popover.Content>
      <LoginForm />
    </Popover.Content>
  </Popover>
)

export default LoginPopup