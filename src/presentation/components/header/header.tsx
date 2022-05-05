import React, { memo } from 'react'

import Styles from './styles.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <h1>Language App</h1>
    </header>
  )
}

export default memo(Header)
