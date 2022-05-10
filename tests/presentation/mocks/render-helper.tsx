import React from 'react'
import { render } from '@testing-library/react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { MemoryHistory } from 'history'

type Params = {
  Page: React.FC
  history: MemoryHistory
}

export const renderWithHistory = ({ Page, history }: Params): void => {
  render(
    <HistoryRouter history={history}>
      <Page />
    </HistoryRouter>
  )
}
