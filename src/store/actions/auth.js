import * as actionTypes from "./actionsTypes"
import axios from "axios"

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START,
   }
}

export const authSuccess = (idToken, localId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: idToken,
      localId: localId,
   }
}

export const authFailed = error => {
   return {
      type: actionTypes.AUTH_FAILED,
      error: error,
   }
}

export const auth = (email, password, isSignUp) => {
   return dispatch => {
      dispatch(authStart())
      const apikey = "AIzaSyD3qjuYkLxsAV4s4csjekchCmeHNBnz6ms"
      const baseUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/"
      const url = `${baseUrl}${isSignUp ? "signupNewUser" : "verifyPassword"}?key=${apikey}`
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true,
      }
      console.log(url)
      axios
         .post(url, authData)
         .then(res => {
            console.log(res)
            dispatch(authSuccess(res.data.idToken, res.data.localId))
         })
         .catch(err => {
            console.error(err)
            dispatch(authFailed(err.response.data.error))
         })
   }
}
