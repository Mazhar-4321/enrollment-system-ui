import React, { useState } from "react";
import "../css/UploadQuestions.css";
import Header from "../Components/Header";
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";


const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newOption1, setNewOption1] = useState("");
  const [newOption2, setNewOption2] = useState("");
  const [newOption3, setNewOption3] = useState("");
  const [newOption4, setNewOption4] = useState("");
  const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

  const handleAddQuestion = () => {
    const newQuestionObj = {
      question: newQuestion,
      options: [newOption1, newOption2, newOption3, newOption4],
      correctAnswer: newCorrectAnswer,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("In handleSubmit---->  ", questions);
  };

  const handleOptionChange = (event) => {
    setNewCorrectAnswer(event.target.value);
  };

  return (
    <div>
      <Header />

      <div className="QuestionForm">
        <h3 style={{marginLeft : "2rem",color : "#1c266e"}}>Add Questions </h3>

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
                  value="option1"
                  control={<Radio />}
                  label="Option 1"
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label="Option 2"
                />
                <FormControlLabel
                  value="option3"
                  control={<Radio />}
                  label="Option 3"
                />
                <FormControlLabel
                  value="option4"
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
