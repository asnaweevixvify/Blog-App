import { signInWithEmailAndPassword } from 'firebase/auth'
import './App.css'
import { useState } from 'react'
import { auth } from './firebase'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



function Login(props){
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    return(
        <div className="login-container">
            <h1 className='login-main'>เข้าสู่ระบบ</h1>
            <form onSubmit={sendInfo}>
                <span>Email</span>
                <input type='text' className='login-name' onInput={nameInput}></input>
                <span>Password</span>
                <input type='password' className='login-pass' onInput={passInput}></input>
                <button type='submit' className='login-btn'>เข้าสู่ระบบ</button>
            </form>
        </div>
    )
    function nameInput(e){
        setName(e.target.value)
    }
    function passInput(e){
        setPassword(e.target.value)
    }
    async function sendInfo(e){
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth,name,password)
            props.status(true)
            Swal.fire({
                title: "เข้าสู่ระบบสำเร็จ",
                icon: "success",
                draggable: true
              }).then(()=>{
                navigate('/blog');
              })
            
        }   
        catch(err){
            alert('เข้าสู่ระบบไม่สำเร็จ')
            console.log(err);
        }
    }
}

export default Login