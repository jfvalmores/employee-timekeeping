import axios from 'axios';
const conn = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

const login = (params) => conn.post('login', params);
const logout = (params) => conn.post('logout', params);

const getTimeLogTypeList = () => conn.get('timelog-type-list');
const createTimelog = (params) => conn.post('timelog', params);
const getTimelogs = (employee_no) => conn.get(`timelogs/${employee_no}`);

const getAllEmployees = () => conn.get('employees');
const getEmployee = (id) => conn.get(`employee/${id}`);
const createEmployee = (params) => conn.post('employee', params);
const updateEmployee = (id, params) => conn.put(`employee/${id}`, params);
const deleteEmployee = (id) => conn.delete(`employee/${id}`);

// TODO: More admin functions i.e. Timelog modifications

export {
  login,
  logout,

  getTimeLogTypeList,
  createTimelog,
  getTimelogs,

  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}