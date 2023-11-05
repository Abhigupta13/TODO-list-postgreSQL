import React from 'react'
import { useState } from 'react';

import {useCookies} from 'react-cookie'
const Model = ({mode,setShowModel,task,getData}) => {
  
  const [cookies,setCookie, removeCookie] =useCookies(null)
  const editMode= mode==='edit' ?true:false
  const [data, setData] = useState({
    user_email:editMode? task.user_email:cookies.Email,
    title:editMode? task.title:"",
    progress:editMode? task.progress: 50,
    date:editMode? task.date:new Date(),
  })
const editData =async(e)=>{
e.preventDefault();
try {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(data)
  })
  if(response.status === 200){
    setShowModel(false);
    getData();
  }
} catch (error) {
  console.error(error);
}
}
const postData=async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos`,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(data)
    })
    if(response.status === 200){
      setShowModel(false);
      getData();
    }
  } catch (error) {
    console.error(error)
  }
}



  const handleChange = (e) => {
    console.log("Changing",e);
    const {name,value}=e.target;
    setData(data=>({
      ...data,
      [name]:value
    }))
console.log(data);

  }
  return (
   
    <div className="overlay">
      <div className="model">
      <div className="form-title-container">
        <h3>Let's {mode} you task</h3>
        <button onClick={()=>setShowModel(false)}>X</button>
      </div>
<form>
  <input
  required
  maxLength={30}
  placeholder="Your task goes here"
  name="title"
  value={data.title}
  onChange={handleChange}
  />
  <br/>
  <label for="range">Drag to select your current progress</label>
  <input type="range" id="range" name="progress" min="0" max="100"
  value={data.progress}
  onChange={handleChange}/>
  <input className={mode} type="submit" onClick={editMode ? editData: postData} />
</form>
</div>
    </div>
  )
}

export default Model