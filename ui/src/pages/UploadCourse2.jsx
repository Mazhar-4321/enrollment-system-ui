import React, { useState } from "react";
import "../css/UploadCourse2.css";
import Buttons from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { DateField } from "@mui/x-date-pickers/DateField";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Button, message, Upload } from "antd";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { enrollInTheCourse } from "../services/StudentService";
import { uploadCourse } from "../services/AdminService";


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
  const [files, setFiles] = useState([])
  let imagesLink = [];
  const [value, setValue] = React.useState(dayjs('2022-04-17'));
  const [courseObject, setCourseObject] = useState({ courseName: '', courseDescription: '', lastDayToEnroll: '', duration: '', seatsLeft: '', notes: [], instructorName: '' })
  const uploadImage = async () => {

    // if(file!==null){
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
              const response = await uploadCourse(courseObject,imagesLink);
              if (response) {
                console.log("zerrrara")
              }
            } catch (err) {
              alert(err)
            }
          }
          callDB()

        } else { imagesLink.push(err) }
      })

    }



  }
  const uploadCourseToDatabase = () => {
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
    // let d = new Date(value+"".replace(/GMT.*$/,'GMT+0000')).toISOString();

// console.log(d.toISOString());
     
    // alert(d)
    // console.log(event.target)
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
    <div>
      <div className="originForCourseUpload2">
        <div className="mainTf">
          <h2 className="CourseDetails">Course Details</h2>
          <div className="tfRow1">
            <TextField
              id="outlined-basic"
              label="CourseName"
              onChange={changeCourseName}
              variant="outlined"
              sx={{ width: "15rem" }}
            />
            <TextField
              id="outlined-basic"
              onChange={changeInstructorName}

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
  );
}
