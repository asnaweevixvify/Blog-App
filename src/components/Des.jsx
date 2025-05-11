import './App.css'
import { useState } from 'react'

function Des(props){
    const showData = props.dataShow[0]
    return(
        <div className="des-container">
                <h2 className='des-topic'>{showData.text}</h2>
                <h4 className='des-des' style={{ whiteSpace: 'pre-line' }}>
                    {showData.des}
                </h4>
                <div className="icon">
                    <h3>ผู้เขียน {showData.name}</h3>
                    <h3></h3>
                </div>
            
        </div>
    )
}

export default Des