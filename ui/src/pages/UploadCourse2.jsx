import React, { useEffect, useState } from "react";
import "../css/UploadCourse2.css";
import Buttons from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Button, message, Upload } from "antd";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { checkIfFileExists, deleteFileById, getCourseById, getMyCourses, updateCourse, uploadCourse } from "../services/AdminService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export function UploadCourse2() {
  const [files, setFiles] = useState([]);
  const myState = useSelector(state => state.CourseReducer)
  const [currentCourseId, setCurrentCourseId] = useState('abcdef');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseObject, setCourseObject] = useState({ courseName: '', courseDescription: '', lastDayToEnroll: '', duration: '', seatsLeft: '', notes: [], instructorName: '' })

  const [flag, setFlag] = useState(true);
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('')
  let imagesLink = [];
  const [age, setAge] = React.useState('');
  useEffect(() => {
    const dbCall = async () => {
      try {
        var response = await getMyCourses();
        response.push({
          c_id: 'abcdef',
          course_description: '',
          duration: '',
          instructor: '',
          lastDate: '',
          name: 'New',
          seatsLeft: ''
        })
        setCourses(response)
        setFiles(response.notes.split(","))
      } catch (err) {
        console.log("err", err)
      }
    }
    dbCall()
  }, [])

  const getCourseDetails = async (courseId) => {
    try {
      setCurrentCourseId(courseId)
      if (courseId == 'abcdef') {
        setCourseObject(prevObject => ({
          ...prevObject, courseName: '',
          courseDescription: '',
          lastDayToEnroll: '',
          duration: '',
          instructorName: ''
        }))
        setFiles([])
        return
      }
      var courseDetails = await getCourseById(courseId);
      console.log("values", courseDetails)
      setCourseObject(prevObject => ({
        ...prevObject, courseName: courseDetails[0].name,
        courseDescription: courseDetails[0].course_description,
        lastDayToEnroll: courseDetails[0].name,
        duration: courseDetails[0].duration,
        instructorName: courseDetails[0].instructor
      }))
      if (courseDetails[0].notes) {
        var array = courseDetails[0].notes.split(",");
        var newArray = array.map(e => {
          var split = e.split("~")
          return {
            name: split[1],
            path: split[0]
          }
        })
        setFiles(newArray)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (event) => {
    setCourse(event.target.value);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [value, setValue] = React.useState();
  const uploadImage = async (files) => {


    for (const [key, file] of Object.entries(files)) {
      const imageRef = ref(storage, `images/${myState.userDetails.email}/${file.name}`)
      uploadBytes(imageRef, file).then((res) => getDownloadURL(res.ref)).then((err) => {
        if (files.length - 1 === imagesLink.length) {
          imagesLink.push({
            name: file.name,
            path: err,
            ref: `images/${myState.userDetails.email}/${file.name}`
          });

          const callDB = async () => {
            try {
              var response = null;
              if (currentCourseId == 'abcdef') {
                response = await uploadCourse(courseObject, imagesLink);
              } else {
                response = await updateCourse(courseObject, imagesLink, currentCourseId)
              }

              if (response) {
                setOpen(false);
                setCourseObject(preVData => ({
                  ...preVData, courseName: '', courseDescription: '', lastDayToEnroll: '', duration: '', seatsLeft: '', notes: [], instructorName: ''
                }))
                setFlag(false)
                setSnackbarMessage('Course Uploaded Successfully');
                setSnackbarSeverity('success');
                setSnackbar(true)
              }
            } catch (err) {
              setOpen(false);
              setFlag(false)
              setSnackbarMessage('Course Uploaded Failed');
              setSnackbarSeverity('error');
              setSnackbar(true)
            }
          }
          callDB()

        } else {
          imagesLink.push({
            name: file.name,
            path: err,
            ref: `images/${myState.userDetails.email}/${file.name}`
          });
        }
      })

    }



  }

  const uploadImageToAWS = async () => {
    var formData= new FormData();
    var date = courseObject.lastDayToEnroll;
    var year = new Date(date).getFullYear()
    var month = new Date(date).getMonth()
    var day = new Date(date).getDate()
    month = (month + "").length == 1 ? `0${month}` : month
    day = (day + "").length == 1 ? `0${day}` : day
    courseObject.lastDayToEnroll = year + "-" + month + "-" + day;
    formData.append("obj",courseObject);
    formData.append("courseName",courseObject.courseName)
    formData.append("courseDescription",courseObject.courseDescription)
    formData.append("duration",courseObject.duration)
    formData.append("instructorName",courseObject.instructorName)
    formData.append("lastDayToEnroll",courseObject.lastDayToEnroll);
    formData.append("email",myState.userDetails.email);
    //state.userDetails.email



    console.log(files)
    files.forEach((f,i)=>formData.append("file"+i,f))
    //formData.append("sample",files)
    
    axios({
      method: "post",
      url: "http://localhost:3008/api/v1/admins/addCourse",
      data: formData,
      body:JSON.stringify(courseObject),
      headers: { "Content-Type": "application/pdf" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  // var response = await updateCourse(courseObject, imagesLink, currentCourseId)
  }
  const onSnackbarClose = () => {
    setSnackbar(false)
  }
  const onAlertClose = () => {
    setSnackbar(false)
  }
  const uploadCourseToDatabase = async () => {
    setOpen(true);
    if (courseObject.courseName.length < 1 ||
      courseObject.courseDescription.length < 1 ||
      courseObject.lastDayToEnroll.length < 1 ||
      courseObject.duration.length < 1 ||
      courseObject.instructorName.length < 1 ||
      files.length < 1) {
      setSnackbar(true);
      setSnackbarMessage("All Fields Are Mandatory");
      setSnackbarSeverity("error");
      setOpen(false)
      return;
    }
    var date = courseObject.lastDayToEnroll;
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var currentDay = new Date().getDate();
    var year = new Date(date).getFullYear()
    var month = new Date(date).getMonth()
    var day = new Date(date).getDate()
    if (year < currentYear || month < currentMonth || day < currentDay) {
      setSnackbar(true);
      setSnackbarMessage("Please Select A Valid Date");
      setSnackbarSeverity("error");
      setOpen(false)
      return;
    }

    //uploadImage(files.filter(e => e.path == null))
    uploadImageToAWS()
  }
  const changeCourseName = (event) => {
    setCourseObject(prevObj => ({
      ...prevObj, courseName: event.target.value
    }))
  }
  const changeCourseDescription = (event) => {
    setCourseObject(prevObj => ({
      ...prevObj, courseDescription: event.target.value
    }))
  }
  const changeLastDayToEnroll = (value) => {
    setCourseObject(prevObj => ({
      ...prevObj, lastDayToEnroll: value
    }))
  }
  const changeSeatsLeft = (event) => {
    setCourseObject(prevObj => ({
      ...prevObj, seatsLeft: event.target.value
    }))
  }
  const changeInstructorName = (event) => {
    setCourseObject(prevObj => ({
      ...prevObj, instructorName: event.target.value
    }))
  }
  const changeDuration = (event) => {
    setCourseObject(prevObj => ({
      ...prevObj, duration: event.target.value
    }))
  }
  const getFile = (event) => {
    var oldFiles = [...files];
    var newFiles = Object.values(event.target.files);
    console.log(oldFiles, newFiles.length);
    if (oldFiles.length == 0) {
      setFiles(newFiles)
    } else {
      var map = new Map()
      newFiles.forEach(e => map.set(e.name, 1))
      // console.log(oldFiles)
      console.log(map)
      var finalArray = oldFiles.filter(e => !map.has(e.name))
      console.log(oldFiles, finalArray)
      setFiles(newFiles.concat(finalArray))
    }
    // var newArray=oldFiles.concat(Object.values(event.target.files))
    // setFiles(newArray);
    // const newFile=[...file.data]
    // console.log("himanshu",event.target.files[0])
    // newFile.push(event.target.files[0].name)
    // setFile(prevData=>({
    //   ...prevData,data:newFile}))
    //   console.log(file.data)
  }

  const deleteFileFromDB = async (fileId) => {
    if (currentCourseId != 'abcdef') {
      var response = await deleteFileById(currentCourseId, fileId);
      console.log(response)
    }
  }
  return (

    <>
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={onSnackbarClose}>
        <Alert onClose={onAlertClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {flag &&
        <div>

          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box sx={{ width: 200, marginLeft: '30px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Courses</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={course}
                label="Age"
                onChange={handleChange}
              >
                {courses.map(e => <MenuItem onClick={() => getCourseDetails(e.c_id)} value={e.c_id}>{e.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <div className="originForCourseUpload2">
            <div className="mainTf">
              <h2 className="CourseDetails">Course Details</h2>



              <form >
                <div className="tfRow1">
                  <TextField
                    id="outlined-basic"
                    className="textFiled"
                    label="CourseName"
                    value={courseObject.courseName}
                    onChange={changeCourseName}
                    variant="outlined"
                    sx={{ width: "15rem" }}
                  />
                  <TextField
                    id="outlined-basic"
                    onChange={changeInstructorName}
                    value={courseObject.instructorName}
                    className="textFiled"
                    label="InstrctorName"
                    variant="outlined"
                    sx={{ width: "15rem" }}
                  />
                </div>
                <div className="tfRow2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>

                      <DatePicker
                        label="Last Date To Enroll"
                        value={value}
                        format="YYYY/MM/DD"
                        onChange={(newValue) => changeLastDayToEnroll(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <TextField
                    id="outlined-basic"
                    onChange={changeDuration}
                    value={courseObject.duration}
                    type="number"
                    className="textFiled"
                    label="Duration"
                    variant="outlined"
                    sx={{ width: "15rem" }}
                  />
                </div>
                <div className="tfRow3">
                  <TextField
                    id="outlined-basic"
                    onChange={changeCourseDescription}
                    label="Course Description"
                    value={courseObject.courseDescription}
                    className="textFiled"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    sx={{ width: "15rem" }}
                  />
                  {/* <Upload {...props} accept=".pdf">
              <Button
                style={{ width: "15rem" }}
                size={"large"}
                icon={<UploadOutlined />}
                block="true"
              >
                Click to Upload
              </Button>
            </Upload> */}
                  <input style={{ display: 'none' }} type='file' id='img' multiple onChange={getFile}>


                  </input>
                  <label style={{ border: '1px solid rgb(0,0,0,0.5', padding: '10px 10px 10px 10px', cursor: 'pointer' }} for="img">Click me to upload image</label>

                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                  {
                    files.map(v => <div style={{ border: '1px solid rgb(0,0,0,0.5)', marginRight: '10px', cursor: 'pointer', padding: '4px 4px 4px 4px' }} key={v.name} onClick={() => { if (v.path != null && v.name != null) deleteFileFromDB(v.path + "~" + v.name); setFiles(files.filter(f => f.name !== v.name)) }}>{v.name}</div>)
                  }
                </div>
                <div className="tfRow4">
                  <Buttons
                    variant="contained"
                    size="medium"
                    className="upc"
                    onClick={uploadCourseToDatabase}
                    sx={{ width: "34rem" }}
                  >
                    Upload Course
                  </Buttons>

                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>

  );
}
