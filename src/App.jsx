import './App.css'

import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';//essa função mapea que a autentificação do usuario foi feita com sucesso

//hooks
import { useState,useEffect } from 'react';
import { useAuthentication } from './Hooks/useAuthentication';

//context
import { AuthProvider } from './context/AthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Deshbord/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [user,setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      setUser(user);
    });
  },[auth]);

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <Navbar/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/posts/:id' element={<Post/>}/>
              <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
              <Route path='/register' element={!user ? <Register/> : <Navigate to="/"/>}/>
              <Route path='/posts/create' element={user ? <CreatePost/> : <Navigate to="/"/>}/>
              <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
