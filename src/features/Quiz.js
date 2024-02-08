import React, { useState } from "react";
import "./style.css";
import { Questions as data } from "../db/db";
import ProgressBar from "../components/ProgressBar";
import { Rating } from "@mui/material";
import ScoreBar from "../components/ScoreBar";
const Quiz = () => {
  const totalQuestions = data.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState(totalQuestions);
  const calculateProgress = () => {
    return (currentQuestionIndex / totalQuestions) * 100;
  };

  const isAnswerCorrect = () => {
    return (
      selectedAnswer ===
      decodeURIComponent(data[currentQuestionIndex].correct_answer)
    );
  };

  const handleAnswerClick = (answer) => {
    setRemainingQuestions(
      (prevremainingQuestions) => prevremainingQuestions - 1
    );
    setAnswered((prevAnswered) => prevAnswered + 1);

    setSelectedAnswer(answer);
    console.log("this is answered", answered);
    console.log("this is remque", remainingQuestions);

    if (
      answer === decodeURIComponent(data[currentQuestionIndex].correct_answer)
    ) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
  };
  const getRatingValue = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return 1;
      case "medium":
        return 2;
      case "hard":
        return 3;
      default:
        return 0;
    }
  };

  const calculateScore = () => {
    console.log("this is correctAnswers", correctAnswers);
    console.log("this is answered", answered);
    const maxScorePercentage = (correctAnswers / answered) * 100;
    return isNaN(maxScorePercentage) ? 0 : Math.round(maxScorePercentage);
  };
  const predictScoreIfAllCorrect = () => {
    const totalCorrect = correctAnswers + remainingQuestions;
    const predictCorrect = (totalCorrect / totalQuestions) * 100;
    return isNaN(predictCorrect) ? 0 : Math.round(predictCorrect);
  };

  const predictScoreIfAllWrong = () => {
    const predictWrong = (correctAnswers / totalQuestions) * 100;
    return isNaN(predictWrong) ? 0 : Math.round(predictWrong);
  };
  return (
    <>
      <div className="container">
        {currentQuestionIndex < totalQuestions ? (
          <>
            <div className="childdiv">
              <ProgressBar progress={calculateProgress()} />
            </div>

            <div className="childdiv2">
              <div>
                <h1>
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </h1>
              </div>
              <div style={{ marginTop: "-4vh" }}>
                <span>
                  {decodeURIComponent(data[currentQuestionIndex].category)}
                </span>
              </div>
              <div>
                <Rating
                  name="read-only"
                  value={getRatingValue(data[currentQuestionIndex].difficulty)}
                  readOnly
                  style={{ color: "black" }}
                />
              </div>
            </div>
            <div className="childdiv3">
              <div className="question-text">
                {decodeURIComponent(data[currentQuestionIndex].question)}
              </div>
            </div>

            <div className="buttons-child">
              {[
                ...data[currentQuestionIndex].incorrect_answers,
                decodeURIComponent(data[currentQuestionIndex].correct_answer),
              ].map((answer, index) => (
                <div>
                  <button
                    className="choice_buttons"
                    key={index}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={selectedAnswer !== null}
                    style={{
                      color: "black",
                      width: "15vw",
                      padding: "1vw",
                      marginLeft: "2vw",
                      marginRight: "2vw",
                      marginBottom: "5vh",
                      borderRadius: "8px",
                    }}
                  >
                    {decodeURIComponent(answer)}
                  </button>
                </div>
              ))}
            </div>
            <div className="feedback">
              {selectedAnswer && (
                <span style={{ fontSize: "1.5rem", marginRight: "3vw" }}>
                  {isAnswerCorrect() ? "Correct!" : "Sorry!"}
                </span>
              )}
            </div>
            <div style={{ marginTop: "1.5vh" }}>
              {selectedAnswer && (
                <button
                  style={{ padding: "1vw", width: "10vw", marginRight: "3vw" }}
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                >
                  Next Question
                </button>
              )}
            </div>
            <div>
              <div>
                <ScoreBar
                  bgcolor="gray"
                  completed={calculateScore()}
                  predictCorrect={predictScoreIfAllCorrect()}
                  predictWrong={predictScoreIfAllWrong()}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1>COMPLETED </h1>
              <p>
                {correctAnswers}/{totalQuestions} ({calculateScore()}
                %)
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
