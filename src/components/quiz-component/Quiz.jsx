import { useState } from "react";
import { resultInitialState } from "../results";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import "./Quiz.scss"

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(false);
  const [inputAnswer, setInputAnswer] = useState('');
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  function onAnswerClick(answer, index) {
    setAnswerIndex(index);

    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  function onClickNext(finalAnswer) {
    // reset the answer index
    setAnswerIndex(null);
    setShowAnswerTimer(false); // hide the progress when next is clicked
    // update the results while considering the prev value
    setResult((prevstate) =>
      finalAnswer
        ? {
            ...prevstate,
            score: prevstate.score + 1,
            correctAnswers: prevstate.correctAnswers + 1,
          }
        : {
            ...prevstate,
            wrongAnswers: prevstate.wrongAnswers + 1,
          }
    );

    // move over to the next question if the current question is not the last question
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prevstate) => prevstate + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    // make the progress visible again
    setTimeout(() => {
     setShowAnswerTimer(true); 
    });
    setInputAnswer('');
  }

  function onTryAgain () {
    setResult(resultInitialState);
    setShowResult(false);
  }

  function onTimeUp () {
    onClickNext(false);
  }

  function onInputChange (evt) {
    setInputAnswer(evt.target.value);

    if (evt.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  function getAnswerUI () {

    if (type === 'FIB') {
      return <input type="text" value={inputAnswer} onChange={onInputChange} />;
    }

    return (
      <ul>
      {choices.map((answer, index) => (
        <li
          onClick={() => onAnswerClick(answer, index)}
          key={answer} // this is just so that react doesn't re-render the entire page, and only re-renders this item
          className={answerIndex === index ? "selected-answer" : null}
        >
          {answer}
        </li>
      ))}
      </ul>
    );
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && <AnswerTimer duration={5} onTimeUp={onTimeUp} />}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>

          <h2>{question}</h2>
          {getAnswerUI()}

          <div className="footer">
            <button onClick={() => onClickNext(answer)} disabled={answerIndex === null && !inputAnswer}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result-container">
          <h2>Results</h2>
          <div className="results">
            <p>
              Total Questions : <span>{questions.length}</span>
            </p>
            {/* TODO: Dynamically show max score instead of your score and show your score later */}
            <p>
              Your Score : <span>{result.score}</span>
            </p>
            <p>
              Correct Answers : <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers : <span>{result.wrongAnswers}</span>
            </p>
          </div>
          <p className="try-again"><button onClick={onTryAgain}>Try Again</button></p>
        </div>
      )}
    </div>
  );
};

export default Quiz; // We can import many things, this is the default one. For example only object can be exported and then imported in another file
