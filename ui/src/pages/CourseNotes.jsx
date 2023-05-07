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
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { pickersToolbarButtonClasses } from "@mui/x-date-pickers/internals";
import { PDFViewer } from "../components/PDFViewer";
import { useLocation } from "react-router-dom";
import { TakeQuiz } from "../components/TakeQuiz";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { ClaimCertificate } from "../components/ClaimCertificate";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const CourseNotes = () => {
    const myState = useSelector(state => state.CourseReducer)
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [choice, setChoice] = useState('Notes');
    const [snackbar, setSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('')
    let grade = 'A';
    const [myCoursesList, setmyCoursesList] = useState({ data: [] })
    const [quiz, setQuiz] = useState([])
    const [border, setBorder] = useState({
        notes: '2px solid #fff',
        takeQuiz: null,
        cancelCourse: null,
        claimCertificate: null,
    })
    const changeChoice = async (choice) => {
        setBorder(prevBorder => ({
            ...prevBorder, notes: null, takeQuiz: null,
            cancelCourse: null,
            claimCertificate: null,
        }))
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
                var cancelCourse1 = await cancelCourse(location.state.id);
                if (cancelCourse1) {
                    dispatch({
                        type: 'delteCourse',
                        value: location.state.id
                    })
                    navigate("/StudentPage");
                }
                setBorder(prevBorder => ({
                    ...prevBorder, cancelCourse: '2px solid #fff'
                }))
                break;
            case 'Claim Certificate':
                setChoice('Claim Certificate');
                var getMarks = await getHighestMarks(location.state.id);
                if (getMarks == 'Fail') {
                    prepareSnackbar("Certificate Can't be downloaded","error")
                    return
                }
                if (getMarks == 'Success') {
                    if (getMarks[0] > 8) {
                        grade = 'A'
                    }
                    if (getMarks[0] > 7 && getMarks[0] <= 8) {
                        grade = 'B'
                    }
                    if (getMarks[0] > 6 && getMarks[0] <= 7) {
                        grade = 'C'
                    }
                    if (getMarks[0] < 6) {
                        grade = 'D'
                    }
                    var element = document.getElementById('domEl');
                    element.style.display = 'block'
                    var opt = {
                        margin: 0,
                        filename: `${myState.userDetails.firstName}`,
                        image: { type: 'jpeg', quality: 1 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };
                    html2pdf().set(opt).from(element).save()
                    setTimeout(() => {
                        element.style.display = 'none'
                    }, 10)
                } else {
                    prepareSnackbar("Minimum 80% Required To Download Certificate","error");
                    return
                }
                setBorder(prevBorder => ({
                    ...prevBorder, claimCertificate: '2px solid #fff'
                }))
                break;

        }
    }
    const prepareSnackbar=(message,severity)=>{
        setSnackbar(true);
        setSnackbarMessage(message);
        setSnackbarSeverity(severity)
    }
    useEffect(() => {
        // const imageRef = 
        // ref(storage, `images/syedmazharali742@gmail.com/Himanshu (15) (1).pdf`);
        

        // getDownloadURL(imageRef)
        // .then((url) => {
        //   console.log("This is the url",url)
        // })
        // .catch((error) => {
        //   // Handle any errors
        //   console.log("errrr",error)
        // });

        // // imageRef
        // // .getDownloadURL()
        // // .then((url) => {
        // //   console.log("url",url)
        // // })
        // // .catch((e) => console.log('getting downloadURL of image error => ', e));
      
        const dbCall = async () => {
            const quizResponse = await getQuiz(location.state.id);
            setQuiz(quizResponse)
            setmyCoursesList(prevData => (
                {
                    ...prevData, data: myState.coursesEnrolled.get(location.state.id).notes.split(",")
                }
            ))
        }
        dbCall()
    }, [])

    return (

        <div className="main-container">
            <Snackbar open={snackbar} onClose={() => setSnackbar(false)} autoHideDuration={1000} >
                <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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
                                                    <PDFViewer  name={"pdf" + (i + 1)} url={e} />
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
                            <div id="domEl" style={{ display: 'none', width: '100vw', height: '1050px' }}>
                                <img style={{ width: '850px', height: '1050px' }} src={Certificate} />
                                <div style={{ top: '480px', left: '300px', position: 'absolute' }}>{myState.userDetails.firstName} {myState.userDetails.lastName}</div>
                                <div style={{ top: '680px', left: '300px', position: 'absolute' }}>{location.state.courseName}</div>
                                <div style={{ top: '770px', left: '300px', fontSize: '8px', position: 'absolute' }}>{new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear()}</div>
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