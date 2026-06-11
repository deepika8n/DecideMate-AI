import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductSearch from './pages/ProductSearch'
import ProductComparison from './pages/ProductComparison'
import AlternativeFinder from './pages/AlternativeFinder'
import AIAdvisor from './pages/AIAdvisor'
import ChatAssistant from './pages/ChatAssistant'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/search"
          element={<ProductSearch />}
        />

        <Route
          path="/compare"
          element={<ProductComparison />}
        />

        <Route
  path="/alternatives"
  element={<AlternativeFinder />}
/>

<Route path="/ai" element={<AIAdvisor />} />

<Route path="/chat" element={<ChatAssistant />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App