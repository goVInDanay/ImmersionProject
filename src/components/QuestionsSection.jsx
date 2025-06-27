import React from "react";
import { Lightbulb, Volume2 } from "lucide-react";
import.meta.env.VITE_QUESTION_NOTE

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support Text-to-Speech.");
    }
  };

  return mockInterviewQuestion && (
    <div className="p-4 border rounded-lg my-10 shadow-sm bg-white dark:bg-gray-800">
      {/* Question Nav */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {mockInterviewQuestion.map((_, index) => (
          <button
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center transition-all
              ${activeQuestionIndex === index
                ? "bg-blue-800 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
          >
            Question #{index + 1}
          </button>
        ))}
      </div>

      {/* Active Question */}
      <div className="my-6 flex items-start justify-between gap-4">
        <h2 className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-100">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
        />
      </div>

      {/* Note Section */}
      <div className="border rounded-lg p-5 bg-blue-100 dark:bg-blue-900 mt-10">
        <div className="flex items-center gap-2 mb-2 text-blue-900 dark:text-blue-100">
          <Lightbulb className="w-5 h-5" />
          <strong>Note:</strong>
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          {import.meta.env.VITE_QUESTION_NOTE || "Be concise and explain your approach clearly."}
        </p>
      </div>
    </div>
  );
}

export default QuestionsSection;
