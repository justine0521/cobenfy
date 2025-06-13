import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Checkout from './Modal/Checkout.jsx'
import Information from './pages/Information.jsx'

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Products" element={<Products/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/information" element={<Information/>}/>
      </Routes>
    </main>
  )
}

export default App
