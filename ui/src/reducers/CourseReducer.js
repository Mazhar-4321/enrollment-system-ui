const initialState = {
    token:null,
    userRole:'student',
    studentChoiceSelected:'null',
    coursesEnrolled:[],
 
 
 }
 const CourseReducer = ((state = initialState, action) => {
     switch (action.type) {
 
         case 'refreshCourses':
             return null
         
         case 'changeLoginStatus':
             return{
                 ...state,isLoggedIn:false
             }
         case 'changeStudentChoice':
             var choice=action.value
             return{
               ...state,studentChoiceSelected:choice
             }
         case 'changeEnrolledCourses':
             var courses=action.value
             return{
                 ...state,coursesEnrolled:courses
             }
         
 
 
 
         default:
             return state
 
 
     }
 
 }
 )
 export default CourseReducer