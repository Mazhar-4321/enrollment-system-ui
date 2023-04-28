import axios from "axios";
const baseURL = 'http://localhost:3005/api/v1/'

export const getAllCourses = async (token) => {
    try {
        let response = await axios.get(`${baseURL}/students/availableCourses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}
export const getMyCourses = async (email, token) => {
    try {
        let response = await axios.get(`${baseURL}/students/myCourses/${email}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

