import logo from './logo.svg';
import './App.css';
import Main from './Layout/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/LoginBootsrap/Login';
import Register from './components/Register/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  }
])


function App() {

  return (
    <div className="">
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
