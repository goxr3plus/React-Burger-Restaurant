import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import authReducer from "./store/reducers/auth"
import burgerBuilderReducer from "./store/reducers/burgerBuilder"
import orderReducer from "./store/reducers/order"

const rootReducer = combineReducers({
   burgerBuilder: burgerBuilderReducer,
   order: orderReducer,
   auth: authReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

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
