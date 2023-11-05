import React, { useState } from 'react'
import Model from './Model'
const ListHeader = ({listName, getData}) => {
  const [showModel,setShowModel]= useState(false)
  const SignOut=()=>{
    console.log("signOut");
  }
    return (
    <div className='list-header'>
        <h1>{listName}</h1>
        <div className="button-container">
            <button className="create" onClick={()=>setShowModel(true)}>Add New</button>
            <button className="signout" onClick={SignOut}>Sign Out</button>
        </div>
        {showModel && <Model mode={'create'} setShowModel={setShowModel} getData={getData}/>}
    </div>
  )
}

export default ListHeader