import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { makeLogin } from '@/main/factories/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLogin} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
