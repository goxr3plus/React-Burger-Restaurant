import * as actionTypes from "../actions/actionsTypes"
import { updateObject } from "./utility"

const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false,
   authRedirectPath: "/",
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.AUTH_START:
         return authStart(state, action)
      case actionTypes.AUTH_SUCCESS:
         return authSuccess(state, action)
      case actionTypes.AUTH_FAILED:
         return authFailed(state, action)
      case actionTypes.AUTH_LOGOUT:
         return authLogout(state, action)
      case actionTypes.SET_AUTH_REDIRECT_PATH:
         return setAuthRedirectPath(state, action)
      default:
         return state
   }
}

const authStart = (state, action) => {
   return updateObject(state, {
      error: null,
      loading: true,
   })
}
const authFailed = (state, action) => {
   return updateObject(state, {
      error: action.error,
      loading: false,
   })
}
const authSuccess = (state, action) => {
   return updateObject(state, {
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false,
   })
}
const authLogout = (state, action) => {
   return updateObject(state, {
      token: null,
      userId: null,
   })
}

const setAuthRedirectPath = (state, action) => {
   return updateObject(state, {
      authRedirectPath: action.path,
   })
}
export default reducer
