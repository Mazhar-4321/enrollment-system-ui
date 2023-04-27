import Header from "../Components/Header";
import { Box, Grid } from "@mui/material";
import CourseCard from "../Components/CourseCard"
import { Container } from "@mui/material";



function DashBoard() {


 return (
    <Box>
      <Header />
      <Grid
        lg={12}
        md={12}
        sm={12}
        xm={12}
        spacing={1}
        container
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          left: 160,
          width: "81vw",
          height: "auto",
          // border: '1px solid black'
        }}
      >
        <>
          <Container>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // position: 'relative',
                // left: 60,
                // width: 1100
              }}
            >
              <Box>
                <h3>Courses(90 items)</h3>
              </Box>
              <Box>
                <label for="books">
                  <select id="sortBooks">
                    <option value="Relevance">sort by Relevance</option>
                    <option value="Name">Name</option>
                    <option value="Category">Category</option>
                    <option value="Author">Author</option>
                  </select>
                </label>
              </Box>
            </Box>
          </Container>
          <Grid
            item
            container
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "83vw",
              height: "auto",
              flexGrow: 1,
            //   border : "2px solid red"
            }}
            spacing={3.8}
            columns={{ xs: 12, sm: 12, md: 12 }}
            lg={6}
          >
            <Grid item lg={9} sm={3}>
              <CourseCard/>
            </Grid>
          </Grid>
        </>
   
      </Grid>
    </Box>
  );
}

export default DashBoard;
