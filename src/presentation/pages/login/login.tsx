import React from 'react'

import Styles from './styles.scss'
import { Spinner, Header, Footer } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Email" />
          <span className={Styles.status}>* Error</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Password" />
          <span className={Styles.status}>* Error</span>
        </div>
        <button className={Styles.submit} type="submit">
          Sign in
        </button>
        <span className={Styles.link}>Create account</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
