import React from 'react'
import {
  Table,
} from 'react-bootstrap'
import EmployeeDetail from './EmployeeDetail'

const EmployeeList = (props) => {
  const {
    mode,
    params,
    setMode,
    isDetail,
    auxParams,
    handleSave,
    showDetail,
    handleClose,
    employeeList,
    handleDelete,
    handleChange,
    addItemToList,
    removeFromList,
    handleAuxChange,
    handleDateChange,
  } = props

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
      <EmployeeDetail
        mode={mode}
        params={params}
        setMode={setMode}
        isDetail={isDetail}
        auxParams={auxParams}
        handleSave={handleSave}
        handleClose={handleClose}
        handleChange={handleChange}
        addItemToList={addItemToList}
        removeFromList={removeFromList}
        handleAuxChange={handleAuxChange}
        handleDateChange={handleDateChange}
      />
    </>
  )
}

export default EmployeeList