import axios from "axios";
import store from '../store'
const baseURL = 'http://localhost:3008/api/v1/'



export const uploadCourse = async (obj, imagesLink) => {
    const state = store.getState().CourseReducer;
    obj.notes = imagesLink
    var date = obj.lastDayToEnroll;
    var year = new Date(date).getFullYear()
    var month = new Date(date).getMonth()
    var day = new Date(date).getDate()
    month = (month + "").length == 1 ? `0${month}` : month
    day = (day + "").length == 1 ? `0${day}` : day
    obj.lastDayToEnroll = year + "-" + month + "-" + day;
    //obj.email=state.userDetails.email
    console.log("mai hai user details", state.userDetails, obj);
    console.log("sending notes", obj.notes)
    try {
        let response = await axios.post(`${baseURL}/admins/addCourse`, {
            adminId: state.userDetails.email,
            name: obj.courseName,
            lastDate: obj.lastDayToEnroll,
            duration: obj.duration,
            seatsLeft: obj.seatsLeft,
            notes: obj.notes,
            instructorName: obj.instructorName,
            email: state.userDetails.email

        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}


export const updateCourse = async (obj, imagesLink, courseId) => {
    const state = store.getState().CourseReducer;
    obj.notes = imagesLink
    var date = obj.lastDayToEnroll;
    var year = new Date(date).getFullYear()
    var month = new Date(date).getMonth()
    var day = new Date(date).getDate()
    month = (month + "").length == 1 ? `0${month}` : month
    day = (day + "").length == 1 ? `0${day}` : day
    obj.lastDayToEnroll = year + "-" + month + "-" + day;
    //obj.email=state.userDetails.email
    console.log("mai hai user details pura", state.userDetails, obj);
    console.log("sending notes", obj.notes)
    try {
        let response = await axios.put(`${baseURL}/admins/updateCourse`, {
            courseId: courseId,
            adminId: state.userDetails.email,
            name: obj.courseName,
            lastDate: obj.lastDayToEnroll,
            duration: obj.duration,
            seatsLeft: obj.seatsLeft,
            notes: obj.notes,
            instructorName: obj.instructorName,
            email: state.userDetails.email,
            courseDescription:obj.courseDescription

        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}
export const getMyCourses = async () => {
    console.log("get My Courses Reached")
    const state = store.getState().CourseReducer;
    console.log(state)
    try {
        let response = await axios.get(`${baseURL}/admins/courses/${state.userDetails.email}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}

export const getDashboardData = async () => {
    console.log("get My Courses Reached")
    const state = store.getState().CourseReducer;
    console.log(state)
    try {
        let response = await axios.get(`${baseURL}/admins/dashboard/${state.userDetails.email}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}

export const getCourseById = async (courseId) => {
    // /courseById/:id
    const state = store.getState().CourseReducer;
    try {
        let response = await axios.get(`${baseURL}/admins/courseById/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}
export const deleteFileById = async (courseId, fileId) => {
    const state = store.getState().CourseReducer;

    try {
        let response = await axios.post(`${baseURL}/admins/deleteNoteById`, {
            courseId: courseId,
            fileId: fileId
        }, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}

export const checkIfFileExists = async (obj) => {
    const state = store.getState().CourseReducer;

    try {
        let response = await axios.post(`${baseURL}/admins/checkFiles`, obj, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}
export const getCertificateRequests = async () => {
    console.log("get My Courses Reached")
    const state = store.getState().CourseReducer;
    console.log(state)
    try {
        let response = await axios.get(`${baseURL}/admins/certificateRequests/${state.userDetails.email}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}

export const deleteCourse = async (courseId) => {
    const state = store.getState().CourseReducer;

    try {
        let response = await axios.delete(`${baseURL}/admins/courses/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}

export const addQuiz = async (courseId, obj) => {
    const state = store.getState().CourseReducer;
    console.log(courseId, obj)
    try {
        let response = await axios.post(`${baseURL}/admins/addQuiz/${courseId}`, obj, {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        })
        console.log(response)
        return response.data.data
    } catch (err) {
        console.log(err)
        throw new Error('Connection Refused')
    }
}

