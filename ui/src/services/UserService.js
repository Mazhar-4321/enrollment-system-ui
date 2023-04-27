import axios from "axios";
const baseURL = 'http://localhost:3008/api/v1'
const headerConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

export const registerUser = async (obj) => {
    try {
        var response = await axios.post(`${baseURL}/users`, obj)
        return response
    } catch (err) {
        throw new Error('Could Not Create User.')
    }
}

export const validateEmail = async (obj) => {
    try {
        var response = await axios.post(`${baseURL}/users/validateEmail`, obj)
        return response
    } catch (err) {
        throw new Error('Email Sending Failed.')
    }
}