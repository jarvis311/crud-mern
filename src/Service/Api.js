
import axios from "axios"


const url = 'http://localhost:3003/users';

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);

};

export const addUsers = async (user) => await axios.post(url, user)



export const editUser = async (id, user) => {
    return await axios.put(`${url}/${id}`, user)
}


export const deleteUsers = async(id) => {
    return await axios.delete(`${url}/${id}`);
}