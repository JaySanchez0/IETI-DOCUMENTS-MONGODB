import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {TextField, Button} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Axios from 'axios';

export default function Modal(props){
    const [file,setFile] = React.useState(null);
    const [preview,setPreview] = React.useState("");
    const [descripcion,setDescripcion] = React.useState("");
    const [estado,setEstado] = React.useState("Ready");
    const [email,setEmail] = React.useState("");
    const [name,setName] = React.useState("");
    const [date,setDate] = React.useState(new Date());
    var addTask=()=>{
        var task = {
            "description":descripcion,
            "responsible":{
                "name":name,
                "email":email
            },
            "status":estado,
            "dueDate":date,
            "fileUrl": "http://localhost:8080/api/files/"+file.name

        };

        const form = new FormData();
        form.append("file",file);
        Axios.post("http://localhost:8080/api/files",form).then(()=>{
          props.addTask(task);
        }).catch(e=>alert("No se pudo cargar los datos"));

    }
    console.log("Render");
    console.log(file);
    return(
        <Dialog open={props.open}>
        <DialogContent>
          <div style={{width:'500px'}}>
            <h1>Nueva Actividad</h1>
            <center>{file!=null ? <img src={preview} style={{width:"200px",height:"200px"}}/> : <div style={{width:"200px",height:"200px"}}></div> }</center>

            <input type="file" onChange={e=>{
              var fr = new FileReader()
              fr.readAsDataURL(e.target.files[0])
              const d = e.target.files[0];
              fr.onload = function(e) {
                setFile(d);
                setPreview(this.result);
              }}}
            ></input>
            <br></br>
            <TextField value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} type="text" style={{width:'90%'}} label="Descripcion"></TextField>
            <div style={{width:'100%',height:'20px'}}></div>
            <label>Estado</label>
            <br></br>
            <Select value={estado} onChange={(e)=>setEstado(e.target.value)}>
              <option value={"Ready"}>Ready</option>
              <option value={"In progress"}>In progress</option>
              <option value="Done">Done</option>
            </Select>
            <div style={{width:'100%',height:'20px'}}></div>
            <TextField value={name} onChange={(e)=>setName(e.target.value)} type="text" style={{width:'90%'}} label="Nombre encargado"></TextField>
            <div style={{width:'100%',height:'20px'}}></div>
            <TextField value={email} onChange={(e)=>setEmail(e.target.value)} type="text" style={{width:'90%'}} label="Correo encargado"></TextField>
            <div style={{width:'100%',height:'20px'}}></div>
            <TextField type="date" onChange={(e)=>setDate(e.target.value)}></TextField>
            <div style={{width:'100%',height:'20px'}}></div>
            <center><Button onClick={(e)=>addTask()}>Añadir</Button></center>
            <div style={{width:'100%',height:'20px'}}></div>
            <center><Button onClick={(e)=>{
              props.close();
              setPreview("");
              setFile(null);
              }}>Close</Button></center>
          </div>
        </DialogContent>
      </Dialog>);
}