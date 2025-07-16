
import React from 'react'
import { Button } from '../../../@/components/ui/button'
import Link from 'next/link'

function InterviewItemCard({ interview }) {
  return (
    <div className='border shadow-sm rounded-lg p-3 max-w-full'>   
        <h2 className='font-bold text-blue-500'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At: {interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5 w-full'>
          <Link href={'/dashboard/interview/' + interview?.mockId + '/feedback'} className='w-40'>
            <Button size='sm' variant='outline' className='w-full flex-shrink-0'> Feedback </Button>
          </Link>
          <Link href={'/dashboard/interview/' + interview?.mockId + '/start'} className='w-40'>
            <Button size='sm' className='bg-blue-800 w-full flex-shrink-0'> Start </Button>
          </Link>
        </div>
    </div>
  )
}

export default InterviewItemCard
