import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Page404 from './pages/Page404';
import './styles/style.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/photo-search" element={<Layout />} >
          <Route index element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
