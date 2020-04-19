import React, { useState, useEffect } from 'react'
import { Header, Main } from '../components'
import { getTimelogs } from '../api'
import { Table, Container } from 'react-bootstrap'

const Home = () => {
  return (
    <Main>
      <HomeContainer />
    </Main>
  )
}

const HomeContainer = ({ user, doLogout, logTypes }) => {
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    getTimelogs({ employee_no: user.employee_no })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data)
          setLogList(res.data.data);
        }
      })
      .catch(err => console.error(err))
    // eslint-disable-next-line
  }, [])

  const timeLogLabel = (type) => {
    const logType = logTypes.find(item => item.data === type)
    return logType.label
  }

  return (
    <>
      <Header user={user} doLogout={doLogout} />
      <Container>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Log Type</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logList.map(item =>
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{timeLogLabel(item.log_type)}</td>
                <td>{item.entry_date}</td>
                <td>{item.entry_time}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default Home