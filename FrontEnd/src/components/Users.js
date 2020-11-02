import React,{useState,useEffect} from 'react';

export default function Users(){
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        fetch("https://rocky-sands-24100.herokuapp.com/user")
            .then(res=>res.json())
            .then((data)=>{
                console.log("Update");
                setUsers(data);});
    },[]);
    console.log("Entro div");
    return(<ul>{users.map(user=><li>{"email: "+user.email+"       password: "+user.password}</li>)}</ul>);
}