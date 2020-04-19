import axios from 'axios'
const conn = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

const getTimeLogTypeList = () => conn.get('timelog-type-list')
const login = (params) => conn.post('login', params)
const logout = (params) => conn.post('logout', params)
const createTimelog = (params) => conn.post('timelog', params)
const getTimelogs = (params) => conn.get(`timelogs/${params.employee_no}`)
const getAllEmployees = () => conn.get('employees')

export {
  getTimeLogTypeList,
  login,
  logout,
  createTimelog,
  getTimelogs,
  getAllEmployees,
}