import './App.css'
import { useState } from 'react'

function Blog(props){
    const dataList = props.sendData
    return(
        <div className="blog-container">
            <h1 className='main-blog'>Recent Post</h1>
            <div className="blog-list-container">
                <ul>
                    {dataList.map((e)=>{
                        return(
                            <>
                                <li>
                                    <h2 className='blog-topic'>{e.text}</h2>
                                    <h4 className='blog-des'>
                                        {e.des}
                                    </h4>
                                    <div className="icon">
                                        <i className="fa-solid fa-pen fa-xs"></i>
                                        <i className="fa-solid fa-trash fa-xs" style={{color:'red'}}></i>
                                    </div>
                                </li>
                            </>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
                
export default Blog