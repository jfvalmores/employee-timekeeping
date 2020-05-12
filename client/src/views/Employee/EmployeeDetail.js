import React from 'react';
import {
  Col,
  Row,
  Form,
  Modal,
  Button,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EmployeeDetail = (props) => {
  const {
    mode,
    params,
    setMode,
    isDetail,
    auxParams,
    handleSave,
    handleClose,
    handleChange,
    addItemToList,
    removeFromList,
    handleAuxChange,
    handleDateChange,
  } = props

  return (
    <Modal
      show={isDetail}
      backdrop="static"
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Employee Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="employee-form">
          {mode !== 'NEW' &&
            <Form.Group as={Row} controlId="employee_no">
              <Form.Label column sm="3">
                Employee No.
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  placeholder="Employee No."
                  value={params.employee_no}
                  disabled />
              </Col>
            </Form.Group>
          }
          <Form.Group as={Row} controlId="first_name">
            <Form.Label column sm="3">
              First Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="First Name"
                value={params.first_name}
                onChange={handleChange}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="last_name">
            <Form.Label column sm="3">
              Last Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="Last Name"
                value={params.last_name}
                onChange={handleChange}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="pin_code">
            <Form.Label column sm="3">
              PIN
            </Form.Label>
            <Col sm="9">
              <Form.Control
                maxLength="4"
                type="password"
                pattern="[0-9]*"
                placeholder="PIN"
                value={params.pin_code}
                onChange={handleChange}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>

          <hr />

          <Form.Group as={Row} controlId="gender">
            <Form.Label column sm="3">
              Gender
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="Gender"
                value={params.gender}
                onChange={handleChange}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="address">
            <Form.Label column sm="3">
              Address
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="textarea"
                rows="2"
                placeholder="Address"
                value={params.address}
                onChange={handleChange}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>

          <hr />

          <Form.Group as={Row} controlId="email">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="email"
                placeholder="Email"
                value={params.email}
                onChange={handleChange}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="contact">
            <Form.Label column sm="3">
              Contact
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="Contact"
                value={params.contact}
                onChange={handleChange}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="birthdate">
            <Form.Label column sm="3">
              Birthdate
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as={DatePicker}
                placeholder="Birthdate"
                selected={params.birthdate}
                onChange={(val) => handleDateChange('birthdate', val)}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="hire_date">
            <Form.Label column sm="3">
              Date Hired
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as={DatePicker}
                placeholder="Date Hired"
                selected={params.hire_date}
                onChange={(val) => handleDateChange('hire_date', val)}
                disabled={mode === 'VIEW'} />
            </Col>
          </Form.Group>

          <hr />

          <div>
            <Row>
              <Form.Label column sm="3">
                Roles:
              </Form.Label>
            </Row>
            {params.role && params.role.map((item, index) => (
              <Row key={index}>
                <Col sm="3" />
                <Col sm="6">
                  {item}
                </Col>
                <Col sm="3">
                  {mode !== 'VIEW' &&
                    /* eslint-disable-next-line */
                    <a href="#"
                      onClick={
                        (e) => {
                          e.preventDefault();
                          removeFromList(index, 'role');
                        }
                      }>
                      Remove
                      </a>
                  }
                </Col>
              </Row>
            ))}
            <div style={{ marginBottom: 10 }} />
            {mode !== 'VIEW' &&
              <Form.Group as={Row} controlId="roleInput">
                <Form.Label column sm="3">
                  Role
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    placeholder="Press enter to add"
                    value={auxParams.roleInput}
                    onChange={handleAuxChange}
                    onKeyDown={e => addItemToList(e, 'role')}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
            }
          </div>

          <div>
            <Row>
              <Form.Label column sm="3">
                Projects:
              </Form.Label>
            </Row>
            {params.project && params.project.map((item, index) => (
              <Row key={index}>
                <Col sm="3" />
                <Col sm="6">
                  {item}
                </Col>
                <Col sm="3">
                  {mode !== 'VIEW' &&
                    /* eslint-disable-next-line */
                    <a href="#"
                      onClick={
                        (e) => {
                          e.preventDefault();
                          removeFromList(index, 'project');
                        }
                      }>
                      Remove
                        </a>
                  }
                </Col>
              </Row>
            ))}
            <div style={{ marginBottom: 10 }} />
            {mode !== 'VIEW' &&
              <Form.Group as={Row} controlId="projectInput">
                <Form.Label column sm="3">
                  Project
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    placeholder="Press enter to add"
                    value={auxParams.projectInput}
                    onChange={handleAuxChange}
                    onKeyDown={e => addItemToList(e, 'project')}
                    disabled={mode === 'VIEW'} />
                </Col>
              </Form.Group>
            }
          </div>
          <hr />
          {mode !== 'NEW' &&
            <>
              <div>
                <span>Created At: </span>{' '}<span>{new Date(params.createdAt).toString()}</span>
              </div>
              <div>
                <span>Updated At: </span>{' '}<span>{new Date(params.updatedAt).toString()}</span>
              </div>
            </>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {mode === 'VIEW' ?
          <>
            <Button variant="info" onClick={() => setMode('EDIT')}> Edit </Button>
          </>
          :
          <>
            {mode !== 'NEW' &&
              <Button variant="secondary" onClick={() => setMode('VIEW')}> Cancel </Button>
            }
            <Button variant="primary" onClick={handleSave}> Save </Button>
          </>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default EmployeeDetail;