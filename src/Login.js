import React, { Component } from 'react';
import './css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
//import md5 from 'md5';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const baseUrl="http://localhost:9000/datos/api/personas";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }
	trabajo={}
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
			this.trabajo=response.data;
            return response.data;
        })
        .then(response=>{
			var entrada=false;
			var respuesta='';
			for(let i=0;i<response.length;i++){
					let a=JSON.stringify(response[i].usuario);					
					let b=JSON.stringify(this.state.form.username);
					let c=JSON.stringify(response[i].password);					
					let d=JSON.stringify(this.state.form.password);
					if(a==b && c==d){
						entrada=true;
						respuesta=response[i];
					}
				}
            if(entrada){
                cookies.set('usuario', respuesta.usuario, {path: "/"});
                alert(`Bienvenido ${respuesta.usuario}`);
                window.location.href="./Tabla";
            	}
     
          	else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
			alert(error);
            console.log(error);
        })

    }

    componentDidMount() {
		console.log(window.location.href);
		if(cookies.get('usuario')){
            window.location.href="/Tabla";
        }
		if((window.location.hostname==="http://localhost:3000/App") && window.location.pathname==="/" && (!cookies.get('nombre'))){
			window.location.href="/";
		}
    }
    
 
    render() {
    	    
        return (
    	<div className="container-fluid">
		<div className="row">
			<div className="col-lg-6 col-md-6 form-container">
				<div className="col-lg-8 col-md-12 col-sm-9 col-xs-12 form-box text-center">
					<div className="heading mb-4">
						<h2>Ingresa a tu cuenta</h2>

					</div>
					<form>
						<div className="form-input">
							<span><i className="fa fa-envelope"></i></span>
							<input type="text" 
							placeholder="UserName" 
							name="username" 
							onChange={this.handleChange} 
							disabled={false}
							required={true}/>
						</div>
					
						<div className="form-input">
							<span><i className="fa fa-lock"></i></span>
							<input type="password" 
							placeholder="Password" 
							name="password" 
							onChange={this.handleChange} 
							disabled={false}
							required={true}/>
						</div>
					
						<div className="row mb-3">
							<div className="col-6 d-flex">
								<div className="custom-control custom-checkbox">
									<input type="checkbox" className="custom-control-input" id="cb1"/>
									<label className="custom-control-label text-white" htmlFor="cb1">No cerrar sesion</label>
								</div>
							</div>
							
							<div className="col-6 text-right">
								<a href="/Login" className="forget-link">Recordar contraseña</a>
							</div>
						</div>
						
						<div className="text-left mb-3">
							<button type="submit" className="botonPrincipal btn btn-success" onClick={()=> this.iniciarSesion()}>LOGIN</button>
						</div>
						<div className="text-white mb-3">o ingrese con</div>
						<div className="row mb-3">
							<div className="col-4">
								<a href="https://www.facebook.com/" className="btnn btn btn-block btn-social1 btn-facebook">
								<FontAwesomeIcon icon="fa-brands fa-facebook" />
								Facebook
								</a>
							</div>
							<div className="col-4">
								<a href="https://www.google.com/" className="btnn btn btn-block btn-social1 btn-google">
								Google
								</a>
							</div>
							<div className="col-4">
								<a href="https://www.twitter.com/" className="btnn btn btn-block btn-social1 btn-twitter">
									
									Twitter
								</a>
							</div>
						</div>
						<div className="text-white">No tienes una cuenta?
							<a href="./Login" className="register-link"> Registrese aqui</a>
						</div>
					</form>
					<a type="button" className="botonPrincipal btn btn-dark" href="./">Regresar Pagina Principal</a>
				</div>
			</div>
			<div className="col-lg-6 col-md-6 d-none d-md-block image-container"></div>
		</div>
	</div>
        );
    }
}

export default Login;
