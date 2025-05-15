import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'


function Nav(props){
    const status = props.status
    return(
        <div className="nav-container">
            <ul>
                <li><Link to="/blog">Home</Link></li>
                {status &&<li><Link to="/insert">Add Blog</Link></li>}
                {!status && <li><Link to="/login">Log in</Link></li>}
            </ul>
        </div>
    )
}

export default Nav