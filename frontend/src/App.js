import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Recipe from './pages/Recipe'
import RecipeDisplay from './pages/RecipeDisplay'
import Editme from './pages/Editme'
import SavedRecipes from './pages/SavedRecipes'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/NotFound'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // let location = useLocation();

  return (
    <>
      <Router>
        <div className='container'>
          {/* {
            window.location.pathname !== '/admin' ? <Header/> : null
          } */}
          {/* honestly do not know if this is a good approach 
            because what if i want to add in footers
            which i prob will*/}
          <Routes>
            <Route path='/' element={<><Header /><Recipe /></>} />
            <Route path='/login' element={<><Header /><Login /></>} />
            <Route path='/register' element={<><Header /><Register /></>} /> 
            <Route path="/:user_id/editme" element={<><Header /><Editme /></>} />
            <Route path='/recipes/:recipe_id' element={<><Header /><RecipeDisplay/></>} />
            <Route path='/savedrecipes' element={<><Header /><SavedRecipes/></>} />
            <Route path='/admin' element={<AdminDashboard/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
          <ToastContainer autoClose={1500} />
        </div>
      </Router >
    </>
  );
}

export default App;
