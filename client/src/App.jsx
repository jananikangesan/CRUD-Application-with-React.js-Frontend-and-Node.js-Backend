import './App.css';
import { useState,useEffect } from 'react';
import axios from "axios";

function App() {
 const [user,setUser]=useState([]);
 const [filterUser,setFilterUser]=useState([]);
 const [isModalOpen,setIsModelOpen]=useState(false);
 const [userData,setUserData]=useState(
  {name:"",
    age:"",
    city:""
  }
  );

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
//Add user Details
 const handleAddRecord=()=>{
  setUserData({name:"",
    age:"",
    city:""
  });
  setIsModelOpen(true);
 }
 //close Modal
 const closeModal=()=>{
  setIsModelOpen(false);
  getAllUser();
 }

 const handleData=(e)=>{
  setUserData({...userData,[e.target.name]:e.target.value})
 }

 const handleSubmit=async(e)=>{
  e.preventDefault();

  if(userData.id){
    await axios.patch(`http://localhost:8000/users/${userData.id}`,userData).then((res)=>{
      console.log(res.data); 
    })
  }else{
    await axios.post("http://localhost:8000/users",userData).then((res)=>{
      console.log(res.data); 
    })
  }
  closeModal();
  setUserData({name:"",
    age:"",
    city:""
  });
  
 }

 //Update user function
 const handleUpdateRecord=(user)=>{
  setUserData(user);
  setIsModelOpen(true);

 }

  return (
    <>
      <div className="container">
        <h3>CRUD Application with React.js Frontend and Node.js Backend</h3>
        <div className="input-search">
          <input type="search" placeholder='Search Text Here' onChange={handleSearchChange}/>
          <button className='btn green' onClick={handleAddRecord}>Add Record</button>
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
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button className='btn green' onClick={()=>handleUpdateRecord(user)}>Edit</button>
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
        {isModalOpen &&(
          <div className="modal">
            <div className="modal-content">
              <span className='close' onClick={closeModal}>&times;</span>
              <h2>{userData.id?"Update Record":"Add Record"}</h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" value={userData.name} onChange={handleData}/>
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input type="text" name="age" id="age" value={userData.age} onChange={handleData} />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value={userData.city} onChange={handleData}/>
              </div>
              <button className='btn green' onClick={handleSubmit}>{userData.id?"Update User":"Add User"}</button>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default App
