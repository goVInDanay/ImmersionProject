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
  const handleSubmit = () => {
    console.log("Submitting:", { rollNumber, topics });
    setRollNumber("");
    setTopics("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="grid grid-cols-1 md:grid-cols-5 my-5 p-10">
          <Button className="p-10 border rounded-md bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all text-center">Add New</Button>
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
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save Interview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default Interviews    