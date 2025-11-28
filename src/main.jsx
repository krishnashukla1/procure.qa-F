// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

//=======================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // Import Router
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'  // Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap App here */}
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>,
)