import React from 'react'

const ListHeader = ({listName}) => {
  const SignOut=()=>{
    console.log("signOut");
  }
    return (
    <div className='list-header'>
        <h1>{listName}</h1>
        <div className="button-container">
            <button className="create">Add New</button>
            <button className="signout" onClick={SignOut}>Sign Out</button>
        </div>
    </div>
  )
}

export default ListHeader