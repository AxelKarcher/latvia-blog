import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import './App.scss'
import {background} from './config/colors'

// router back
// cleaner back
// mdp oublié
// post datés -> pouvoir filtrer période
// refaire le drop de fichier

const App = () => {

  const routes = [
    {path: '/', elem: <Navigate replace to='/auth' />},
    {path: '/auth', elem: <AuthPage />},
    {path: '/home', elem: <HomePage />},
    {path: '*', elem: <NotFoundPage />}
  ]

  return (
    <div id='app-container' style={{backgroundColor: background}}>
      <BrowserRouter>
        <Routes>
          {routes.map(({path, elem}, i) => (
            <Route key={i} path={path} element={elem} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App