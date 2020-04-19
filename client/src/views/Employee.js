import React, { useState, useEffect } from 'react'
import {
  Main,
  Header
} from '../components'
import { getAllEmployees } from '../api'
import {
  Col,
  Row,
  Form,
  Table,
  Modal,
  Button,
  Container,
} from 'react-bootstrap'

const Employee = () => {
  return (
    <Main>
      <EmployeeContainer />
    </Main>
  );
}

const EmployeeContainer = ({ user, doLogout }) => {
  const [employeeList, setEmployeeList] = useState([])
  const [isDetail, showEmpDetail] = useState(false)
  const [selected, setSelected] = useState({})
  const [params, setParams] = useState({})
  const [mode, setMode] = useState('VIEW')

  useEffect(() => {
    getAllEmployees()
      .then(res => {
        console.log(res)
        if (res.data.success) {
          setEmployeeList(res.data.data)
        }
      })
    // eslint-disable-next-line
  }, [])

  const showDetail = (employee) => {
    setMode('VIEW')
    setSelected(employee)
    setParams(employee)
    showEmpDetail(true)
  }

  const handleClose = () => {
    // TODO
    showEmpDetail(false)
  }

  const handleDelete = () => {
    // TODO
  }

  const handleSave = () => {
    // TODO
  }

  const handleNew = () => {
    // TODO
    setMode('NEW')
    setSelected({})
    setParams({})
    showEmpDetail(true)
  }

  return (
    <>
      <Header user={user} doLogout={doLogout} />
      <Container>
        <Button variant="primary" onClick={handleNew}> Add Employee </Button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Employee No.</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map(item =>
              <tr key={item._id} onDoubleClick={() => showDetail(item)}>
                <td>{item.employee_no}</td>
                <td>
                  {/* eslint-disable-next-line */}
                  <a href="" onClick={(e) => { e.preventDefault(); showDetail(item); }}>
                    {`${item.first_name} ${item.last_name}`}
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal show={isDetail} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Employee Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="employee-form">
              <Form.Group as={Row} controlId="employee_no">
                <Form.Label column sm="3">Employee No.</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Employee No."
                    value={params.employee_no}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="pin_code">
                <Form.Label column sm="3">PIN</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="PIN"
                    value={params.pin_code}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="first_name">
                <Form.Label column sm="3">First Name</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={params.first_name}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="last_name">
                <Form.Label column sm="3">Last Name</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={params.last_name}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="gender">
                <Form.Label column sm="3">Gender</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Gender"
                    value={params.gender}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="address">
                <Form.Label column sm="3">Address</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows="2"
                    placeholder="Address"
                    value={params.address}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm="3">Email</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={params.email}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="contact">
                <Form.Label column sm="3">Contact</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Contact"
                    value={params.contact}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="birthdate">
                <Form.Label column sm="3">Birthdate</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Birthdate"
                    value={params.birthdate}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="hire_date">
                <Form.Label column sm="3">Date Hired</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Date Hired"
                    value={params.hire_date}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
              <div>
                <span>Roles: </span>{' '}<span>{params.role && params.role.join(', ')}</span>
              </div>
              <div>
                <span>Projects: </span>{' '}<span>{params.project && params.project.join(', ')}</span>
              </div>
              <div>
                <span>Created At: </span>{' '}<span>{params.createdAt}</span>
              </div>
              <div>
                <span>Updated At: </span>{' '}<span>{params.updatedAt}</span>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {mode === 'VIEW' ?
              <>
                <Button variant="info" onClick={() => setMode('EDIT')}> Edit </Button>
                <Button variant="danger" onClick={handleDelete}> Delete </Button>
              </>
              :
              <>
                <Button variant="secondary" onClick={() => setMode('VIEW')}> Cancel </Button>
                <Button variant="primary" onClick={handleSave}> Save </Button>
              </>
            }
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export default Employee