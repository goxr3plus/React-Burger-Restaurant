import React, { Component } from "react"
import Modal from "./../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axiosInstance) => {
   return class extends Component {
      state = {
         error: null,
      }

      componentWillMount() {
         this.reqInterceptor = axiosInstance.interceptors.request.use(req => {
            this.setState({ error: null })
            return req
         })

         this.respInterceptor = axiosInstance.interceptors.response.use(
            res => res,
            error => {
               this.setState({ error: error })
            }
         )
      }

      componentWillUnmount() {
         axiosInstance.interceptors.request.eject(this.reqInterceptor)
         axiosInstance.interceptors.response.eject(this.respInterceptor)
      }

      errorConfirmedHandler = () => {
         this.setState({ error: null })
      }

      render() {
         return (
            <>
               <Modal show={this.state.error} cancelPurchaseHandler={this.errorConfirmedHandler}>
                  {this.state.error ? this.state.error.message : null}
               </Modal>
               <WrappedComponent {...this.props} />
            </>
         )
      }
   }
}

export default withErrorHandler
