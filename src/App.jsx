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
import { auth } from './components/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Profile from './components/Profile'



function App() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus(true);
        navigate('/');
      } else {
        setStatus(false);
      }
    });
    return () => unsubscribe();
  },[]);

  const location = useLocation();
  useEffect(()=>{
      if(status === true && location.pathname === '/login'){
        navigate('/');
      }
  },[location])

  useEffect(()=>{
    if(status === true && location.pathname === '/regis'){
      navigate('/');
    }
},[location])

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

  function getData(data){
    addDoc(collection(db,'bloglist'),{
      text:data.text,
      des:data.des,
      name:data.name,
      mode:data.mode,
      time:data.time,
      uid:data.uid
    })
  }
  async function getDelItem(id){
    if (!id) {
      console.error("ไม่มี id ส่งเข้ามาเพื่อลบ")
      return
    }
    else{
    await deleteDoc(doc(db,'bloglist',id))
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
  
  return (
    <>
      <Nav status={status}/>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/'element={
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
          <Route path='/profile' element={<Profile sendData={dataList} getDelItem={getDelItem} getEditData={getEditData} getIdTopic={getIdTopic}/>}></Route>
        </Routes>
    </>
  )
}

export default App
