import Header from "../components/Header.jsx";
import { Box, Grid } from "@mui/material";
import CourseCard from "../components/CourseCard.jsx"
import { Container } from "@mui/material";
import Pie from "../components/PieGraph.js";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/AdminService.js";



function DashBoard() {
  const [visualData, setVisualData] = useState([])

  useEffect(()=>{
    const dbCall = async () => {
      var response = await getDashboardData();
      console.log("statr")
      d3.range(response.length).map((item, idx) => ({
        date: idx,
        value: value === null || value === undefined ? Math.random() * 100 : value
      }));
  
      setVisualData(response)
    }
    dbCall();
  },[])
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, idx) => ({
      date: idx,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData());
  const changeData = () => {
    setData(generateData());
  };

  return (
    <div style={{ width: '100%' }}> <Pie
      data={data}
      width={200}
      height={200}
      innerRadius={60}
      outerRadius={100}
    /></div>
  );
}

export default DashBoard;
