import React from "react";
import IconButton from "@mui/material/IconButton";
import Rotate from "react-reveal/Rotate";
import "../css/CourseDetail.css";
import dummyimg from "../images/eour.jpeg";


export function CourseDetail() {

  return (
    <div>

      <div className="originForCourseDetails">
        <Rotate top left>
          <div className="main-bookcontainer">
            <div className="left-side">
              <div className="img-Book">
                <img src={dummyimg} alt="img" />
              </div>
              <div className="book-button">
                <IconButton>Enroll Course</IconButton>
              </div>
            </div>
            <div className="right-content">
              <div className="title">Course Name </div>
              <div className="auther">by Instructor</div>
              <div className="pricebook">
                <div className="dis-price">Rs. {"342"} </div>
                <div className="real-price">Rs. {"870"}</div>
              </div>
              <hr />
              <div className="book-description">
                <div className="detail">Course Detail </div>
                <p className="descrip">
                  {" "}
                  Apple CEO Tim Cook warmly greeted the eager customers gathered
                  Despite the smaller size, the Apple Saket store offers all the
                  expected services like any other Apple store. Apple Saket
                  features a uniquely designed curved storefront with white oak
                  tables displaying Apple's products and accessories, as well as
                  a feature wall manufactured in India outside Apple’s Delhi
                  store with a smile He also interacted with the customers and
                  took pictures with fans.
                </p>
              </div>
            </div>
          </div>
        </Rotate>
      </div>
      
    </div>
  );
}

