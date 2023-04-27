import React from "react";
import "../css/UploadCourse2.css";
import Buttons from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";


const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export function UploadCourse2() {
  return (
    <div>
      <div className="originForCourseUpload2">
        <div className="mainTf">
          <h2 className="CourseDetails">Course Details</h2>
          <div className="tfRow1">
            <TextField
              id="outlined-basic"
              label="CourseName"
              variant="outlined"
              sx={{ width: "15rem" }}
            />
            <TextField
              id="outlined-basic"
              label="InstrctorName"
              variant="outlined"
              sx={{ width: "15rem" }}
            />
          </div>
          <div className="tfRow2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  sx={{ width: "15rem" }}
                  size="large"
                  label="Last Day To Enroll"
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              sx={{ width: "15rem" }}
            />
          </div>
          <div className="tfRow3">
            <TextField
              id="outlined-basic"
              label="Course Description"
              multiline
              maxRows={4}
              variant="outlined"
              sx={{ width: "15rem" }}
            />
            <Upload {...props} accept=".pdf">
              <Button
                style={{ width: "15rem" }}
                size={"large"}
                icon={<UploadOutlined />}
                block="true"
              >
                Click to Upload
              </Button>
            </Upload>
          </div>
          <div className="tfRow4">
            <Buttons
              variant="contained"
              size="medium"
              className="upc"
              sx={{ width: "34rem" }}
            >
              Upload Course
            </Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}
