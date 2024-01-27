import { useState } from "react";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  function onAnswerClick(answer, index) {
    setAnswerIndex(index);

    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  }

  function onClickNext () {

  }

  return (
    <div className="quiz-component">
      <>
        <span className="active-question-no">{currentQuestion + 1}</span>
        <span className="total-question">/{questions.length}</span>

        <h2>{question}</h2>
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

        <div className="footer">
            <button onClick={onClickNext} disabled={answerIndex === null}>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
      </>
    </div>
  );
};

export default Quiz; // We can import many things, this is the default one. For example only object can be exported and then imported in another file
