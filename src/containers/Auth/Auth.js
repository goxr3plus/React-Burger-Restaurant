import React, { Component } from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import "./Auth.css"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner"
import { Redirect } from "react-router-dom"
import { updateObject, checkValidity } from "../../shared/utility"

class Auth extends Component {
   state = {
      controls: {
         email: {
            elementType: "input",
            elementConfig: {
               type: "email",
               placeholder: "E-Mail Address",
            },
            value: "",
            validation: {
               required: true,
               isEmail: true,
            },
            valid: false,
            touched: false,
         },
         password: {
            elementType: "input",
            elementConfig: {
               type: "password",
               placeholder: "Password",
            },
            value: "",
            validation: {
               required: true,
               minLength: 6,
            },
            valid: false,
            touched: false,
         },
      },
      isSignUp: true,
   }

   componentDidMount() {
      if (!this.props.burgerBuilding && this.props.authRedirectPath) {
         this.props.onSetAuthRedirectPath()
      }
   }

   inputChangedHandler = (event, controlName) => {
      const updatedControls = updateObject(this.state.controls, {
         [controlName]: updateObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true,
         }),
      })

      this.setState({ controls: updatedControls })
   }

   submitHandler = event => {
      event.preventDefault()
      this.props.onAuth(
         this.state.controls.email.value,
         this.state.controls.password.value,
         this.state.isSignUp
      )
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => {
         return {
            isSignUp: !prevState.isSignUp,
         }
      })
   }

   render() {
      const forElementsArray = []
      for (let key in this.state.controls) {
         forElementsArray.push({
            id: key,
            config: this.state.controls[key],
         })
      }

      let form = forElementsArray.map(formElement => (
         <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
         />
      ))
      if (this.props.loading) form = <Spinner />
      if (this.props.isAuthenticated) {
         form = <Redirect to={this.props.authRedirectPath} />
      }

      let errorMessage = null
      if (this.props.error) errorMessage = <p> {this.props.error}</p>
      return (
         <div className="Auth">
            {errorMessage}
            <form onSubmit={this.submitHandler}>
               {form}
               <Button btnType="Success">Submit</Button>
               <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                  Switch To {this.state.isSignUp ? "Sign In" : "Sign Up"}
               </Button>
            </form>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      burgerBuilding: state.burgerBuilder.building,
      authRedirectPath: state.auth.authRedirectPath,
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
      onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath("/")),
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Auth)
