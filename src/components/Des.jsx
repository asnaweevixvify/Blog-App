import './App.css'
import { useState } from 'react'

function Des(){
    return(
        <div className="des-container">
                <h2 className='des-topic'></h2>
                <h4 className='des-des' style={{ whiteSpace: 'pre-line' }}>
                
                </h4>
                <div className="icon">
                    <h3>ผู้เขียน </h3>
                    <h3></h3>
                </div>
            
        </div>
    )
}

export default Des