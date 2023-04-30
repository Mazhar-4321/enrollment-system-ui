import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Rotate from "react-reveal/Rotate";
import "../css/CourseDetail.css";
import dummyimg from "../images/eour.jpeg";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { enrollInTheCourse } from "../services/StudentService";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
        <Rotate top left>
          <div className="main-bookcontainer">
            <div className="left-side">
              <div className="img-Book">
                <img src={dummyimg} alt="img" />
              </div>
              <div className="book-button">
                <IconButton disabled={enroll} onClick={handleEnrollment}>Enroll Course</IconButton>
              </div>
            </div>
            <div className="right-content">
              <div className="title">{location.state.courseName} </div>
              <div className="auther">{location.state.instructor}</div>
              <div className="pricebook">
                <div className="dis-price"> {location.state.lastDate}</div>
                <div className="real-price">{location.state.duration}</div>
              </div>
              <hr />
              <div className="book-description">
                <div className="detail">Course Detail </div>
                <p className="descrip">
                  {location.state.courseDescription}

                </p>
              </div>
            </div>
          </div>
        </Rotate>
      </div>

    </div>
  );
}

