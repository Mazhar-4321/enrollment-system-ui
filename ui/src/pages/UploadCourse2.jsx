import React, { useState } from "react";
import "../css/UploadCourse2.css";
import Buttons from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Button, message, Upload } from "antd";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { uploadCourse } from "../services/AdminService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


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
  const [flag, setFlag] = useState(true);
  const [snackbar, setSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('')
  let imagesLink = [];
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
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [courseObject, setCourseObject] = useState({ courseName: '', courseDescription: '', lastDayToEnroll: '', duration: '', seatsLeft: '', notes: [], instructorName: '' })
  const uploadImage = async () => {

    Object.entries(files).forEach((key, value) => {
      console.log(key, value)
    })
    for (const [key, file] of Object.entries(files)) {
      const imageRef = ref(storage, `images/${file.name}`)
      uploadBytes(imageRef, file).then((res) => getDownloadURL(res.ref)).then((err) => {
        if (files.length - 1 === imagesLink.length) {
          imagesLink.push(err);

          const callDB = async () => {
            try {
              const response = await uploadCourse(courseObject, imagesLink);
              if (response) {
                setOpen(false);
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

        } else { imagesLink.push(err) }
      })

    }



  }

  const onSnackbarClose = () => {
    setSnackbar(false)
  }
  const onAlertClose = () => {
    setSnackbar(false)
  }
  const uploadCourseToDatabase = () => {
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
    uploadImage()
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
    setFiles(Object.values(event.target.files));
    // const newFile=[...file.data]
    // console.log("himanshu",event.target.files[0])
    // newFile.push(event.target.files[0].name)
    // setFile(prevData=>({
    //   ...prevData,data:newFile}))
    //   console.log(file.data)
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
          <div className="originForCourseUpload2">
            <div className="mainTf">
              <h2 className="CourseDetails">Course Details</h2>
              <div className="tfRow1">
                <TextField
                  id="outlined-basic"
                  className="textFiled"
                  label="CourseName"
                  defaultValue={courseObject.courseName}
                  onChange={changeCourseName}
                  variant="outlined"
                  sx={{ width: "15rem" }}
                />
                <TextField
                  id="outlined-basic"
                  onChange={changeInstructorName}
                  defaultValue={courseObject.instructorName}
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
                      label="Controlled picker"
                      value={value}
                      format="YYYY/MM/DD"
                      onChange={(newValue) => changeLastDayToEnroll(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  id="outlined-basic"
                  onChange={changeDuration}
                  defaultValue={courseObject.duration}
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
                  defaultValue={courseObject.courseDescription}
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
                <div>
                  {
                    files.map(v => <div key={v.name} style={{ cursor: 'pointer' }} onClick={() => { setFiles(files.filter(f => f.name !== v.name)) }}>{v.name}</div>)
                  }
                </div>
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
            </div>
          </div>
        </div>
      }
    </>

  );
}
