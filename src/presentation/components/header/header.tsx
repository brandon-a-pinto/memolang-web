import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import Styles from './styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Link to="/" className={Styles.link}>
        Memolang
      </Link>
      <div>
        <Link to="/login" className={Styles.link}>
          Login
        </Link>
        <Link to="/signup" className={Styles.link}>
          Register
        </Link>
      </div>
    </header>
  )
}

export default memo(Header)
