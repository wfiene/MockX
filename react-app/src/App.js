import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import GetAllItems from './components/Items/allItems';
import ItemDetails from './components/Items/oneItem';
import CurrentUserItems from './components/Items/userItems';
import UserReviews from './components/UserReviews/userReviews';
import Footer from './components/footer/footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Footer />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/users/:userId/items' exact={true}>
            <CurrentUserItems />
          </Route>
          <Route path='/users/:userId/reviews' exact={true}>
            <UserReviews />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/' exact={true} >
            <GetAllItems />
          </Route>
          <Route path='/items/:itemId'>
            <ItemDetails />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
