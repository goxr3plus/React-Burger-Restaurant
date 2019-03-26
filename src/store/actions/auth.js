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
            let errorMessage = err.response.data.error.message

            //Create a Mapper for errors
            let map = new Map()
            map.set("INVALID_EMAIL", "Email is invalid")
            map.set("MISSING_PASSWORD", "Password is missing")
            map.set("WEAK_PASSWORD : Password should be at least 6 characters", "Password should be at least 6 characters")

            //Determine the final message
            let finalMessage =
               map.get(errorMessage) !== undefined ? map.get(errorMessage) : errorMessage
            console.log(map.get(errorMessage))

            //Dispatch Error
            dispatch(authFailed(finalMessage))
         })
   }
}
