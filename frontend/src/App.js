import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipe from './pages/Recipe'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            {/* <Route path='/' element={<Dashboard />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} /> 
            <Route path='/recipe' element={<Recipe />} />
          </Routes>
        </div>
      </Router>

      {/* do not know why the toast container isnt working rahhhhhhh */}
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
