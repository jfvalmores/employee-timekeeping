import React, { useState, useRef } from 'react';
import {
  Form,
  Button,
} from 'react-bootstrap';
import { login } from '../api';
import { setLoadingOn, setLoadingOff, setLoggedUser } from '../state/operations';
import { useDispatch } from 'react-redux';

const LoginForm = ({ toast }) => {
  const [state, setState] = useState({
    employee_no: '',
    pin_code: '',
  });
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (!e.target.validity.valid) return;

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
      if (validate()) doLogin();
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

    setLoadingOn(dispatch);
    login({ ...state })
      .then(res => {
        if (res.data.success) {
          toast(res.data.message, 'success')
          setLoggedUser(dispatch, res.data.user)
        } else {
          toast(res.data.error)
        }
        setLoadingOff(dispatch)
      })
      .catch(err => {
        toast(err)
        setLoadingOff(dispatch)
      });

  }

  return (
    <Form ref={formRef}>
      <Form.Row>
        <Form.Control
          id="employee_no"
          type="text"
          maxLength="6"
          pattern="[0-9]*"
          placeholder="Employee No."
          value={state.employee_no}
          onChange={handleChange}
          onKeyDown={handleKeyPress} />
      </Form.Row>
      <Form.Row>
        <Form.Control
          id="pin_code"
          maxLength="4"
          type="password"
          pattern="[0-9]*"
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

export default LoginForm;