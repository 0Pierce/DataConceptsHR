import React from 'react'
import ReactDOM from 'react-dom/client'
import Employees from "./pages/Employees.jsx"
import Jobs from "./pages/Jobs.jsx"
import Deps from "./pages/Departments.jsx"


import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'



const router = createBrowserRouter([
{
  path: "/",
  element: <Employees/>
},
{
  path:"/Jobs",
  element:<Jobs/>
},
{
  path:"/Departments",
  element:<Deps/>
},


])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
