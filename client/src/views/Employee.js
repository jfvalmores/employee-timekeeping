import React, { useState, useEffect } from 'react'
import {
  Main,
  Header
} from '../components'
import { getAllEmployees } from '../api'
import {
  Table,
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

  return (
    <>
      <Header user={user} doLogout={doLogout} />
      <Container>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Employee No.</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map(item =>
              <tr key={item._id}>
                <td>{item.employee_no}</td>
                <td>{`${item.first_name} ${item.last_name}`}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Employee