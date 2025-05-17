import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from './firebase'
import modeData from './ModeData' 
import reactImg from '../pic/react.png'
import fireImg from '../pic/fire.png'
import jsImg from '../pic/js.png'
import vsImg from '../pic/vs.png'

function ModeCom(props){
    const [result,setResult] = useState('')
    return(
            <div className="seacrh-container">
                <p className='search-main'>ค้นหาบทความ</p>
                <div className="search-box">
                        <input type='text' value={result} onInput={checkResult}></input>
                        <Link to='/result'><i className="fa-solid fa-magnifying-glass fa-xl" onClick={sendResult}></i></Link>
                    </div>
                    <p className='search-main'>หมวดหมู่ต่างๆ</p>
                    <div className="mode-container">
                    {modeData.map((e,index)=>{
                        return(
                                <Link to='/desmode' key={index}><p onClick={checkMode}>{e}</p></Link>
                        )
                    })}
                    </div>
                    <p className='search-main'>Tools</p>
                    <div className="logo">
                        <img src={jsImg}></img>
                        <img src={reactImg}></img>
                        <img src={fireImg}></img>
                        <img src={vsImg}></img>
                    </div>
                    <p className='copy'>© copyright by vixvify 2025</p>
            </div>
    )
    function checkMode(e){
        props.checkMode(e.target.innerText);
    }
    function checkResult(e){
        setResult(e.target.value)
    }
    function sendResult(){
        props.getResult(result)
        setResult('')
    }
}

export default ModeCom
