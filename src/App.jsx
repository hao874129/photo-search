import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Page404 from './pages/Page404';
import './styles/style.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index path="/" element={<Homepage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
