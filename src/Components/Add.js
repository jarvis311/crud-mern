import React, { useEffect, useState } from "react";
import { getUsers, deleteUsers } from "../Service/Api";
import { Link } from "react-router-dom";
// import DB from '../Database/db.json'

export const Add = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await getUsers();
    console.log(response);
    setusers(response.data);
  };


    const deleteUsersData = async (id) =>{
        await deleteUsers(id);
        getAllUsers();

    }
    const [searchTerm, setsearchTerm] = useState('');



  return (
    <div>


<input className="form-control my-4 me-2 search" type="text" placeholder="Search" onChange={(e) => setsearchTerm(e.target.value)} aria-label="Search" />

      <table border='1'  className="table table-bordered">

      

        <thead className="table-dark col-md-6" >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Team</th>
          <th>Role</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Perform Operation</th>
        </tr>
        </thead> 
        <tbody>

        
          {
            users.filter((val)=>{
              if(searchTerm === ''){
                return val
              }else if( 
                val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.email.toLowerCase().includes(searchTerm.toLowerCase()) 
              
              ){
                return val
              }
            }).map(users => (
              <tr>
                        <td>{users.id}</td>
                        <td>{users.name}</td>
                        <td>{users.team}</td>
                        <td>{users.role}</td>
                        <td>{users.email}</td>
                       <td>{users.phone}</td>
                       <td>
                         <button className="btn btn-primary mx-3" ><Link style={{color:'white', textDecoration:'none'}} to={`/editUser/${users.id}`}>Edit</Link></button>
                         <button className="btn btn-primary mx-3" onClick={ () => deleteUsersData(users.id)} >Delete</button>
                   
                       </td>
                    </tr>
              ))
            }

            </tbody>
       
        
        
      </table>
    </div>
  );
};

export default Add;
