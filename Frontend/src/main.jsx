import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Store/Store.js'
import Authpage from './pages/Authpage.jsx'
import Signupform from './components/AuthUser/Signup.jsx'
import Loginform from './components/AuthUser/Login.jsx'
import VerifyEmail from './components/AuthUser/VerifyEmail.jsx'
import ForgotPassword from './components/AuthUser/ForgotPassword.jsx'
import ResetPassword from './components/AuthUser/ResetPassword.jsx'
import { DropdownMenuDemo } from './components/Textcomponent.jsx'
import Loginpage from './pages/Loginpage.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import { ThemeProvider } from './components/theme/theme-provider.jsx'
import Messages from './components/messages/Messages.jsx'
import AppLayout from './pages/AppLayout.jsx'
import Notifications from './components/Notifications.jsx'
import LiveClasses from './components/live classes/LiveClasses.jsx'
import UserProfile from './components/Profile/UserProfile.jsx'
import Search from './components/Search/Search.jsx'
import Feed from './components/post/Feed.jsx'
import Connection from './components/Profile/connection.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/', element: <Home />
      },
      {
        path:"/messages", element: <AuthLayout authentication>
            <Feed/>
        </AuthLayout>
      },
      {
        path: "/Notifications",
        element: <AuthLayout authentication>
          <AppLayout childern={<Notifications />} />
        </AuthLayout>
      },
      {
        path: "/live-classes",
        element: <AuthLayout authentication>
          <AppLayout childern={<LiveClasses />} />
        </AuthLayout>
      },
      {
        path: "/user/:profile",
        element: <AuthLayout authentication>
          <AppLayout childern={<UserProfile />} />
        </AuthLayout>
      },
      {
        path: "/user/:profile",
        element: <AuthLayout authentication>
          <AppLayout childern={<Connection />} />
        </AuthLayout>,
        children: [
          {
            path:"/user/:profile/connection/:followers",
            element: <AuthLayout authentication>
              <AppLayout childern={<Connection />} />
              </AuthLayout>,
          },
        ]
      },
      {
        path: "/Search",
        element: <AuthLayout authentication>
          <AppLayout childern={<Search />} />
        </AuthLayout>
      },
      {
        path: '/login', element: <AuthLayout authentication={false}>
          <Loginpage />
        </AuthLayout>
      },
      {
        path: '/signup', element: <AuthLayout authentication={false}>
          <Signupform />
        </AuthLayout>
      },
      { path: '/forgot-password', element: <Authpage children={<ForgotPassword />}></Authpage> },
      { path: '/reset-password', element: <Authpage children={<ResetPassword />}></Authpage> },
      { path: '/verifyEmail', element: <Authpage children={<VerifyEmail />}></Authpage> },

    ],
  },
  {
    path: "/test",
    element: <DropdownMenuDemo />,
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
