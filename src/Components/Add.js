import React, { useEffect, useState } from "react";
import { getUsers, deleteUsers } from "../Service/Api";
import { Link } from "react-router-dom";


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


  return (
    <div>
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
            users.map(users => (
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
