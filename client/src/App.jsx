import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from './components/InitialNavbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import MainNavbar from './components/MainNavbar';
import CreatePost from './components/CreatePost';
import Searching from './components/Searching';
import './App.css';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <> <Navbar /> <Login /> <Footer /> </>
    },
    {
      path: "/signup",
      element: <> <Navbar /> <Signup /> <Footer />  </>
    },
    {
      path: "/home",
      element: <> <MainNavbar /> <Home /> <Footer /> </>
    },
    {
      path: "/account",
      element: <> <MainNavbar /> <Home /> <Footer /> </>
    },
    {
      path: "/createPost",
      element: <> <MainNavbar /> <CreatePost /> <Footer /> </>
    },
    {
      path: "/search",
      element: <> <MainNavbar /> <Searching /> <Footer /> </>
    }
  ]);


  return (
    <>
      <RouterProvider router={router}> </RouterProvider>
    </>
  )
}

export default App;