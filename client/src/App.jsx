import './App.css';
import { useState,useEffect } from 'react';
import axios from "axios";

function App() {
 const [user,setUser]=useState([]);
 const [filterUser,setFilterUser]=useState([]);

 //display users
 const getAllUser=async()=>{
  await axios.get("http://localhost:8000/users").then((res)=>{
    setUser(res.data);
    setFilterUser(res.data);
    console.log(res.data);
  });
 
 }

 useEffect(()=>{
  getAllUser();
 },[])

 //search user
 const handleSearchChange=(e)=>{
  const searchText=e.target.value.toLowerCase();
  const filteredUsers=user.filter((data)=>data.name.toLowerCase().includes(searchText)|| data.city.toLowerCase().includes(searchText));
  setFilterUser(filteredUsers);
 }

 //delete user
 const handleDelete=async(userId)=>{
  const isConfirmed=window.confirm("Are you sure you want to delete this user?");

  if(isConfirmed){
    await axios.delete(`http://localhost:8000/users/${userId}`).then((res)=>{
      setUser(res.data);
      setFilterUser(res.data);
    })
  }
 
 }

  return (
    <>
      <div className="container">
        <h3>CRUD Application with React.js Frontend and Node.js Backend</h3>
        <div className="input-search">
          <input type="search" placeholder='Search Text Here' onChange={handleSearchChange}/>
          <button className='btn green'>Add Record</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { 
              filterUser && filterUser.map((user,index)=>{
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button className='btn green'>Edit</button>
                    </td>
                    <td>
                      <button className='btn red' onClick={()=>handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
           
          </tbody>      
        </table>
      </div>
    </>
  )
}

export default App
