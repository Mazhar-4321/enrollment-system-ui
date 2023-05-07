import axios from "axios";
const baseURL = 'http://localhost:3008/api/v1'


export const registerUser = async (obj) => {
    try {
        var response = await axios.post(`${baseURL}/users/`, obj)
        return response
    } catch (err) {
        throw new Error('Could Not Create User.')
    }
}
export const validateEmail = async (obj) => {
    console.log("onjnjnj",obj);
    try {
        var response = await axios.post(`${baseURL}/users/validateEmail`, obj)
        return response
    } catch (err) {
        throw new Error('Email Sending Failed.')
    }
}

export const reset=async(obj)=>{
    try {
        var response = await axios.post(`${baseURL}/users/reset`, obj)
        return response
    } catch (err) {
        throw new Error('Email Sending Failed.')
    }
}

export const login=async(obj)=>{
    try {
        var response = await axios.post(`${baseURL}/users/login`, obj)
        console.log(response)
        return response
    } catch (err) {
        throw new Error('Could Not Create User')
    }
}