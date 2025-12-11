import './App.css'
import Navigation from './components/Navigation'
import Login_page from './components/Login_page.jsx'
import Upload from './components/upload.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/Product.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public route - Login */}
          <Route path="/login" element={<Login_page />} />
          
          {/* Protected routes - Require authentication */}
          <Route path="/" element={
            <ProtectedRoute>
              <Navigation />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="upload" element={<Upload />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App