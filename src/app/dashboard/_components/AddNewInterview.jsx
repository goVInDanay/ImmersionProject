'use client'
import { React, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../@/components/ui/dialog';
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LoaderCircleIcon } from 'lucide-react';
import { MockInterview } from '../../../utils/schema'
import {v4 as uuidv4} from 'uuid'
import {db} from '../../../utils/db'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonRespone] = useState();
  const {user} = useUser();
  const router = useRouter();
  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}. 
    Depending on Job Position, Job Description, and Years of Experience, generate 5 interview questions along with answers in JSON format. Answer should be of max 5 lines.
    The output should have a "questions" field (an array of objects) where each object contains "question" and "answer" fields.`;

    try {
      const chatSession = model.startChat({
        history: [],
        generationConfig: { temperature: 0.9 },
      });
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJSONResp = result.response.text(); 
      const match = MockJSONResp.match(/```json([\s\S]*?)```/);
      if (match) {
        MockJSONResp = match[1].trim(); 
      }
      setJsonRespone(MockJSONResp);
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp:MockJSONResp,
        jobPosition: jobPosition,
        jobDesc: jobDescription,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD/MM/YYYY')
      }).returning({mockId:MockInterview.mockId})
      console.log("id", resp[0].mockId)
      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0].mockId)
      }
    } catch (error) {
      console.error("Error generating interview questions:", error);
    }
    setLoading(false)
  };

  return (
    <div>
      <div className='p-10 border rounded-md bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us more about your job?</DialogTitle>
            <DialogDescription>
              Add details about your job position/role, job description, and years of experience.
            </DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <div className='mt-4 my-3'>
                  <label>Job Role / Job Position</label>
                  <Input placeholder="Ex. Full Stack Developer" required
                    onChange={(event) => setJobPosition(event.target.value)} />
                </div>
                <div className='my-3'>
                  <label>Job Description / Tech Stack</label>
                  <Textarea placeholder="Ex. React, Node JS, MongoDB" required
                    onChange={(event) => setJobDescription(event.target.value)} />
                </div>
                <div className='my-3'>
                  <label>Years of Experience</label>
                  <Input placeholder="Ex. 5" type='number' min={0} max={40} required
                    onChange={(event) => setJobExperience(event.target.value)} />
                </div>
              </div>
              <div className='flex gap-5 justify-end'>
                <Button type='submit' disabled={loading}>{
                loading?<><LoaderCircleIcon className='animate-spin'/>'Generating Questions'</>:'Start Interview'}
                </Button>
                <Button type='button' variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;