import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import "./Navb.css";

const cookies = new Cookies();
function Nav() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const cerrarSesion=()=>{
    cookies.remove('usuario', {path: "/"});
    window.location.href='./';
}
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="#" className="nav-logo">
            DASHBOARD ADMINISTRADOR
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/Tabla"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Tablan"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Noticias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Principal
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={()=>cerrarSesion()}
              >
                Cerrar Sesion
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;