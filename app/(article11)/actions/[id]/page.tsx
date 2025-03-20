"use client"

import React from 'react'
import Link from 'next/link'
import { CircleChevronLeft } from 'lucide-react'

export default function Page() {
  return (
    <div className='px-8'>
      <div className='mt-4 flex text-xl'>
        <Link href="/actions" className=''>
          <CircleChevronLeft className='h-7 w-6' />
        </Link>
        <p className='ml-1'>BACK</p>
      </div>

      <h1 className='font-bold mt-4'>EU Defense Spending Increase</h1>
      
      <h2 className='my-2'>You agreed on:</h2>
      <div className='rounded-full border-4 px-4 font-bold tracking-tighter border-green-300'>
        <p>EU member states should increase military spending</p>
      </div>

      <h2 className='my-2'>Your Compromise:</h2>
      <div className='rounded-4xl border-4 p-2 font-bold border-pink-500'>
        <p className='tracking-tighter'>
          A balanced approach to Europe reinforcing its military could involve 
          increasing defense capabilities while maintaining a strong diplomatic 
          focus. EU nations should boost defense cooperation, invest in modern 
          technology, and reduce dependency on external powers, but without 
          escalating tensions. A common EU defense strategy could enhance security 
          while ensuring spending remains efficient and does not undermine social 
          programs. Strengthening NATO collaboration alongside limited EU military 
          autonomy would provide security while avoiding unnecessary militarization.
        </p>
      </div>
    </div>
  );
}