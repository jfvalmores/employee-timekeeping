const initialState = {
  loading: true,
  user: null,
  companyName: 'SomeDev Company',
  logTypes: [],
}

export const main = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {

    case 'SET_LOADING_ON':
      return {
        ...state,
        loading: true
      };

    case 'SET_LOADING_OFF':
      return {
        ...state,
        loading: false
      };

    case 'SET_LOGGED_USER':
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      }

    case 'REMOVE_LOGGED_USER':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      }

    case 'SET_TIMELOG_TYPES':
      return {
        ...state,
        logTypes: action.logTypes
      }

    default:
      return state
  }
}