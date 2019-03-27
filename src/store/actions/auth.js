import * as actionTypes from "./actionsTypes"
import axios from "axios"

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START,
   }
}

export const authSuccess = (idToken, userId) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      idToken: idToken,
      userId: userId,
   }
}

export const authFailed = error => {
   return {
      type: actionTypes.AUTH_FAILED,
      error: error,
   }
}

export const logout = () => {
   //LocalStorage
   localStorage.removeItem("token")
   localStorage.removeItem("expirationDate")
   localStorage.removeItem("userId")
   return {
      type: actionTypes.AUTH_LOGOUT,
   }
}

export const checkAuthTimeout = expirationTime => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout())
      }, expirationTime * 1000)
   }
}

export const setAuthRedirectPath = path => {
   return {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path: path,
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
         .then(response => {
            console.log(response)

            //Variables
            const idToken = response.data.idToken
            const expirationDateTime = new Date(
               new Date().getTime() + response.data.expiresIn * 1000
            )
            const userId = response.data.localId

            //LocalStorage
            localStorage.setItem("token", idToken)
            localStorage.setItem("expirationDate", expirationDateTime)
            localStorage.setItem("userId", userId)

            //Dispatch
            dispatch(authSuccess(idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
         })
         .catch(err => {
            console.error(err)
            let errorMessage = err.response.data.error.message

            //Create a Mapper for errors
            let map = new Map()
            map.set("INVALID_EMAIL", "Email is invalid")
            map.set("MISSING_PASSWORD", "Password is missing")
            map.set(
               "WEAK_PASSWORD : Password should be at least 6 characters",
               "Password should be at least 6 characters"
            )

            //Determine the final message
            let finalMessage =
               map.get(errorMessage) !== undefined ? map.get(errorMessage) : errorMessage
            console.log(map.get(errorMessage))

            //Dispatch Error
            dispatch(authFailed(finalMessage))
         })
   }
}

export const authCheckState = () => {
   return dispatch => {
      const token = localStorage.getItem("token")
      if (!token) {
         dispatch(logout())
      } else {
         const expirationDate = new Date(localStorage.getItem("expirationDate"))

         //Token has expired
         if (expirationDate > new Date()) {
            const userId = localStorage.getItem("userId")
            dispatch(authSuccess(token, userId))
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
         } else {
            dispatch(logout())
         }
      }
   }
}
