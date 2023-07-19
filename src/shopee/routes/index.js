import React, {lazy, Suspense, useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {Skeleton} from 'antd'
import LayoutShopee from '../component/layout'
import {helper} from '../helper/common'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../firebase'
import {AuthProvider, useAuthValue} from "../authContext";

const HomeShopee = lazy(() => import('../pages/home/index'))
const DetailShopee = lazy(() => import('../pages/detail/index'))
const LoginShopee = lazy(() => import('../pages/login/login'))
const RegisterShopee = lazy(() => import('../pages/login/register'))
const CartShopee = lazy(() => import('../pages/cart/index'))

function PrivateRoute({children}) {
  const {currentUser} = useAuthValue()

  if(!currentUser?.emailVerified){
    return <Redirect to='/login' replace/>
  }

  return children
}

function IsLoginUserShopee({children}) {
  const {currentUser} = useAuthValue()
  console.log(currentUser);

  if(currentUser){
    return <Redirect to='/' replace/>
  }

  return children
}

const RoutesApp = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Suspense fallback={<Skeleton active/>}>
          <Switch>
            <PrivateRoute path="/" exact>
              <LayoutShopee>
                <HomeShopee/>
              </LayoutShopee>
            </PrivateRoute>
            <PrivateRoute path="/home">
              <LayoutShopee>
                <HomeShopee/>
              </LayoutShopee>
            </PrivateRoute>
            <PrivateRoute path="/cart">
              <CartShopee/>
            </PrivateRoute>
            <PrivateRoute path="/product/:slug/:id">
              <DetailShopee/>
            </PrivateRoute>
            <IsLoginUserShopee path="/login">
              <LoginShopee/>
            </IsLoginUserShopee>
            <RegisterShopee path="/register"/>
          </Switch>
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

export default RoutesApp
