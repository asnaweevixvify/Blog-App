import { useState } from 'react'
import './components/App.css'
import Nav from './components/Nav'
import Blog from './components/Blog'
import Form from './components/form'
import Editblog from './components/Editblog'
import Des from './components/Des'
import Login from './components/Login'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'

function App() {
  const prevData=[
    {
      text:'React คืออะไร?',
      des:'React เป็นไลบรารี JavaScript ที่พัฒนาโดย Facebook เพื่อช่วยสร้าง User Interface (UI) ที่มีประสิทธิภาพ โดย React มุ่งเน้นการสร้าง Component ซึ่งเป็นส่วนประกอบของ UI ที่สามารถใช้ซ้ำได้ และแต่ละ Component สามารถเก็บสถานะ (state) และเมทอด (methods) ต่างๆ เพื่อการจัดการกับข้อมูลและการแสดงผล'
      ,name:'vixvify'
      ,time:'4/11/2025, 10.30.05 AM'
    },
    {
      text:'React ควรใช้กับงานประเภทไหน?',
      des:'React เหมาะสำหรับการพัฒนาแอปพลิเคชันเว็บที่มีขอบเขตใหญ่หรือซับซ้อน โดยเฉพาะอย่างยิ่งเมื่อต้องการในการจัดการข้อมูลแบบ Real-time หรือการสร้าง UI ที่ตอบสนองต่อเหตุการณ์ต่าง ๆ อย่างรวดเร็ว เช่น เว็บแอปพลิเคชันสำหรับการซื้อขาย, เกม, แพลตฟอร์มการค้าออนไลน์ เป็นต้น'
      ,name:'vixvify',
      time:'5/11/2025, 8.42.28 AM'
    }
  ]

  const [dataList,setDataList] = useState(prevData)
  const [dataShow,setDatashow] = useState('')
  const [status,setStatus] = useState(false)

  function getData(data){
      setDataList((oldData) => [...oldData, data])
  }
  function getDelItem(index){
    const newData = dataList.filter((_,i)=>{
      return  index !== i
    })
    setDataList(newData)
  }
  const [editItem,setEditItem] = useState('')
  const [editIndex,sendEditIndex] = useState('')

  function getEditData(e,index){
      setEditItem(e)
      sendEditIndex(index)
  }
  function getEditItem(newEditData){
    const newData = dataList.map((oldData,i)=>{
      if(i === editIndex){
        return newEditData
      }
      return oldData
    })
    setDataList(newData)
  }
  function getIdTopic(i){
    const datashow = dataList.filter((_,index)=>{
      return index === i
    })
    setDatashow(datashow)
  }

  function getStatus(e){
    setStatus(e)
  }

  return (
    <>
      <Router>
      {status && <Nav/>}
        <Routes>
          <Route path='/' element={<Login status={getStatus}/>}></Route>
          <Route path='/blog' element={
            <Blog sendData={dataList} getDelItem={getDelItem} getEditData={getEditData} getIdTopic={getIdTopic}/>
          }></Route>
          <Route path='/insert' element={
            <Form getData={getData}/>
          }></Route>
          <Route path='/edit' element={
            <Editblog sendEditItem={editItem} getEditItem={getEditItem}/>
          }>
          </Route>
          <Route path='/des' element={<Des dataShow={dataShow}/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
