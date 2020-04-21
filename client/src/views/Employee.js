import React, { useState, useEffect } from 'react'
import {
  Main,
  Header
} from '../components'
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
} from '../api'
import {
  Button,
  Container,
} from 'react-bootstrap'
import {
  EmployeeList,
  EmployeeDetail
} from './Employee/'

const Employee = () => (
  <Main>
    <EmployeeContainer />
  </Main>
)

const EmployeeContainer = (props) => {
  const {
    user,
    doLogout,
    setLoading
  } = props

  const [mode, setMode] = useState('VIEW')
  const [params, setParams] = useState({})
  const [auxParams, setAuxParams] = useState({})
  const [isDetail, showEmpDetail] = useState(false)
  const [employeeList, setEmployeeList] = useState([])

  const defaultAuxParams = {
    roleInput: '',
    projectInput: '',
  }

  const defaultParams = {
    email: '',
    gender: '',
    contact: '',
    address: '',
    pin_code: '',
    last_name: '',
    first_name: '',
    employee_no: '',
    birthdate: new Date(),
    hire_date: new Date(),
    role: [],
    project: [],
  }

  useEffect(() => {
    getAll()
    // eslint-disable-next-line
  }, [])

  const getAll = () => {
    setLoading(true)
    getAllEmployees()
      .then(res => {
        if (res.data.success) {
          setEmployeeList(formatList(res.data.data))
        }
        setLoading(false)
      })
  }

  const getDetail = (id) => {
    setLoading(true)
    getEmployee(id)
      .then(res => {
        if (res.data.success) {
          setParams(formatDetail(res.data.data))
        }
        setLoading(false)
      })
  }

  const formatList = (list) => {
    return list.map(item => (formatDetail(item)))
  }

  const formatDetail = (detail) => {
    return {
      ...detail,
      birthdate: new Date(detail.birthdate),
      hire_date: new Date(detail.hire_date),
    }
  }

  const showDetail = (employee) => {
    setMode('VIEW')
    setParams(employee)
    setAuxParams(defaultAuxParams)
    showEmpDetail(true)
  }

  const handleClose = () => {
    showEmpDetail(false)
  }

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    setLoading(true)
    deleteEmployee(id)
      .then(res => {
        if (res.data.success) {
          alert('Emplyee has been delete.')
          getAll()
        }
        setLoading(false)
      })
  }

  const handleSave = () => {
    setLoading(true)
    if (!params._id) {
      createEmployee(params)
        .then(res => {
          alert(res.data.message)
          if (res.data.success) {
            handleClose()
            getDetail(res.data.id)
          }
          setLoading(false)
        })
    } else {
      updateEmployee(params._id, params)
        .then(res => {
          alert(res.data.message)
          if (res.data.success) {
            setMode('VIEW')
            getDetail(res.data.id)
          }
          setLoading(false)
        })
    }
  }

  const handleNew = () => {
    setMode('NEW')
    setParams(defaultParams)
    setAuxParams(defaultAuxParams)
    showEmpDetail(true)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setParams({
      ...params,
      [id]: value
    })
  }

  const handleDateChange = (id, value) => {
    setParams({
      ...params,
      [id]: value
    })
  }

  const handleAuxChange = (e) => {
    const { id, value } = e.target
    setAuxParams({
      ...auxParams,
      [id]: value
    })
  }

  const addItemToList = (e, paramKey) => {
    if (e.keyCode === 13) {
      const { id, value } = e.target
      const list = [...params[paramKey]]
      if (String(value) === '') return;

      list.push(value)
      setParams({
        ...params,
        [paramKey]: list
      })

      setAuxParams({
        ...auxParams,
        [id]: ''
      })
    }
  }

  const removeFromList = (index, paramKey) => {
    let list = [...params[paramKey]]
    list.splice(index, 1)

    setParams({
      ...params,
      [paramKey]: list
    })
  }

  return (
    <>
      <Header
        user={user}
        doLogout={doLogout} />
      <Container>
        <Button
          style={{ marginBottom: 10 }}
          variant="primary"
          onClick={handleNew}
        >
          Add Employee
        </Button>
        <EmployeeList
          showDetail={showDetail}
          handleDelete={handleDelete}
          employeeList={employeeList}
        />
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
      </Container>
    </>
  )
}

export default Employee