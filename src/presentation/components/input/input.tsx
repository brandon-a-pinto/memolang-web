import React, { useContext } from 'react'

import Styles from './styles.scss'
import { FormContext } from '@/presentation/contexts'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setState({ ...state, [event.target.name]: event.target.value })
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} data-testid={props.name} onChange={handleChange} />
      <span className={Styles.status}>* Error</span>
    </div>
  )
}

export default Input
