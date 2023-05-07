import React, { useState } from "react";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Rotate from "react-reveal/Rotate";
import "../css/CourseDetail.css";
import dummyimg from "../images/eour.jpeg";
import sampleimg from "../images/71OsIaHonQL._SL1500_.jpg"
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { enrollInTheCourse } from "../services/StudentService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Jump from 'react-reveal/Jump';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export function CourseDetail() {
  let location = useLocation();
  const myState = useSelector(state => state.CourseReducer)
  const [snackbar, setSnackbar] = useState(false)
  const dispatch = useDispatch();
  const [enroll, setEnroll] = useState(false)
  const onSnackbarClose = () => {
    setSnackbar(false)
  }
  const onAlertClose = () => {
    setSnackbar(false)
  }
  const handleEnrollment = async () => {
    console.log(myState.coursesEnrolled)
    try {
      var courseResponse = await enrollInTheCourse(location.state.id);
      if (courseResponse) {
        setEnroll(true)
        setSnackbar(true)
        dispatch({
          type: 'updateCourseEnrollment',
          value: location.state.id
        })
      }
      console.log(courseResponse)
    } catch (err) {
      console.log(err)
      alert("Course Can't be Registered")
    }
  }
  return (
    <div>
      <Snackbar open={snackbar} autoHideDuration={1000} onClose={onSnackbarClose}>
        <Alert onClose={onAlertClose} severity='success' sx={{ width: '100%' }}>
          {'Course Enrolled SuccessFully'}
        </Alert>
      </Snackbar>
      <div className="originForCourseDetails">
      <Jump>
          <div className="main-bookcontainer">
            <div className="left-side">
              <div className="img-Book">
                <img src={sampleimg} alt="img" style={{height : "100%" , width : "100%"}} />
                </div>
              <Button style={{width : "60%"}} className="enrollButton" variant="contained"  disabled={enroll} onClick={handleEnrollment}>Enroll Course</Button>
            
            
              {/* <div >
                <IconButton disabled={enroll} onClick={handleEnrollment}>Enroll Course</IconButton>
              </div> */}
            </div>


            <div className="right-content">
              <div className="title">{location.state.courseName} </div>
              <div className="auther"> Course By : {location.state.instructor}</div>
              <div className="pricebook">
               
                <div className="dis-price">Last Day to Enroll : {location.state.lastDate}</div>
               
              </div>
              <div className="real-price"> Seats Left : {location.state.duration}</div>
              <hr />
              <div className="book-description">
                <div className="detail">Course Details :  </div>
                <p className="descrip">
                  {location.state.courseDescription}

                </p>
              </div>
            </div>
          </div>
          </Jump>
      </div>

    </div>
  );
}

