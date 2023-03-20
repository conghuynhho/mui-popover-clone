import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GgjThemeProvider } from './providers/GgjThemeProvider/ThemeContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GgjThemeProvider>
      <App />
    </GgjThemeProvider>
  </React.StrictMode>,
)
