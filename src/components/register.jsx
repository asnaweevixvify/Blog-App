import { createUserWithEmailAndPassword } from 'firebase/auth'
import './App.css'
import { useState } from 'react'
import { auth } from './firebase'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'

function Register(){
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    return(
        <div className="login-container">
            <h1 className='login-main'>สร้างบัญชี</h1>
            <form onSubmit={sendData}>
                <span>Email</span>
                <input type='text' className='login-name' onInput={inputText} ></input>
                <span>Password</span>
                <input type='password' className='login-pass' onInput={inputPass}></input>
                <button type='submit' className='login-btn'>สร้างบัญชี</button>
            </form>
        </div>
    )
    function inputText(e){
        setName(e.target.value)
    }
    function inputPass(e){
        setPassword(e.target.value)
    }
    async function sendData(e){
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(auth,name,password)
            Swal.fire({
                title: "สร้างบัญชีสำเร็จ",
                icon: "success",
                draggable: true
              }).then(()=>{
                navigate('/');
              })
            
        }   
        catch(err){
            alert('สร้างบัญชีไม่สำเร็จ')
            console.log(err);
        }
    }
}

export default Register