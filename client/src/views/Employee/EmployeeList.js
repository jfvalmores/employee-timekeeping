import React from 'react';
import {
  Table,
} from 'react-bootstrap';

const EmployeeList = (props) => {
  const {
    showDetail,
    handleDelete,
    employeeList,
  } = props;

  return (
    <>
      <Table
        striped
        bordered
        hover size="sm">
        <thead>
          <tr>
            <th>Employee No.</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map(item =>
            <tr
              key={item._id}
              onDoubleClick={() => showDetail(item)}>
              <td>{item.employee_no}</td>
              <td>
                {/* eslint-disable-next-line */}
                <a href="#"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      showDetail(item);
                    }
                  }>
                  {`${item.first_name} ${item.last_name}`}
                </a>
              </td>
              <td>
                {String(item.employee_no) !== '0' &&
                  /* eslint-disable-next-line */
                  <a href="#"
                    onClick={
                      (e) => {
                        e.preventDefault();
                        handleDelete(item._id);
                      }
                    }>
                    Delete
                  </a>
                }
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default EmployeeList;