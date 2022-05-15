import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Styles from './styles.scss'
import { FormStatus, Header, Footer, Input } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/contracts'
import { AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

type StateProps = {
  isLoading: boolean
  errorMessage: string
  email: string
  emailError: string
  username: string
  usernameError: string
  password: string
  passwordError: string
  passwordConfirmation: string
  passwordConfirmationError: string
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
    email: '',
    emailError: '',
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    const { email, username, password, passwordConfirmation } = state
    setState({
      ...state,
      emailError: validation.validate('email', { email }),
      usernameError: validation.validate('username', { username }),
      passwordError: validation.validate('password', { password }),
      passwordConfirmationError: validation.validate('passwordConfirmation', {
        passwordConfirmation
      })
    })
  }, [state.email, state.username, state.password, state.passwordConfirmation])

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
      await addAccount.add({
        email: state.email,
        username: state.username,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      navigate('/login')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        errorMessage: err.message
      })
    }
  }
  return (
    <div className={Styles.signup}>
      <Header />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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
            disabled={
              !!state.emailError ||
              !!state.usernameError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
            className={Styles.submit}
          >
            Create account
          </button>
          <Link data-testid="login-link" to="/login" className={Styles.link}>
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
