import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Input } from "@/components/ui/input"

export default function AccordionAccount() {
  return (
    <div className="rounded-3xl border-2 border-black p-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Nationality</AccordionTrigger>
          <AccordionContent>
            <Input className='rounded-full border-black'/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Date of Birth</AccordionTrigger>
          <AccordionContent>
            <Input className='rounded-full border-black'/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>ID Information</AccordionTrigger>
          <AccordionContent>
            <Input className='rounded-full border-black'/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Privacy</AccordionTrigger>
          <AccordionContent>
            <Input className='rounded-full border-black'/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}