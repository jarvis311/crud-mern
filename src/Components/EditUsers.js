import React, {useState, useEffect} from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import { getUsers , editUser} from '../Service/Api';
import { Link } from 'react-router-dom';

const initialValue = {
   
    name : '',
    role : '',
    team : '',
    email : '',
    phone : ''
} 


const EditUsers = () => {
    
    const [user, setuser] = useState(initialValue);
    const { name, role, team, email, phone } = user;
    useEffect(() => {
        loadUserData();
      
      },[]);
    const {id} = useParams();
      
          
    const loadUserData = async () =>{
        const response = await getUsers(id);
        setuser(response.data);
    }
    let history = useNavigate();


    const onValueChange = (e) => {
            console.log(e.target.value);
            setuser({ ...user, [e.target.name]:e.target.value});
            console.log(user);
    }


    const editUserDetails = async() => {
        const response = await editUser(id, user);
        history.push('/all');
    }
        
     


  return (


            <>
            
            <form className='form'>
                <div>
                    <h1>Edit The Details</h1><hr />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="id" className="form-label">Ente the Id</label>
                    <input type="text" name='id' className="form-control" onChange={(e) => onValueChange(e)} value={id}  id="id" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="name" className="form-label">Enter the Name</label>
                    <input type="text" name='name' className="form-control" onChange={(e) => onValueChange(e)} value={name}  id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="role" className="form-label">Enter the Role</label>
                    <input type="text" name='role' className="form-control" onChange={(e) => onValueChange(e)} value={role}  id="role" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="team" className="form-label">Enter the Taem</label>
                    <input type="text" name='team' className="form-control" onChange={(e) => onValueChange(e)} value={team}  id="team" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="email" className="form-label">Enter the Email</label>
                    <input type="email" name='email' className="form-control" onChange={(e) => onValueChange(e)} value={email}  id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="phone" className="form-label">Enter the Email</label>
                    <input type="text" name='phone' className="form-control" onChange={(e) => onValueChange(e)} value={phone} id="phone" aria-describedby="emailHelp" />
                </div>
               
               
                <Link className='btn btn-prinary' to='/add'><button  type="submit" onClick={() => editUserDetails() } className='btn btn-primary'>Submit</button></Link>
            </form>




            
            
            </>




  )
};

export default EditUsers;
