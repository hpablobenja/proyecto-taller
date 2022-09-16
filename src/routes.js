import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Sign from './Signin';
import Tabla from './tablas/Tabla.js';
import Tablan from './tablas/Tablan.js';
import News from './filtros/News.js';


function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/App" component={Sign}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Tabla" component={Tabla}/>          
            <Route exact path="/Tablan" component={Tablan}/>
            <Route exact path="/" component={News}/>

        </Switch>
    </BrowserRouter>
  );
}

export default Routes;