import React from 'react'
import { Input } from "@/components/ui/input"


export default function page() {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder='Search'
        className='rounded-full border-1 border-black'
      />
    </div>
  )
}
