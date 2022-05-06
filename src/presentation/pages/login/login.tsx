import React from 'react'

import Styles from './styles.scss'
import { FormStatus, Header, Footer, Input } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <button className={Styles.submit} type="submit">
          Sign in
        </button>
        <span className={Styles.link}>Create account</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
