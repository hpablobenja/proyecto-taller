import React, { Component } from 'react';
import './tablas.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Nav from "./Nav/Navbar";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const url="http://localhost:9000/datos/api/noticias";
const urlPost="http://localhost:9000/datos/api/nguardar";
const urlDelete="http://localhost:9000/datos/api/nborrar/";
class Tablan extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    titulo: '',
    descripcion: '',
    autor: '',
    publicado: '',
    fuente: '',
    categoria: '',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(urlPost,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.post(urlPost, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.post(urlDelete+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarEmpresa=(empresa)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: empresa.id,
      titulo: empresa.titulo,
      descripcion: empresa.descripcion,
      autor: empresa.autor,
      publicado: empresa.publicado,
      fuente: empresa.fuente,
      categoria: empresa.categoria
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
    if(!cookies.get('usuario')){
      window.location.href="/Login";
    }
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
      <Nav />
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Noticia</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th className="c0">ID</th>
          <th className="c2">Titulo</th>
          <th className="c1">Descripcion</th>
          <th>Autor</th>
          <th>Publicado</th>
          <th>Fuente</th>
          <th>Categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.id}</td>
          <td>{empresa.titulo}</td>
          <td>{empresa.descripcion}</td>
          <td>{empresa.autor}</td>
          <td>{empresa.publicado}</td>
          <td>{empresa.fuente}</td>
          <td>{empresa.categoria}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(empresa); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(empresa); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="titulo">Titulo</label>
                    <input className="form-control" type="text" name="titulo" id="titulo" onChange={this.handleChange} value={form?form.titulo: ''}/>
                    <br />
                    <label htmlFor="descripcion">Descripcion</label>
                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion: ''}/>
                    <br />
                    <label htmlFor="autor">Autor</label>
                    <input className="form-control" type="text" name="autor" id="autor" onChange={this.handleChange} value={form?form.autor:''}/>
                    <br />
                    <label htmlFor="publicado">Publicado</label>
                    <input className="form-control" type="text" name="publicado" id="publicado" onChange={this.handleChange} value={form?form.publicado:''}/>
                    <br />
                    <label htmlFor="fuente">Fuente</label>
                    <input className="form-control" type="text" name="fuente" id="fuente" onChange={this.handleChange} value={form?form.fuente:''}/>
                    <br />
                    <label htmlFor="categoria">Categoria</label>
                    <input className="form-control" type="text" name="categoria" id="categoria" onChange={this.handleChange} value={form?form.categoria:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la empresa {form && form.titulo}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default Tablan;
