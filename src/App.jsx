import { useState } from 'react'
import './components/App.css'
import Nav from './components/Nav'
import Blog from './components/Blog'
import Form from './components/form'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'

function App() {
  const [dataList,setDataList] = useState([])

  function getData(data){
      setDataList((oldData) => [...oldData, data])
  }

  return (
    <>
      <Router>
      <Nav/>
        <Routes>
          <Route path='/' exact element={
            <Blog sendData={dataList}/>
          }></Route>
          <Route path='/insert' element={
            <Form getData={getData}/>
          }></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
