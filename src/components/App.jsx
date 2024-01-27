import Quiz from "./quiz-component/Quiz"
import { jsQuiz } from "./questions"

function App() {
  return (
    <div>
      <Quiz questions={jsQuiz.questions} />
    </div>
  )
}

export default App
