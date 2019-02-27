import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { createStore } from "redux"
import reducer from "./store/reducers/burgerBuilder"
import { Provider } from "react-redux"



const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const app = (
   <Provider store={store}>
      <BrowserRouter basename="/React-Burger-Restaurant">
         <App />
      </BrowserRouter>
   </Provider>
)

ReactDOM.render(app, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
