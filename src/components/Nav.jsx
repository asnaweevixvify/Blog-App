import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'


function Nav(){
    return(
        <div className="nav-container">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/insert">Add Blog</Link></li>
            </ul>
        </div>
    )
}

export default Nav