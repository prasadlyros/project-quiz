import axios from "axios";
import { useState } from "react";

const TryingMeta = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // adjust this value as needed
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddQuestion = () => {
    const newQuestion = {
      question,
      options: [option1, option2, option3, option4],
      answer,
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    resetForm();
  };

  const handleSubmitQuiz = () => {
    axios.post("http://localhost:3001/Questions", questions)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(questions.length / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };

  const paginatedQuestions = questions.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div>
      <h2>Create Quiz</h2>
      <form>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <br />
        <label>Options:</label>
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
        />
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
        />
        <input
          type="text"
          value={option3}
          onChange={(e) => setOption3(e.target.value)}
        />
        <input
          type="text"
          value={option4}
          onChange={(e) => setOption4(e.target.value)}
        />
        <br />
        <label>Answer:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <br />
        <button onClick={handleAddQuestion}>Add Question</button>
      </form>
      <div>
        {paginatedQuestions.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
            <p>Answer: {question.answer}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePrevPage}>Prev</button>
      <button onClick={handleNextPage}>Next</button>
      <button onClick={handleSubmitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default TryingMeta