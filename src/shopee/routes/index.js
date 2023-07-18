import React, {lazy, Suspense} from 'react'
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Skeleton } from 'antd'
import LayoutShopee from '../component/layout'
import { helper } from '../helper/common'


const HomeShopee = lazy(() => import('../pages/home/index'))
const DetailShopee = lazy(() => import('../pages/detail/index'))
const LoginShopee = lazy(() => import('../pages/login/login'))
const RegisterShopee = lazy(() => import('../pages/login/register'))
const CartShopee = lazy(() => import('../pages/cart/index'))

function IsLoginUserShopee({ children, ...rest }) {
  let auth = helper.fakeAuthLogin();
  return (
    <Route
      {...rest}
      render={({location}) =>
        auth ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        ) : (
          children
        )
      }
    >

    </Route>
  )
}

function PrivateRouteShopee({ children, ...rest }) {
  let auth = helper.fakeAuthLogin();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const RoutesApp = () => {
  return(
    <Router>
      <Suspense fallback={<Skeleton active />}>
        <Switch>
          <PrivateRouteShopee path="/" exact>
            <LayoutShopee>
                <HomeShopee/>
            </LayoutShopee>
          </PrivateRouteShopee>
          <PrivateRouteShopee path="/home">
            <LayoutShopee>
                <HomeShopee/>
            </LayoutShopee>
          </PrivateRouteShopee>
          <PrivateRouteShopee path="/cart">
            <CartShopee/>
          </PrivateRouteShopee>
          <PrivateRouteShopee path="/product/:slug/:id">
            <DetailShopee/>
          </PrivateRouteShopee>
          <IsLoginUserShopee path="/login">
            <LoginShopee/>
          </IsLoginUserShopee>
            <RegisterShopee path="/register"/>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default RoutesApp
