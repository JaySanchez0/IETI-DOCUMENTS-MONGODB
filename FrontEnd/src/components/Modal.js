import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {TextField, Button} from '@material-ui/core';
import Select from '@material-ui/core/Select';

export default function Modal(props){
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
            "dueDate":date

        };
        props.addTask(task);

    }
    console.log("Render");
    return(
        <Dialog open={props.open}>
        <DialogContent>
          <div style={{width:'500px'}}>
            <h1>Nueva Actividad</h1>
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
            <center><Button onClick={(e)=>props.close()}>Close</Button></center>
          </div>
        </DialogContent>
      </Dialog>);
}