import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from './firebase'
import modeData from './ModeData' 

function ModeCom(props){
    const [result,setResult] = useState('')
    return(
            <div className="seacrh-container">
                <div className="search-box">
                        <input type='text' value={result} onInput={checkResult}></input>
                        <Link to='/result'><i className="fa-solid fa-magnifying-glass fa-xl" onClick={sendResult}></i></Link>
                    </div>
                    <div className="mode-container">
                    {modeData.map((e,index)=>{
                        return(
                                <Link to='/desmode' key={index}><p onClick={checkMode}>{e}</p></Link>
                        )
                    })}
                    </div>
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
