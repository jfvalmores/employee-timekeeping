import React, { useEffect, useCallback } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  setLoadingOn,
  setLoadingOff,
  removeLoggedUser,
  setLogTypes,
} from '../state/operations'
import { logout, getTimeLogTypeList } from '../api'

const Main = ({ children }) => {
  const dispatch = useDispatch()
  const setLoading = useCallback((load) => {
    if (load)
      setLoadingOn(dispatch)
    else
      setLoadingOff(dispatch)
  }, [dispatch])

  const isLoading = useSelector(state => state.main.loading)
  const companyName = useSelector(state => state.main.companyName)
  const user = useSelector(state => state.main.user)
  const logTypes = useSelector(state => state.main.logTypes)

  useEffect(() => {
    setLoading(true)
    getTimeLogTypeList()
      .then(res => {
        console.log(res.data.list);
        if (res.data.success) {
          setLogTypes(dispatch, res.data.list)
        }
        setLoading(false)
      })
    // eslint-disable-next-line
  }, []);

  const doLogout = () => {
    logout(user)
      .then(res => {
        if (res.data.success) {
          alert(res.data.message)
          removeLoggedUser(dispatch)
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      {React.cloneElement(
        children,
        {
          isLoading,
          setLoading,
          companyName,
          user,
          doLogout,
          logTypes,
        }
      )}
      {isLoading &&
        <div id="loading-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      }
    </>
  )
}

export default Main