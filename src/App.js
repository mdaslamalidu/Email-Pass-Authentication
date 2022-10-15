import logo from './logo.svg';
import './App.css';
import Main from './Layout/Main';
import BootstrapReat from './components/BootstrapReat';
import LoginBootsrap from './components/LoginBootsrap/LoginBootsrap';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <BootstrapReat/>
      },
      {
        path: "/register",
        element: <BootstrapReat/>
      },
      {
        path: "/login",
        element: <LoginBootsrap/>
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
