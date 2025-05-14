import { useState , useEffect } from 'react'
import './components/App.css'
import Nav from './components/Nav'
import Blog from './components/Blog'
import Form from './components/form'
import Editblog from './components/Editblog'
import Des from './components/Des'
import Login from './components/Login'
import Register from './components/register'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'
import { db } from './components/firebase'
import { getFirestore, collection, getDocs , addDoc ,updateDoc, deleteDoc ,doc} from 'firebase/firestore/lite';

function App() {
  const [dataList,setDataList] = useState([])
  useEffect(()=>{
    async function getList(db){
      const empCol = collection(db,'bloglist')
      const empSnapshot = await getDocs(empCol)
      const newItem = empSnapshot.docs.map(e=>({
        ...e.data(),id:e.id
      }))
      setDataList(newItem)
  }
  getList(db)
  },[])
  const [dataShow,setDatashow] = useState('')
  const [status,setStatus] = useState(false)

  function getData(data){
    addDoc(collection(db,'bloglist'),{
      text:data.text,
      des:data.des,
      name:data.name
    })
    setDataList((oldData) => [...oldData, data])
  }
  async function getDelItem(id){
    if (!id) {
      console.error("ไม่มี id ส่งเข้ามาเพื่อลบ")
      return
    }
    else{
    await deleteDoc(doc(db,'bloglist',id))
    const empCol = collection(db,'bloglist')
    const empSnapshot = await getDocs(empCol)
    const newItem = empSnapshot.docs.map(e => ({
      ...e.data(), id: e.id
    }))
    setDataList(newItem)
    }
  }
  const [editItem,setEditItem] = useState('')
  const [editIndex,sendEditIndex] = useState('')

  function getEditData(e,id){
      setEditItem(e)
      sendEditIndex(id)
  }
  function getEditItem(newEditData){
    const docref = doc(db,'bloglist',editIndex)
    updateDoc(docref,{
      text:newEditData.text,
      des:newEditData.des,
      name:newEditData.name
    })
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
      <Nav/>
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
          <Route path='/regis' element={<Register/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
