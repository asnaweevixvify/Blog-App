import './App.css'
import { useState , useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


function Form(props){
    const [text,setText] = useState('')
    const [inputStatus,setInputStatus] = useState(false)
    const navigate = useNavigate();


    const [des,setDes] = useState('')
    useEffect(()=>{
        if(text === '' || des === ''){
            setInputStatus(true)
        }
        else{
            setInputStatus(false)
        }
    },[text,des])

    return(
        <div className="form-container">
            <h1 className='main-form'>Add New Blog</h1>
            <form onSubmit={sendInfo}>
                <p>เพิ่มหัวข้อ</p>
                <input type='text' className='text' value={text} onInput={textInput}></input>
                <p>เพิ่มคำบรรยาย</p>
                <textarea className='des' value={des} onInput={desInput}></textarea>
                <button type='submit' disabled={inputStatus}>เพิ่ม Blog</button>
            </form>
        </div>
    )

    function textInput(e){
        setText(e.target.value)
    }

    function desInput(e){
        setDes(e.target.value)
    }
    function sendInfo(e){
        e.preventDefault()
        const data = {
            text:text,
            des:des,
            name:'vixvify',
            time:new Date().toLocaleString()
        }
        props.getData(data)
        setText('')
        setDes('')
        Swal.fire({
            title: "เพิ่ม Blog สำเร็จ",
            icon: "success",
            draggable: true
          }).then(()=>{
            navigate('/blog');
          })
    }
}

export default Form