import React, { useState } from "react";
import QuestionsSection from "./QuestionsSection";

function QuestionsPage() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const mockQuestions = [
    { question: "What is normalization in DBMS?" },
    { question: "Explain the difference between TCP and UDP." },
    { question: "How does garbage collection work in Java?" },
    { question: "What is polymorphism in OOP?" },
    { question: "Explain indexing in SQL." },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <QuestionsSection
        mockInterviewQuestion={mockQuestions}
        activeQuestionIndex={activeQuestionIndex}
      />
    </div>
  );
}

export default QuestionsPage;
