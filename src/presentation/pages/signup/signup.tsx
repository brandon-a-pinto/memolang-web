import React from 'react'
import { Link } from 'react-router-dom'

import Styles from './styles.scss'
import { FormStatus, Header, Footer, Input } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <Header />
      <FormContext.Provider value={{ state: {} }}>
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
          <button type="submit" className={Styles.submit}>
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
