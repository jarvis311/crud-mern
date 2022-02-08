import React,{useState} from 'react';
import { addUsers } from '../Service/Api';


const initialValue = {
    id: '',
    name : '',
    role : '',
    team : '',
    email : '',
    phone : ''
} 



const AddUsers = () => {

    const [user, setuser] = useState(initialValue);
    const {id, name, role, team, email, phone } = user;

    const onValueChange = (e) => {
            console.log(e.target.value);
            setuser({ ...user, [e.target.name]:e.target.value});
            console.log(user);
    }


    const addUsersDetails = async () =>{
            await addUsers(user);
    }


    return (


        <>

            <form className='form'>
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
               
               
                <button type="submit" className="btn btn-primary" onClick={() => addUsersDetails() }>Submit</button>
            </form>




        </>
    )
};

export default AddUsers;
