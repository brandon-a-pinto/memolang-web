import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Styles from './styles.scss'
import { FormStatus, Header, Footer, Input } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

type StateProps = {
  emailError: string
  usernameError: string
  passwordError: string
  passwordConfirmationError: string
}

const SignUp: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    emailError: 'Invalid field',
    usernameError: 'Invalid field',
    passwordError: 'Invalid field',
    passwordConfirmationError: 'Invalid field'
  })

  return (
    <div className={Styles.signup}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form}>
          <h2>Sign up</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="text" name="username" placeholder="Username" />
          <Input type="password" name="password" placeholder="Password" />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
          />
          <button
            data-testid="submit"
            type="submit"
            disabled
            className={Styles.submit}
          >
            Create account
          </button>
          <Link to="/login" className={Styles.link}>
            Already have an account?
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
