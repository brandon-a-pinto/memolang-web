import React, { useContext } from 'react'

import Styles from './styles.scss'
import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {state.errorMessage && <span className={Styles.error}>Error</span>}
    </div>
  )
}

export default FormStatus
