import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export const MyProfile=()=>{
    return(
        <div className="myProfile">
         <div className="name">
         <TextField
         sx={{width:'35%',margin:'20px'}}
         fullWidth
          id="outlined-required"
          label="First Name"
          defaultValue="Mazhar"
        />
        <TextField
        sx={{width:'35%',margin:'20px'}}
        fullWidth
          id="outlined-required"
          label="Last Name"
          defaultValue="Ali"
        />
         </div>
         <div className="name">
         <TextField
         sx={{width:'35%',margin:'20px'}}
         fullWidth
          id="outlined-required"
          label="Email"
          defaultValue="syedmazharali742@gmail.com"
        />
        <TextField
        sx={{width:'35%',margin:'20px'}}
        fullWidth
          id="outlined-required"
          type="password"
          label="Password"
          defaultValue="Ali"
        />
         </div>
         <div className="submit">
         <Button sx={{textTransform:'none'}} variant="contained">Save Changes</Button>
         </div>
        </div>
    )
}