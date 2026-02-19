import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SendPage from './pages/SendPage'
import UseCasesPage from './pages/UseCasesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/send" element={<SendPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
