const initialState = {
    token:null,
    userRole:'student',
    studentChoiceSelected:'null',
    coursesEnrolled:[],
 
 
 }
 const CourseReducer = ((state = initialState, action) => {
    console.log(action.type)
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
            case 'updateToken':
                var token=action.value+""
                console.log(token)
                var tokenArray=token.split(",")
                console.log(tokenArray)
                return{
                    ...state,token:tokenArray[1],userRole:tokenArray[0]
                }
         
 
 
 
         default:
            console.log("default executed")
             return state
 
 
     }
 
 }
 )
 export default CourseReducer