import React, { useState, useEffect } from 'react';
import { Header, Main } from '../components';
import { getTimelogs } from '../api';
import { Table, Container } from 'react-bootstrap';

const Home = () => (
  <Main>
    <HomeContainer />
  </Main>
)

const HomeContainer = (props) => {
  const {
    user,
    doLogout,
    logTypes,
    setLoading
  } = props;

  const [logList, setLogList] = useState([]);

  useEffect(() => {
    setLoading(true);
    getTimelogs(user.employee_no)
      .then(res => {
        if (res.data.success) {
          setLogList(res.data.data);
        }
        setLoading(false)
      })
      .catch(err => console.error(err));
    // eslint-disable-next-line
  }, [])

  const timeLogLabel = (type) => {
    const logType = logTypes.find(item => item.data === type);
    return logType.label;
  }

  return (
    <>
      <Header
        user={user}
        doLogout={doLogout} />
      <Container>
        <Table
          striped
          bordered
          hover size="sm">
          <thead>
            <tr>
              <th>Log Type</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logList.map(item =>
              <tr key={item._id}>
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

export default Home;