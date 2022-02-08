import React, { useEffect, useState } from "react";
import { getUsers } from "../Service/Api";
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
  return (
    <div>
      <table border='1'  className="table table-bordered">

      

        <thead class="table-dark col-md-6" >
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Team</th>
          <th>Role</th>
          <th>Email</th>
          <th>Phone</th>
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
                    </tr>
              ))
            }

            </tbody>
       
        
        
      </table>
    </div>
  );
};

export default Add;
