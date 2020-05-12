import * as actionTypes from './constants';

export const setLoadingOn = ({
  type: actionTypes.SET_LOADING_ON
});

export const setLoadingOff = ({
  type: actionTypes.SET_LOADING_OFF
});

export const setLoggedUser = user => ({
  type: actionTypes.SET_LOGGED_USER,
  user
});

export const removeLoggedUser = ({
  type: actionTypes.REMOVE_LOGGED_USER,
});

export const setLogTypes = logTypes => ({
  type: actionTypes.SET_TIMELOG_TYPES,
  logTypes
});

export const setPopup = payload => ({
  type: actionTypes.SET_POPUP,
  payload
});
