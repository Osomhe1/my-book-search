import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book/:id' element={<BookDetail />} />
      </Routes>
    </Router>
  )
}

export default App
