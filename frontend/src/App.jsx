import react from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2200 }} />
      <AppRoutes />
    </>
  )
}

export default App
