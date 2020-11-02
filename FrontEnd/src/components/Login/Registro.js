import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import {Button, TextField, Snackbar, SnackbarContent} from '@material-ui/core';

export default function Registro(props){
    const [user,setUser] = useState("");
    const [pw,setPW] = useState("");
    const [rpw,setRPW] = useState("");
    const [name,setName] = useState(null);
    const [correct,setCorrect] = useState(true);
    const registrarse = ()=>{
        if((pw==rpw && pw=="") || pw!=rpw){
            setCorrect(false);
            return ;
        }
        fetch("https://rocky-sands-24100.herokuapp.com/user",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            mode: 'cors',
            body:JSON.stringify({email:user,password:pw,name:name})
        }).then(resp=>resp.text()).then((data)=>{
            console.log("Data");
            console.log(data);
            localStorage.setItem("name",name);
            localStorage.setItem("email",user);
            localStorage.setItem("isLogged",true);
            setUser("");
            setPW("");
        }).catch(e=>alert("No se pudo registrar el usuario, intenta de nuevo"));
        console.log({email:user,password:pw,name:name});

    }
    if(localStorage.getItem("isLogged")){
        return <Redirect to="/planer"></Redirect>;
    }
    const CloseMenssage = (
        <Button color="secondary" size="small" onClick={()=>setCorrect(true)}><CloseIcon style={{background:'white'}}></CloseIcon></Button>
    );
    return (<div id="login" style={{width:'100%',height:'100hv',background:'orange',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'600px',height:'490px',background:'white',display:'block',borderRadius:'10px'}}>
            <div style={{textAlign:'center'}}><h1>Registro</h1></div>
            <div style={{background:'red',height:'1px'}}></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <TextField label="Nombre" value={name} onChange={(e)=>setName(e.target.value)} style={{width:'90%'}}/></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <TextField label="Correo" value={user} onChange={(e)=>setUser(e.target.value)} style={{width:'90%'}}/></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <TextField type="password" value={pw} label="Contraseña" style={{width:'90%'}} onChange={(e)=>setPW(e.target.value)}/></div>
                <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <TextField type="password" value={rpw} label="Retry Contraseña" style={{width:'90%'}} onChange={(e)=>setRPW(e.target.value)}/></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button style={{border:'1px solid orange'}} onClick={()=>registrarse()}>Registro</Button></div>
            <div style={{height:'30px'}}></div>
        </div>
        <Snackbar open={!correct}>
                <SnackbarContent style={{background:'red'}} message="Datos incorrectos verifica tu contraseña." action={CloseMenssage}></SnackbarContent>
            </Snackbar>
    </div>);
}