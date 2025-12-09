
import './App.css'
import Navigation from './components/Navigation'
import Justlooking from './components/Justlooking.jsx'
import Login_page from './components/Login_page.jsx'
import Upload from './components/upload.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/Product.jsx'
import Dashboard from './components/Dashboard.jsx'
function App() {
  return (
    <>
    {/* <Navigation /> */}
      <Router>
      
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Dashboard />} />
          <Route exect path="Upload" element={<Upload/>} />
          <Route exect path="Product" element={<Product/>} />
        </Route>
          <Route exect path="Login" element={<Login_page/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
