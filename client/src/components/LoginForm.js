import React, { useState, useRef } from 'react'
import {
  Form,
  Button,
} from 'react-bootstrap'
import { login } from '../api'
import { setLoadingOn, setLoadingOff, setLoggedUser } from '../state/operations'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [state, setState] = useState({
    employee_no: '',
    pin_code: '',
  });
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    setState({
      ...state,
      [id]: value,
    });
  }

  const handleKeyPress = (e) => {
    // On enter
    if (e.keyCode === 13) {
      if (validate()) doLogin()
    }
  }

  const focusOnField = (id) => {
    if (formRef && formRef.current) {
      const field = formRef.current.querySelector('#' + id);
      field.focus();
    }
  }

  const validate = () => {
    if (!state.employee_no) {
      focusOnField('employee_no');
      return false;
    } else if (!state.pin_code) {
      focusOnField('pin_code');
      return false;
    }
    return true;
  }

  const doLogin = () => {
    if (!validate()) return;

    setLoadingOn(dispatch)
    login({ ...state })
      .then(res => {
        if (res.data.success) {
          alert(res.data.message)
          setLoggedUser(dispatch, res.data.user)
        } else {
          alert(res.data.error)
        }
        setLoadingOff(dispatch)
      })
      .catch(err => {
        alert(err)
        setLoadingOff(dispatch)
      })

  }

  return (
    <Form ref={formRef}>
      <Form.Row>
        <Form.Control
          id="employee_no"
          type="text"
          placeholder="Employee No."
          value={state.employee_no}
          onChange={handleChange}
          onKeyDown={handleKeyPress} />
      </Form.Row>
      <Form.Row>
        <Form.Control
          id="pin_code"
          type="password"
          placeholder="PIN"
          value={state.pin_code}
          onChange={handleChange}
          onKeyDown={handleKeyPress} />
        <Form.Text className="text-muted">
          Please avoid sharing this information.
          </Form.Text>
      </Form.Row>
      <Button variant="primary" onClick={doLogin}>
        Login
      </Button>
    </Form>
  )
}

export default LoginForm