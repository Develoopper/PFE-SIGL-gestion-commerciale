import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Axios from './helpers/AxiosInstance';
import Layout from './components/Layout';
import CustomSnackBar from './components/CustomSnackBar';
import Caisse from './views/Caisse';
import Ventes from './views/Ventes';
import Achats from './views/Achats';
import Contacts from './views/Contacts';
import Users from './views/Users';
import Factures from './views/Factures';
import PageNotFound from './views/PageNotFound';
import Login from './views/Login';
import './App.css';

export default function App() {
  // FIXME: Can't perform a React state update on an unmounted component
  // TODO: contacts menu
  // TODO: users & email managment
  // TODO: reset password
  // TODO: send mail
  // FIXME: background
  // FIXME: fix transfert form layout
    
	const userState = useSelector(state => state.userState);
	const dispatch = useDispatch();

  // useEffect(() => {
  //   window.onbeforeunload = () => "show warning";
  // }, [])

  useEffect(() => {
    console.log('app', userState);
  }, [userState])

  useEffect(() => {
    (async () => {
      try {
        // if there is a token and the user is loged out:
        // get the username with the token
        if (localStorage.accessToken && !userState) {
          const resUser = await Axios.post('/auth/resume', null);
          dispatch({ type: 'user/set', payload: resUser.data });
        }

        // if the user is loged in:
        // fill the states with the api's data
        if (userState) {
          // console.log(localStorage.token);
          const resCaisse = await Axios.get('/caisse');
          const resTransferts = await Axios.get('/transferts');
          const resVentes = await Axios.get('/ventes');
          const resAchats = await Axios.get('/achats');
          const resContacts = await Axios.get('/contacts');
          const resUsers = await Axios.get('/users');
          dispatch({ type: 'caisse/set', payload: resCaisse.data });
          dispatch({ type: 'transferts/set', payload: resTransferts.data });
          dispatch({ type: 'ventes/set', payload: resVentes.data });
          dispatch({ type: 'achats/set', payload: resAchats.data });
          dispatch({ type: 'contacts/set', payload: resContacts.data });
          dispatch({ type: 'users/set', payload: resUsers.data });
          dispatch({ type: 'loading/set', payload: false });
        }
      } catch (error) {
        alert(error);
      }
        // console.log('username:', userState);
    })();
  }, [userState])

  return (
    <Router>
      <Switch>
        <Route path='/login'><Login/></Route>
        <Route path='/' exact><Layout><Caisse/></Layout></Route>
        <Route path='/caisse'><Layout><Caisse/></Layout></Route>
        <Route path='/ventes'><Layout><Ventes/></Layout></Route>
        <Route path='/achats'><Layout><Achats/></Layout></Route>
        <Route path='/factures'><Layout><Factures/></Layout></Route>
        <Route path='/contacts'><Layout><Contacts/></Layout></Route>
        <Route path='/users'><Layout><Users/></Layout></Route>
        <Route path='/'><PageNotFound/></Route>
      </Switch>
      <CustomSnackBar/>
      {/* {Prompt} */}
    </Router>
  );
}