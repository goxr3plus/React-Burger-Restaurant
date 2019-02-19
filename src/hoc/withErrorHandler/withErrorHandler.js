import React, { Component } from "react"
import Modal from "./../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axionInstance) => {
   return class extends Component {
      state = {
         error: null,
      }

      componentDidMount() {
         axionInstance.interceptors.request.use(req => {
            this.setState({ error: null })
            return req
         })

         axionInstance.interceptors.response.use(
            res => res,
            error => {
               this.setState({ error: error })
            }
         )
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
