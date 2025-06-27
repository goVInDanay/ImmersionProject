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

function StudentDashboard({ rollNumber }) {
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  function handleClick(){
    navigate('/dashboard/questions')
  }
  useEffect(() => {
    const fetchInterview = async () => {
      setTimeout(() => {
        const mockInterview = {
          topics: "DBMS, OOP, OS",
          questions: 5,
          time: "20 minutes",
        };
        setInterview(mockInterview);
        setLoading(false);
      }, 1000);
    };

    fetchInterview();
  }, [rollNumber]);

  if (loading) return <div className="p-6">Loading interview...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {rollNumber}</h1>

      {interview ? (
        <div className="grid grid-cols-1 md:grid-cols-5 my-5 p-10">
        <Dialog>
          <DialogTrigger asChild>
            <div className="grid grid-cols-1 md:grid-cols-5 my-5 p-10cursor-pointer bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-md transition">
              <p className="text-lg font-semibold text-blue-900">Interview Assigned</p>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Interview Details</DialogTitle>
            </DialogHeader>

            <div className="py-4 text-gray-800 space-y-2">
              <p><strong>Topics:</strong> {interview.topics}</p>
              <p><strong>Number of Questions:</strong> {interview.questions}</p>
              <p><strong>Time Assigned:</strong> {interview.time}</p>
            </div>

            <DialogFooter>
              <Button onClick={handleClick}>
                Start Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      ) : (
        <div className="text-gray-500">No interviews currently.</div>
      )}
    </div>
  );
}

export default StudentDashboard;
