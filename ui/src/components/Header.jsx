import React from "react";
//import Badge from '@mui/material/Badge';
import IconButton from "@mui/material/IconButton";
//import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import Badge from "@mui/material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import "../css/Header.css";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  return (
    <div className="main-header">
      <div className="header">
        <IconButton>
          <div className="book-icon">
            <SchoolIcon
              fontSize="medium"
              style={{ color: "white", position: "relative", bottom: "0.1rem" }}
            />
            <p
              style={{
                color: "white",
                fontSize: "large",
                position: "relative",
                left: "0.5rem",
              }}
            >
              Class Enrollment System
            </p>
          </div>
        </IconButton>

        <div className="searchBar">
          <div>
            <SearchIcon className="magicon" />
          </div>
          <input className="search" type="text" placeholder="Search"></input>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            left: "18rem",
            columnGap: "1rem",
          }}
        >
          <div className="Profile-icon">
            <IconButton>
              <PermIdentityTwoToneIcon
                style={{ color: "white" }}
              ></PermIdentityTwoToneIcon>
            </IconButton>
            <div className="profilename" style={{ color: "white" }}>
              Profile
            </div>
          </div>

          <div className="Course-icon">
            <IconButton>
              <Badge color="primary">
                <CollectionsBookmarkIcon style={{ color: "white" }} />
              </Badge>
            </IconButton>
            <div className="Course-name" style={{ color: "white" }}>
              Courses
            </div>
          </div>
          <div className="Logout-icon">
            <IconButton>
              <Badge color="primary">
                <LogoutIcon style={{ color: "white" }} />
              </Badge>
            </IconButton>
            <div className="wish-name" style={{ color: "white" }}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
