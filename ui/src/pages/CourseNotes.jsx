import React, { useEffect, useState } from "react";
import '../css/StudentPage.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import SchoolIcon from '@mui/icons-material/School';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { MyProfile } from "../components/MyProfile";
import Certificate from '../images/certificate.png';
import Image1 from '../images/myImage.png';

import html2pdf from "html-to-pdf-js";
import { Course } from "../components/Course";
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelCourse, getAllCourses, getHighestMarks, getMyCourses, getQuiz } from "../services/StudentService";
import { pickersToolbarButtonClasses } from "@mui/x-date-pickers/internals";
import { PDFViewer } from "../components/PDFViewer";
import { useLocation } from "react-router-dom";
import { TakeQuiz } from "../components/TakeQuiz";
import { ClaimCertificate } from "../components/ClaimCertificate";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const CourseNotes = () => {
    const myState = useSelector(state => state.CourseReducer)
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    let grade='A';
    const [availableCoursesList, setAvailableCoursesList] = useState({ data: [] })
    const [myCoursesList, setmyCoursesList] = useState({ data: [] })
    const [quiz, setQuiz] = useState([])
    const [coursesList, setCoursesList] = useState({
        data: []
    })
    const [border, setBorder] = useState({
        notes: '2px solid #fff',
        takeQuiz: null,
        cancelCourse: null,
        claimCertificate: null,
    })
    useEffect(() => {

        const dbCall = async () => {
            const quizResponse = await getQuiz(location.state.id);
            console.log("quiz Response", quizResponse)
            setQuiz(quizResponse)
            console.log(myState.coursesEnrolled.get(location.state.id).notes.split(","))
            setmyCoursesList(prevData => (
                {
                    ...prevData, data: myState.coursesEnrolled.get(location.state.id).notes.split(",")
                }
            ))
            //    setmyCoursesList(prevData=>(
            //     {...prevData,data:myState.coursesEnrolled.get(location.state.id).notes.split(","))})
            // var availableCoursesData = await getAllCourses();

            // console.log("available courses", availableCoursesData)
            // var myCoursesData = await getMyCourses(myState.userDetails.email);
            // setCoursesList(prevData => ({
            //     ...prevData, data: availableCoursesData
            // }))
            // setmyCoursesList(prevData => ({
            //     ...prevData, data: myCoursesData
            // }))
            // setAvailableCoursesList(prevData => ({
            //     ...prevData, data: availableCoursesData
            // }))
            // dispatch({
            //     type:'updateStudentCourses',
            //     value:{
            //        myCourses:myCoursesData

            //     }
            // })
        }
        dbCall()
    }, [])
    const playBackdrop = () => {

    }
    const [choice, setChoice] = useState('Notes');
    const changeFilterValue = (event) => {
        // setFilter(event.target.value);
    }
    const changeChoice = async (choice) => {
        setBorder(prevBorder => ({
            ...prevBorder, notes: null, takeQuiz: null,
            cancelCourse: null,
            claimCertificate: null,
        }))
        console.log(location.state)
        switch (choice) {
            case 'Notes':
                setChoice('Notes');
                setBorder(prevBorder => ({
                    ...prevBorder, notes: '2px solid #fff'
                }))
                break;
            case 'Take Quiz':

                setBorder(prevBorder => ({
                    ...prevBorder, takeQuiz: '2px solid #fff'
                }))
                setChoice('Take Quiz'); break;
            case 'Cancel Course':
                setChoice('Cancel Course');
                var cancelCourse1= await cancelCourse(location.state.id);
                console.log("cancellll",cancelCourse1)
                if(cancelCourse1){
                    dispatch({
                        type:'delteCourse',
                        value:location.state.id
                    })
                    navigate("/StudentPage");
                }
                setBorder(prevBorder => ({
                    ...prevBorder, cancelCourse: '2px solid #fff'
                }))
                break;
            case 'Claim Certificate':
                setChoice('Claim Certificate');
                var getMarks=await getHighestMarks(location.state.id);
                if(getMarks[0].max>6){
                    console.log("Pass",getMarks[0].max-1);
                    if(getMarks[0]>8){
                        grade='A'
                    }
                    if(getMarks[0]>7&&getMarks[0]<=8){
                        grade='B'
                    }
                    if(getMarks[0]>6&&getMarks[0]<=7){
                        grade='C'
                    }
                    if(getMarks[0]<6){
                        grade='D'
                    }
                    var element = document.getElementById('domEl');
                    element.style.display='block'
                   // html2pdf(element)
                   var opt = {
                    margin:       0,
                    filename:     'Himanshu.pdf',
                    image:        { type: 'jpeg', quality: 1 },
                    html2canvas:  { scale: 2 },
                    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                  };
                    html2pdf().set(opt).from(element).save()
                    setTimeout(()=>{
                        element.style.display='none'
                    },10) 
                }else{
                    
                }
                console.log("ress",getMarks)
                setBorder(prevBorder => ({
                    ...prevBorder, claimCertificate: '2px solid #fff'
                }))
                break;

        }
    }
    return (

        <div className="main-container">
           
            <div className="header">
                <div className="icon">
                    <AssignmentIcon />
                    <div>Class Enrollment System</div>
                </div>
                <div className="search-bar">
                    <Paper
                        onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault() } }}
                        component="form"
                        sx={{ borderRadius: '10px', height: '35px', background: '#fff', p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />

                    </Paper>
                </div>
                <div className="user-activities">
                    <div style={{ border: border.notes, cursor: 'pointer' }} onClick={() => changeChoice('Notes')} className="icon-value">
                        <AccountBalanceIcon />
                        <div>Notes</div>
                    </div>
                    <div style={{ border: border.takeQuiz, cursor: 'pointer' }} onClick={() => changeChoice('Take Quiz')} className="icon-value">
                        <SchoolIcon />
                        <div>Take Quiz</div>
                    </div>
                    <div style={{ border: border.cancelCourse, cursor: 'pointer' }} onClick={() => changeChoice('Cancel Course')} className="icon-value">
                        <PersonOutlineIcon />
                        <div>Cancel Course</div>
                    </div>
                    <div style={{ border: border.claimCertificate, cursor: 'pointer' }} onClick={() => changeChoice('Claim Certificate')} className="icon-value">
                        <LogoutIcon />
                        <div>Claim Certificate</div>
                    </div>
                </div>
            </div>
            <div className="body">
                {choice == 'Notes' ?
                    <div className="course-grid">
                        {
                            choice === 'My Profile' ? <MyProfile /> :

                                <Grid container spacing={2}>

                                    {
                                        myCoursesList.data.map((e, i) => {
                                            return (
                                                <Grid item xs={3}>
                                                    <PDFViewer name={"pdf" + (i + 1)} url={e} />
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>



                        }
                    </div>
                    : choice == 'Take Quiz' ?
                        <TakeQuiz courseId={location.state.id} quiz={quiz} />
                        : choice == 'Claim Certificate' ?
                        <div id="domEl" style={{display:'none',width:'100vw',height:'1050px'}}>
                        <img style={{ width: '850px', height: '1050px' }} src={Certificate} />
                        <div style={{ top: '480px', left: '300px', position: 'absolute' }}>{myState.userDetails.firstName} {myState.userDetails.lastName}</div>
                        <div style={{ top: '680px', left: '300px', position: 'absolute' }}>{location.state.courseName}</div>
                        <div style={{ top: '770px', left: '300px', fontSize: '8px', position: 'absolute' }}>{new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()}</div>
                        <div style={{ top: '860px', left: '550px', position: 'absolute' }}>Grade:{grade}</div>
                        <img style={{ top: '750px', left: '600px', fontSize: '8px', position: 'absolute' }} src={Image1} />
                    </div>
                            :
                            <div>Cancel Course</div>

                }
            </div>


        </div>
    )
}