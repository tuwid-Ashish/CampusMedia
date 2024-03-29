import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import { RouterProvider,createBrowserRouter }   from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Store/Store.js'
import Authpage from './pages/Authpage.jsx'
import Signupform from './components/AuthUser/Signup.jsx'
import Loginform from './components/AuthUser/Login.jsx'
import VerifyEmail from './components/AuthUser/VerifyEmail.jsx'
import ForgotPassword from './components/AuthUser/ForgotPassword.jsx'
import ResetPassword from './components/AuthUser/ResetPassword.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Authpage children={<Loginform/>}></Authpage>},
      { path: '/forgot-password', element: <Authpage children={<ForgotPassword/>}></Authpage>},
      { path: '/reset-password', element: <Authpage children={<ResetPassword/>}></Authpage>},
      { path: '/verifyEmail', element: <Authpage children={<VerifyEmail/>}></Authpage>},
      { path: '/signup', element: <Authpage children={<Signupform/>}></Authpage> },
    ],
  },
    ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
