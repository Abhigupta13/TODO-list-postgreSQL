import React,{useEffect,useState} from 'react';
import {useCookies} from 'react-cookie'
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';

const App=()=> {
  const [cookies,setCookie, removeCookie] =useCookies(null)

  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks,setTasks]=useState(null);
  const getData= async ()=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`)
      const json = await response.json();
     setTasks(json);
    } catch (error) {
      console.error(error);
    }
    
  }
  useEffect(() =>{
    if(authToken){
      getData();
    }

  }, [])
  console.log(tasks);
  //sort by date

  const sortedTasks= tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date))

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
      <>
    <ListHeader listName={"🏖️ Holiday tick list"} getData={getData}/>
    {sortedTasks?.map((task)=> <ListItem key={task.id} task={task} getData={getData}/> )}
    </>}
    </div>
  );
}

export default App;
