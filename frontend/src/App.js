import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipe from './pages/Recipe'
import RecipeDisplay from './pages/RecipeDisplay'
import Editme from './pages/Editme'
import SavedRecipes from './pages/SavedRecipes'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Recipe />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} /> 
            <Route path="/:user_id/editme" element={<Editme />} />
            <Route path='/recipes/:recipe_id' element={<RecipeDisplay/>} />
            <Route path='/savedrecipes' element={<SavedRecipes/>} />
          </Routes>
          <ToastContainer autoClose={1500} />
        </div>
      </Router >
    </>
  );
}

export default App;
