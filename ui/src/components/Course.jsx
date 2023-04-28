import React from "react";
import '../css/Course.css'
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Course = (props) => {

    const handleChange = async () => {

    }
    return (
        <div onClick={handleChange} style={{ cursor: 'pointer' }} className="card">
            <div className="card-image" >
                <img className="card-image-display" src={'https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg'} onError={() => 'src=https://public-v2links.adobecc.com/d096df37-ca37-4026-553f-8cfa6bec09ec/component?params=component_id%3A634ba680-536e-4b6f-b4a3-41986b9b22f5&params=version%3A0&token=1679461552_da39a3ee_5b75718b73ea33c3022cbe352cbeb9bcb66597f0&api_key=CometServer1'} />
                {!props.isStudent && <IconButton style={{ position: 'abslute', top: '-80px', right: '-50px', background: 'black', color: 'white' }}>
                    <CloseIcon />
                </IconButton>
                }
            </div>

            <div style={{ height: '37%', width: '100%', marginLeft: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', rowGap: '2' }}>
                <div style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }}><span>Course Name : {props.name}</span></div>

                <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Instructor Name : {props.instructor}</span></div>
                <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>Last Date To Enroll :{props.lastDate}</span></div>

                <div>
                    <span style={{ marginTop: '5px', padding: '3px 7px 3px 7px', fontSize: '10px', textAlign: 'center', width: '14px', height: '13px', background: 'green', color: 'white' }}>Duration:{props.duration}hrs approx.</span  >
                </div>
                <div style={{ marginTop: '5px', }}><span style={{ fontSize: '12px' }}>Seats Left:{props.seatsLeft} </span></div>
            </div>
        </div>
    )
}