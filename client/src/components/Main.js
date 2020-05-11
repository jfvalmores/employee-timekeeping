import React, { useEffect, useCallback } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  setPopup,
  setLogTypes,
  setLoadingOn,
  setLoadingOff,
  removeLoggedUser,
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
  let toastTimer = null;

  useEffect(() => {
    setLoading(true)
    getTimeLogTypeList()
      .then(res => {
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
          toast(res.data.message, 'success')
          removeLoggedUser(dispatch)
        }
      })
      .catch(err => console.error(err))
  }
  const toast = (message, type = 'alert') => {
    if (toastTimer) clearTimeout(toastTimer);

    const popup = {
      open: true,
      message,
      type
    };

    setPopup(dispatch, popup);

    toastTimer = setTimeout(() => {
      setPopup(dispatch, {
        ...popup,
        open: false,
      });
    }, 5000);
  }

  return (
    <>
      {React.cloneElement(
        children,
        {
          user,
          toast,
          doLogout,
          logTypes,
          isLoading,
          setLoading,
          companyName,
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