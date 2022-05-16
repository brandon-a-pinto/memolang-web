import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { makeLogin, makeSignUp } from '@/main/factories/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={makeLogin} />
        <Route path="/signup" element={makeSignUp} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
