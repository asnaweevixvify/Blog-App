import './App.css'
import { useState , useEffect } from 'react'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import Swal from 'sweetalert2'
import { onAuthStateChanged } from 'firebase/auth'

function Nav(props){
    const [emailName,setEmailName] = useState('')
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
          if (user) {
            setEmailName(user.email.split('@')[0])
          } else {
            setEmailName('')
          }
        });
        return () => unsubscribe();
      },[]);

    const status = props.status
    return(
        <div className="nav-container">
            <ul>
                <li><Link to="/">Home</Link></li>
                {status &&<li><Link to="/insert">Add Blog</Link></li>}
                {!status && <li><Link to="/login">Log in</Link></li>}
                {status &&<li><Link to="/profile">{emailName}</Link></li>}
                {status &&<li onClick={signoutBtn}>Logout</li>}
            </ul>
        </div>
    )
    function signoutBtn(){
        Swal.fire({
            title: `<h2>ออกจากระบบสำเร็จ</h2>`,
            icon: "success",
            draggable: true
          }).then(()=>{
            window.location.reload()
            return signOut(auth);
          })
    }
}

export default Nav