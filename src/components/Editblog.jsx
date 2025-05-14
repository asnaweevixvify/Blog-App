import './App.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';



function Editblog(props){
    const data = props.sendEditItem
    const [getText,setGetText] = useState(data.text)
    const [getDes,setGetDes] = useState(data.des)
    const navigate = useNavigate();

    return(
        <div className="form-container">
            <h1 className='main-form'>Edit Blog</h1>
            <form onSubmit={editText}>
                <p>แก้ไขหัวข้อ</p>
                <input type='text' className='text' value={getText} onInput={textInput}></input>
                <p>แก้ไขคำบรรยาย</p>
                <textarea className='des' value={getDes} onInput={desInput}></textarea>
                <button type='submit'>แก้ไข Blog</button>
            </form>
        </div>
    )
    function textInput(e){
        setGetText(e.target.value)
    }

    function desInput(e){
        setGetDes(e.target.value)
    }
    function editText(e){
        e.preventDefault()
        const data = {
            text:getText,
            des:getDes,
            name:'vixvify',
            time:new Date().toLocaleString()
        }
        props.getEditItem(data)
        setGetText('')
        setGetDes('')
        Swal.fire({
            title: "แก้ไข Blog สำเร็จ",
            icon: "success",
            draggable: true
          }).then(()=>{
            navigate('/blog');
            window.location.reload()
          })
    }
}

export default Editblog