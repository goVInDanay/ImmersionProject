
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuestionsSection from "./QuestionsSection";

function QuestionsPage() {
  const location = useLocation();
  const { rollNumber, topics, role, experience, techStack } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role || !techStack || !experience) return;

    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mock/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, experience, techStack }),
        });

        const data = await res.json();
        const parsed = data.questions.split("\n").filter(Boolean).map((q) => ({
          question: q.replace(/^\d+\.\s*/, ""),
        }));
        setQuestions(parsed);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [role, experience, techStack]);

  if (loading) return <div className="text-center mt-10">Loading questions...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <QuestionsSection
        mockInterviewQuestion={questions}
        activeQuestionIndex={activeQuestionIndex}
      />
    </div>
  );
}

export default QuestionsPage;
