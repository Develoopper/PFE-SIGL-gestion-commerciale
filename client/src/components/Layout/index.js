import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppBar from "./AppBar";
import SideNav from "./SideNav";
import logo from "../../images/logo.png";
import InternetStatus from '../../components/InternetStatus';

export default function Layout({ children }) {
  const userState = useSelector(state => state.userState);

  const history = useHistory();

  const currentPage = history.location.pathname;

  useEffect(() => {
    console.log(history.location.pathname);
    if ((!localStorage.accessToken || !localStorage.refreshToken) && currentPage !== "/login")
      history.push("login");
    else if (currentPage === "/")
      history.push("caisse");
  }, [userState])

  // const mainClassName = currentPage === "/caisse" ? "main" : "mainNoBackground";

  return (
    <div className='app'>
      <div className="left">
        <div className="logo">
          <img src={logo} alt="Avatar" style={{ height: 110, width: 150 }}/>
        </div>
        <div className="spacer"></div>
        <SideNav/>
        <InternetStatus/>
      </div>
      <div className="right">
        <AppBar/>
        <div className='main'>
          {children}
        </div>
      </div>
    </div>
  )
}
