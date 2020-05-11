import * as actions from './actions'

export const setLoadingOn = dispatch => {
  dispatch(actions.setLoadingOn)
}

export const setLoadingOff = dispatch => {
  dispatch(actions.setLoadingOff)
}

export const setLoggedUser = (dispatch, user) => {
  dispatch(actions.setLoggedUser(user))
}

export const removeLoggedUser = dispatch => {
  dispatch(actions.removeLoggedUser)
}

export const setLogTypes = (dispatch, logTypes) => {
  dispatch(actions.setLogTypes(logTypes))
}

export const setPopup = (dispatch, payload) => {
  dispatch(actions.setPopup(payload))
}