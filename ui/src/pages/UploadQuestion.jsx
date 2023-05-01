import React, { useEffect, useState } from "react";
import "../css/UploadQuestions.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { addQuiz, getMyCourses } from "../services/AdminService";


const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([])

  const handleChange = (event) => {
    setCourse(event.target.value);
  };
  const [newQuestion, setNewQuestion] = useState("");
  const [newOption1, setNewOption1] = useState("");
  const [newOption2, setNewOption2] = useState("");
  const [newOption3, setNewOption3] = useState("");
  const [newOption4, setNewOption4] = useState("");
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

  useEffect(() => {
    const dbCall = async () => {
      try {
        var response = await getMyCourses()
        setCourses(response)
      } catch (err) {
        console.log("err", err)
      }
    }
    dbCall()
  }, [])

  const handleAddQuestion = () => {
    const newQuestionObj = {
      question: newQuestion,
      question_id:Date.now(),
      options: [newOption1, newOption2, newOption3, newOption4],
      correctAnswer: newCorrectAnswer==0?newOption1:(newCorrectAnswer==1?newOption2:(newCorrectAnswer==2?newOption3:newOption4)),
    };

    setQuestions([...questions, newQuestionObj]);

    setNewQuestion("");
    setNewOption1("");
    setNewOption2("");
    setNewOption3("");
    setNewOption4("");
    setNewCorrectAnswer("");

    console.log("In handleAddQuestions----> ", questions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("In handleSubmit---->  ", questions);
    var response = await addQuiz(course, questions)
  };

  const handleOptionChange = (event) => {
    setNewCorrectAnswer(event.target.value);
  };

  return (
    <div>


      <div className="QuestionForm">
        <h3 style={{ marginLeft: "2rem", color: "#1c266e" }}>Add Questions </h3>
        <Box sx={{ width: 200, marginLeft: '30px' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={course}
              label="Age"
              onChange={handleChange}
            >
              {courses.map(e => <MenuItem value={e.c_id}>{e.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        <div className="QuestinSection">
          <div className="EnterQuestions">
            <TextField
              required
              id="question"
              label="Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="option1"
              label="Option 1"
              value={newOption1}
              onChange={(e) => setNewOption1(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="option2"
              label="Option 2"
              value={newOption2}
              onChange={(e) => setNewOption2(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="option3"
              label="Option 3"
              value={newOption3}
              onChange={(e) => setNewOption3(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="option4"
              label="Option 4"
              value={newOption4}
              onChange={(e) => setNewOption4(e.target.value)}
              fullWidth
              margin="normal"
            />
          </div>
          <div className="CorrectAnswer">
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Correct Answer</FormLabel>
              <RadioGroup
                aria-label="correct-answer"
                name="correct-answer"
                value={newCorrectAnswer}
                onChange={handleOptionChange}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Option 1"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Option 2"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Option 3"
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="Option 4"
                />
              </RadioGroup>
            </FormControl>
            <div className="ButtonGroup">
              <Button className="AddButton" onClick={handleAddQuestion} variant="contained">
                Add question
              </Button>
              <Button className="SubmitButton" onClick={handleSubmit} variant="contained">
                Submit Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
