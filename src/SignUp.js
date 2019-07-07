import React, { useState } from 'react'
import * as bootstrapValidate from 'bootstrap-validate'
import firebase from '../backend/firebase'

window.bootstrapValidate = bootstrapValidate

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)

  const [forgotEmail, setForgotEmail] = useState('')
  const [isValidForgotEmail, setIsValidForgotEmail] = useState(false)

  const [password, setPassword] = useState('')
  const [isAtLeastSix, setIsAtLeastSix] = useState(false)
  const [isAtLeastOneLower, setIsAtLeastOneLower] = useState(false)
  const [isAtLeastOneUpper, setIsAtLeastOneUpper] = useState(false)

  const onForgotEmailChange = (e) => {
    const newEmail = e.target.value
    const regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)

    setIsValidForgotEmail(regex.test(newEmail))
    setForgotEmail(newEmail)
  }

  const onSubmitForgotEmail = (e) => {
    if (isValidForgotEmail) {
      firebase.auth().sendPasswordResetEmail(
        forgotEmail,
      )
        .then(() => {
          // Password reset email sent.
          setForgotEmail('')
        })
        .catch((error) => {
          // Error occurred. Inspect error.code.
          console.log(error.code)
          console.log(error.message)
        })
    }
  }

  const onEmailChange = (e) => {
    const newEmail = e.target.value
    const regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)

    // setIsValidEmail(regex.test(newEmail))
    bootstrapValidate('#form-email', 'email:Invalid email')
    setEmail(newEmail)
  }

  const onPasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    const sixRegex = new RegExp(/^.{6,}$/)
    const lowerCaseRegex = new RegExp(/.*[a-z]/)
    const upperCaseRegex = new RegExp(/.*[A-Z]/)

    setIsAtLeastSix(sixRegex.test(newPassword))
    setIsAtLeastOneLower(lowerCaseRegex.test(newPassword))
    setIsAtLeastOneUpper(upperCaseRegex.test(newPassword))
  }

  const submit = (e) => {
    e.preventDefault()

    if (isValidEmail && isAtLeastOneLower && isAtLeastOneUpper && isAtLeastSix) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setEmail('')
          setPassword('')
        })
        .catch((err) => {
          console.log(err.code)
          console.log(`error: ${err}`)

          if (err.code === 'auth/email-already-in-use') {
            firebase.auth().signInWithEmailAndPassword(email, password)
              .then(() => {
                console.log('login successful')
              })
              .catch(() => {
                console.log('incorrect password or you signed up through Google or Facebook')
              })
          }
        })
    }
  }

  const onGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider).then((result) => {
      console.log(result)
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const onFacebookSignIn = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithRedirect(provider).then((result) => {
      console.log(result)
    })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container">
      <h3>SIGN UP</h3>
      <form>
        <div className="form-group">
          <label htmlFor="form-email">
            Email address
            <input
              type="email"
              className="form-control"
              id='form-email'
              aria-describedby='enter email'
              placeholder='Enter email'
              value={email}
              onChange={onEmailChange}
            />
          </label>
          {
            email && <small className={`form-text text-${isValidEmail ? 'success' : 'danger'}`}>{`${isValidEmail ? 'Valid email' : 'Invalid email'}`}</small>
          }
        </div>
        <div className="form-group">
          <label htmlFor="form-password">
            Password
            <input
              type="password"
              className="form-control"
              id="form-password"
              aria-describedby='enter password'
              placeholder="Password"
              value={password}
              onChange={onPasswordChange}
            />
            { password && <small className={`form-text text-${isAtLeastSix ? 'success' : 'danger'}`}>Min. 6 characters long</small> }
            { password && <small className={`form-text text-${isAtLeastOneLower ? 'success' : 'danger'}`}>At least one lowercase</small> }
            { password && <small className={`form-text text-${isAtLeastOneUpper ? 'success' : 'danger'}`}>At least one uppercase</small> }
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
      </form>

      <button type='submit' onClick={onGoogleSignIn}>Google Sign in</button>
      <button type='submit' onClick={onFacebookSignIn}>Facebook Sign in</button>

      <form>
        <div className="form-group">
          <label htmlFor="form-forgot-password-email">
            Enter email
            <input
              type="email"
              className="form-control"
              id="fform-forgot-password-email"
              aria-describedby='enter email to send password reset'
              placeholder="Email"
              value={forgotEmail}
              onChange={onForgotEmailChange}
            />
          </label>
          <button type='submit' onClick={onSubmitForgotEmail}>Forgot password</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
