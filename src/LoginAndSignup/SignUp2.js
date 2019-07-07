import React, { useState } from 'react'
import * as bootstrapValidate from 'bootstrap-validate'

window.bootstrapValidate = bootstrapValidate

const SignUp2 = () => {
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)

  const onEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    bootstrapValidate('#form-email', 'email:Invalid email', (isValid) => {
      setIsValidEmail(isValid)
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
        </div>
      </form>
    </div>
  )
}

export default SignUp2
