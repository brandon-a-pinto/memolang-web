import React, { useEffect, useState } from 'react'

import Styles from './styles.scss'
import { FormStatus, Header, Footer, Input } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/contracts'

type Props = {
  validation: Validation
}

type StateProps = {
  isLoading: boolean
  errorMessage: string
  email: string
  password: string
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    const { email } = state
    validation.validate('email', { email })
  }, [state.email])
  useEffect(() => {
    const { password } = state
    validation.validate('password', { password })
  }, [state.password])

  return (
    <div className={Styles.login}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <button
            data-testid="submit"
            className={Styles.submit}
            disabled
            type="submit"
          >
            Sign in
          </button>
          <span className={Styles.link}>Create account</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
