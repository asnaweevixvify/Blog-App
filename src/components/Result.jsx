import './App.css'
import {useEffect, useState } from 'react'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'
import Swal from 'sweetalert2'
import { auth } from './firebase'

function Result(props){
    const dataList = props.sendData
    const user = auth.currentUser
    const [index,setIndex] = useState('')
    const result = props.result
    const [not,setNot] = useState(true)

    useEffect(()=>{
        const newItem = dataList.filter((e)=>{
            return e.text.toLowerCase().includes(result)
        })
        if(newItem.length === 0){
            setNot(false)
        }
    },[])
    
    return(
        <div className="blog-container">
            <h1 className='main-blog'>Result</h1>
            {!not && <h1 className='main-not'>Not found</h1>}
            <div className="blog-list-container">
                <ul>
                    {dataList.map((e,index)=>{
                        if(e.text.toLowerCase().includes(result)){
                            return(
                                <div className="list-container"key={index}>
                                    <li>
                                        <h2 className='blog-topic' onClick={()=>sendIndex(index)}><Link to="/des">{e.text}</Link></h2>
                                        <h4 className='blog-des' style={{ whiteSpace: 'pre-line' }}>
                                            {e.des}
                                        </h4>
                                        <div className="icon">
                                            <h3 onClick={()=>sendIndex(index)}><Link to="/des">อ่านเพิ่มเติม</Link></h3>
                                            <h3>{e.mode}</h3>
                                            <h3>ผู้เขียน {e.name}</h3>
                                            <h3>{e.time}</h3>
                                            {user && user.uid === e.uid && <Link to='/edit'><i className="fa-solid fa-pen fa-xs" onClick={()=>editItem(e,e.id)}></i></Link>}
                                            {user && user.uid === e.uid && <i className="fa-solid fa-trash fa-xs" style={{color:'red'}} onClick={()=>delItem(e.id)}></i>}
                                        </div>
                                    </li>
                                    <p className='line'></p>
                                </div>
                            )
                        }
                    })}
                </ul>
            </div>
        </div>
    )
    function delItem(id){
        props.getDelItem(id)
        Swal.fire({
            title: "ลบรายการสำเร็จ",
            icon: "success",
            draggable: true
          }).then(()=>{
            window.location.reload()
          })
    }
    function editItem(e,index){
        props.getEditData(e,index)
    }
    function sendIndex(i){
        setIndex(i)
        props.getIdTopic(i)
    }
}
export default Result