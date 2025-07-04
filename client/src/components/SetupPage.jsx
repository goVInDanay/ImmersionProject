import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SetupPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { interview, userEmail, userName } = location.state || {};

  useEffect(() => {
    if (!interview) {
      navigate("/dashboard");
    }
  }, [interview]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interview Setup</h1>
      <p><strong>User:</strong> {userName} ({userEmail})</p>
      <p><strong>Role:</strong> {interview?.role}</p>
      <p><strong>Experience:</strong> {interview?.experience} years</p>
      <p><strong>Tech Stack:</strong> {interview?.techStack}</p>
      <p><strong>Topics:</strong> {interview?.topics}</p>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/dashboard/questions", { state: { interview } })}
      >
        Proceed to Questions
      </button>
    </div>
  );
}

export default SetupPage;
