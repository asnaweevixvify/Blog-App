import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'


function Blog(props){
    const dataList = props.sendData
    const [index,setIndex] = useState('')
    return(
        <div className="blog-container">
            <h1 className='main-blog'>Recent Post</h1>
            <div className="blog-list-container">
                <ul>
                    {dataList.map((e,index)=>{
                        return(
                            <div className="list-container"key={index}>
                                <li>
                                    <h2 className='blog-topic' onClick={()=>sendIndex(index)}><Link to="/des">{e.text}</Link></h2>
                                    <h4 className='blog-des' style={{ whiteSpace: 'pre-line' }}>
                                        {e.des}
                                    </h4>
                                    <div className="icon">
                                        <h3>ผู้เขียน {e.name}</h3>
                                        <h3>{e.time}</h3>
                                        <Link to='/edit'><i className="fa-solid fa-pen fa-xs" onClick={()=>editItem(e,e.id)}></i></Link>
                                        <i className="fa-solid fa-trash fa-xs" style={{color:'red'}} onClick={()=>delItem(e.id)}></i>
                                    </div>
                                </li>
                                <p className='line'></p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
    function delItem(id){
        props.getDelItem(id)
    }
    function editItem(e,index){
        props.getEditData(e,index)
    }
    function sendIndex(i){
        setIndex(i)
        props.getIdTopic(i)
    }
}
                
export default Blog