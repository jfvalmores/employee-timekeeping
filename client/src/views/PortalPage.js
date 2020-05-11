import React, { useState, useRef } from 'react'
import {
  Col,
  Form,
  Button,
  Jumbotron,
  Container,
} from 'react-bootstrap'
import { createTimelog } from '../api'
import { Main, Header } from '../components'

const PortalPage = () => (
  <Main>
    <PortalPageContainer />
  </Main>
)

const PortalPageContainer = (props) => {
  const {
    user,
    toast,
    doLogout,
    logTypes,
    setLoading,
    companyName,
  } = props

  return (
    <>
      <Header
        user={user}
        toast={toast}
        doLogout={doLogout} />
      <Container>
        <TimelogForm
          toast={toast}
          logTypes={logTypes}
          setLoading={setLoading}
          companyName={companyName} />
      </Container>
    </>
  )
}

const TimelogForm = (props) => {
  const {
    toast,
    logTypes,
    setLoading,
    companyName
  } = props

  const formRef = useRef(null);
  const defaultForm = {
    employee_no: '',
    pin_code: '',
    log_type: 'TIME_IN'
  }

  const [state, setState] = useState(defaultForm);

  const handleChange = (e) => {
    const { id, value } = e.target
    setState({
      ...state,
      [id]: value
    })
  }

  const isFormValid = (data) => {
    if (String(data.employee_no) === '') {
      focusOnField('employee_no')
      return false
    } else if (String(data.pin_code) === '') {
      focusOnField('pin_code')
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...state }
    if (isFormValid(data)) {
      setLoading(true)
      createTimelog(data)
        .then(res => {
          if (res.data.success) {
            toast(`${res.data.message} ${res.data.employee_name} ${res.data.type.alert} at ${res.data.time}.`, 'success')
            setState(defaultForm)
          } else {
            toast(res.data.error)
          }
          setLoading(false)
        })
        .catch(err => console.error(err))
    }
  }

  const focusOnField = (id) => {
    if (formRef && formRef.current) {
      const field = formRef.current.querySelector('#' + id);
      field.focus();
    }
  }

  return (
    <Jumbotron id="portal-panel">
      <h4 id="portal-name">{companyName}</h4>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              id="employee_no"
              type="text"
              placeholder="Employee No."
              value={state.employee_no}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              id="pin_code"
              type="password"
              placeholder="PIN"
              value={state.pin_code}
              onChange={handleChange} />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Control
            id="log_type"
            as="select"
            value={state.log_type}
            onChange={handleChange}>
            {logTypes.map(
              (option, index) =>
                <option
                  key={index}
                  value={option.data}>
                  {option.label}
                </option>
            )}
          </Form.Control>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Jumbotron>
  )
}

export default PortalPage