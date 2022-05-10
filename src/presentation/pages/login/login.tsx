import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
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
    try {
      event.preventDefault()
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      localStorage.setItem('accessToken', account.accessToken)
      navigate('/')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        errorMessage: err.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Create account
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
