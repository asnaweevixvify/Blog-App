import './App.css'
import { useState , useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'


function Form(props){
    const [text,setText] = useState('')
    const [inputStatus,setInputStatus] = useState(false)
    const [name,setName] = useState('')
    const navigate = useNavigate();
    const [mode,setMode] = useState('')

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
                <p>หมวดหมู่</p>
                <select onChange={selectMode}>
                    <option hidden>เลือกหมวดหมู่</option>
                    <option>อาหาร</option>
                    <option>ท่องเที่ยว</option>
                    <option>การศึกษา</option>
                    <option>ข่าวสาร</option>
                </select>
                <p>ชื่อผู้เขียน</p>
                <input type='text' className='text'value={name} onInput={nameInput}></input>
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
    function nameInput(e){
        setName(e.target.value)
    }
    function selectMode(e){
        setMode(e.target.value);
    }
    function sendInfo(e){
        const user = auth.currentUser
        e.preventDefault()
        const data = {
            text:text,
            des:des,
            name:name,
            mode:mode,
            time:new Date().toLocaleString(),
            uid:user.uid
        }
        props.getData(data)
        setText('')
        setDes('')
        setName('')
        setMode('')
        Swal.fire({
            title: `<h2>เพิ่ม Blog สำเร็จ</h2>`,
            icon: "success",
            draggable: true
          }).then(()=>{
            navigate('/');
            window.location.reload()
          })
    }
}

export default Form