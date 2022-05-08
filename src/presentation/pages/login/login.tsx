import React, { useEffect, useState } from 'react'

import Styles from './styles.scss'
import { FormStatus, Header, Footer, Input } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/contracts'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

type StateProps = {
  isLoading: boolean
  errorMessage: string
  email: string
  emailError: string
  password: string
  passwordError: string
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  })

  useEffect(() => {
    const { email, password } = state
    setState({
      ...state,
      emailError: validation.validate('email', { email }),
      passwordError: validation.validate('password', { password })
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
    await authentication.auth({ email: state.email, password: state.password })
  }

  return (
    <div className={Styles.login}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <button
            data-testid="submit"
            className={Styles.submit}
            disabled={!!state.emailError || !!state.passwordError}
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
