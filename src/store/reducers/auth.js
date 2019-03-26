import * as actionTypes from "../actions/actionsTypes"
import { updateObject } from "./utility"

const initialState = {
   token: null,
   userId: null,
   error: null,
   loading: false,
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.AUTH_START:
         return authStart(state, action)
      case actionTypes.AUTH_SUCCESS:
         return authSuccess(state, action)
      case actionTypes.AUTH_FAILED:
         return authFailed(state, action)
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
      userId: action.localId,
      error: null,
      loading: false,
   })
}

export default reducer;

