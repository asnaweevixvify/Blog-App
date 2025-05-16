import './App.css'
import { useState } from 'react'

function Des(props){
    const showData = props.dataShow[0]
    return(
        <>
        <div className="des-container">
                <h2 className='des-topic'>{showData.text}</h2>
                <h4 className='des-des' style={{ whiteSpace: 'pre-line' }}>
                    {showData.des}
                </h4>
        </div>
        <div className="profile-container">
            <p>ผู้เขียน</p>
            <h4 className='des-name'>{showData.name}</h4>
        </div>
        </>
    )
}

export default Des