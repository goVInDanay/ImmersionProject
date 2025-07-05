import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Interviews() {
  const [rollNumber, setRollNumber] = useState("");
  const [topics, setTopics] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [techStack, setTechStack] = useState("");
  const [studentEmails, setStudentEmails] = useState("");

  const handleSubmit = async () => {
    const payload = {
      rollNumber,
      topics,
      role,
      experience: parseInt(experience),
      techStack,
      studentEmails: studentEmails.split(",").map((email) => email.trim()),
    };

    try {
      const res = await fetch("http://localhost:5000/api/interview/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Interview created and assigned successfully!");
        // Clear all fields
        setRollNumber("");
        setTopics("");
        setRole("");
        setExperience("");
        setTechStack("");
        setStudentEmails("");
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("❌ Server not reachable");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="grid grid-cols-1 md:grid-cols-5 my-5 p-10">
          <Button className="p-10 border rounded-md border-neutral-800 bg-secondary hover:scale-105 hover:bg-secondary cursor-pointer transition-all text-center text-black">
            Add New
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Interview</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="roll">Roll Number</Label>
            <Input
              id="roll"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter student roll number"
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="topics">Topics</Label>
            <Textarea
              id="topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="e.g. DBMS, OOP, Operating System"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Job Role</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Backend Developer"
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience">Experience (years)</Label>
            <Input
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 2"
              type="number"
              min="0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <Textarea
              id="techStack"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="e.g. Node.js, React, MongoDB"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="studentEmails">Student Emails</Label>
            <Textarea
              id="studentEmails"
              value={studentEmails}
              onChange={(e) => setStudentEmails(e.target.value)}
              placeholder="Enter comma-separated emails (e.g. john@example.com, jane@example.com)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Interview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Interviews;
