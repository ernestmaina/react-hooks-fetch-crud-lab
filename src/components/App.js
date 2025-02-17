// App.js
import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]); 
  
  const onDeleteQuestion = (questionId) => {
   
   
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then(() => {
     
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
      })
      .catch((error) => {
        console.error("Error deleting question: ", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching questions: ", error);
      });
  }, []); 

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : (
        <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion} />
      )}
    </main>
  );
}

export default App;
