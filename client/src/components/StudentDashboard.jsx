import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function StudentDashboard({ user }) {
  const navigate = useNavigate();
  const [assignedInterviews, setAssignedInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (interview) => {
    // Pass the interview data to /dashboard/setup page
    navigate("/dashboard/setup", {
      state: {
        interview,
        userEmail: user.email,
        userName: user.name,
      },
    });
  };

  useEffect(() => {
    const fetchAssignedInterviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/interview/assigned", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await res.json();
        setAssignedInterviews(data.interviews || []);
      } catch (err) {
        console.error("Failed to fetch interviews:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchAssignedInterviews();
    }
  }, [user?.email]);

  if (loading) return <div className="p-6">Loading interviews...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || user?.email}</h1>

      {assignedInterviews.length > 0 ? (
        assignedInterviews.map((interview, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-5 my-5 p-10">
            <Dialog>
              <DialogTrigger asChild>
                <div className="col-span-5 cursor-pointer bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-md transition">
                  <p className="text-lg font-semibold text-blue-900">Interview #{idx + 1}</p>
                </div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Interview Details</DialogTitle>
                </DialogHeader>

                <div className="py-4 text-gray-800 space-y-2">
                  <p><strong>Topics:</strong> {interview.topics}</p>
                  <p><strong>Role:</strong> {interview.role}</p>
                  <p><strong>Experience:</strong> {interview.experience} years</p>
                  <p><strong>Tech Stack:</strong> {interview.techStack}</p>
                  <p><strong>Roll No:</strong> {interview.rollNumber}</p>
                </div>

                <DialogFooter>
                  <Button onClick={() => handleClick(interview)}>
                    Start Interview
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No interviews currently assigned.</div>
      )}
    </div>
  );
}

export default StudentDashboard;
