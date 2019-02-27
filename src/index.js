import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { createStore, applyMiddleware, compose } from "redux"
import burgerBuilder from "./store/reducers/burgerBuilder"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(burgerBuilder, composeEnhancers(applyMiddleware(thunk))
)

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
