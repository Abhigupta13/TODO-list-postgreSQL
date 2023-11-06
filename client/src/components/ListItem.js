import React,{useState} from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Model from './Model'
const ListItem = ({task,getData}) => {
  const [showModel,setShowModel] = useState(false);
  const deleteTodo=async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${task.id}`,{
      method: 'DELETE'
    })
    if(response.status === 200){
      getData();
    } }catch (error) {
      console.error(error);
    }
  }
  return (
    <ul>
    <div className="list-item">
      <div className="info-container">
      <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>
      <div className="button-container">
      <button className="edit" onClick={()=>{setShowModel(true)}}>Edit</button>
      <button className="delete" onClick={deleteTodo}>Delete</button>
      </div>
    </div>
    {showModel && <Model mode={'edit'} setShowModel={setShowModel} task={task} getData={getData} />}
    </ul>
  )
}

export default ListItem