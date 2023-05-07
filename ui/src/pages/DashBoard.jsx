import Header from "../components/Header.jsx";
import { Box, Grid } from "@mui/material";
import CourseCard from "../components/CourseCard.jsx"
import { Container } from "@mui/material";
import Pie from "../components/PieGraph.js";
import "../css/DashBoard.css"
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/AdminService.js";
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';





function DashBoard() {

  const [dataForAdminDashBoard, setdataForAdminDashBoard] = useState([]);

useEffect(() => {
    adminDashBoardDbCall();

},[]);


  const adminDashBoardDbCall = async () => {
    var response = await getDashboardData();

    
    console.log("IN DASHBOARD DB CALL----",response)
    console.log("#############",response)
    setdataForAdminDashBoard(response)
    
  }


  const data1 = {
  
    labels: dataForAdminDashBoard.map((i) => i.name),
    datasets: [
      {
        label: 'Enrollments',
        data:  dataForAdminDashBoard.map((i) => i.enrollments),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  

  const data2 = {
  
    labels: dataForAdminDashBoard.map((i) => i.name),
    datasets: [
      {
        label: 'Seats Left',
        data:  dataForAdminDashBoard.map((i) => i.seatsLeft),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        min: 0,
        max: 10,
        stepSize: 1,
        
      },
    },
  };

  
  return (
    <div>

      <div className="originAdminDashboard">
    
      <div className="dashRow1">
        <div className="box1">
        <p className="boxnumber">34</p>
        <p className="textTitle" >Students </p>
     </div>
     <div className="box1">
        <p className="boxnumber">29</p>
        <p className="textTitle" >Courses </p>
        </div>
        <div className="box1">
        <p className="boxnumber">56%</p>
        <p className="textTitle" >Claimed <br></br>Certificates </p>
        </div>
        <div className="box1">
        <p className="boxnumber">AWS</p>
        <p className="textTitle"  > Trending </p>
        </div>
        <div className="box1">
        <p className="boxnumber"> <div style={{color : "green"}}>▲</div> </p>
        <p className="textTitle" > Catalog </p>
        </div>



    </div>
    <div className="dashrow2">
      <div className="barChart">
    <h2 style={{color : "#1c266e"}}>Bar Chart</h2>
    <Bar data={data1} options={options} />
    </div>
    <div className="barChart">
    <h2 style={{color : "#1c266e"}}>Line Chart</h2>
    <Line data={data2} options={options} />
    </div>
    </div>
    </div>
  </div>
  );
}

export default DashBoard;
