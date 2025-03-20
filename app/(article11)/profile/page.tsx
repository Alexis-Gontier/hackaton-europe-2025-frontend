"use client"

import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const europeanCountries = [
  { name: "Allemagne", flag: "/flags/germany.png" },
  { name: "Autriche", flag: "/flags/austria.png" },
  { name: "Belgique", flag: "/flags/belgium.png" },
  { name: "Bulgarie", flag: "/flags/bulgaria.png" },
  { name: "Chypre", flag: "/flags/cyprus.png" },
  { name: "Croatie", flag: "/flags/croatia.png" },
  { name: "Danemark", flag: "/flags/denmark.png" },
  { name: "Espagne", flag: "/flags/spain.png" },
  { name: "Estonie", flag: "/flags/estonia.png" },
  { name: "Finlande", flag: "/flags/finland.png" },
  { name: "France", flag: "/flags/france.png" },
  { name: "Grèce", flag: "/flags/greece.png" },
  { name: "Hongrie", flag: "/flags/hungary.png" },
  { name: "Irlande", flag: "/flags/ireland.png" },
  { name: "Italie", flag: "/flags/italy.png" },
  { name: "Lettonie", flag: "/flags/latvia.png" },
  { name: "Lituanie", flag: "/flags/lithuania.png" },
  { name: "Luxembourg", flag: "/flags/luxembourg.png" },
  { name: "Malte", flag: "/flags/malta.png" },
  { name: "Pays-Bas", flag: "/flags/netherlands.png" },
  { name: "Pologne", flag: "/flags/poland.png" },
  { name: "Portugal", flag: "/flags/portugal.png" },
  { name: "République tchèque", flag: "/flags/czechia.png" },
  { name: "Roumanie", flag: "/flags/romania.png" },
  { name: "Slovaquie", flag: "/flags/slovakia.png" },
  { name: "Slovénie", flag: "/flags/slovenia.png" },
  { name: "Suède", flag: "/flags/sweden.png" },
  { name: "Albanie", flag: "/flags/albania.png" },
  { name: "Andorre", flag: "/flags/andorra.png" },
  { name: "Arménie", flag: "/flags/armenia.png" },
  { name: "Azerbaïdjan", flag: "/flags/azerbaidjan.png" },
  { name: "Biélorussie", flag: "/flags/belarus.png" },
  { name: "Bosnie-Herzégovine", flag: "/flags/bosnia-and-herzegovina.png" },
  { name: "Géorgie", flag: "/flags/georgia.png" },
  { name: "Islande", flag: "/flags/iceland.png" },
  { name: "Kazakhstan", flag: "/flags/kazakhstan.png" },
  { name: "Kosovo", flag: "/flags/kosovo.png" },
  { name: "Liechtenstein", flag: "/flags/liechtenstein.png" },
  { name: "Macédoine du Nord", flag: "/flags/north macedonia.png" },
  { name: "Moldavie", flag: "/flags/moldova.png" },
  { name: "Monaco", flag: "/flags/monaco.png" },
  { name: "Monténégro", flag: "/flags/montenegro.png" },
  { name: "Norvège", flag: "/flags/norway.png" },
  { name: "Russie", flag: "/flags/russia.png" },
  { name: "Saint-Marin", flag: "/flags/san marino.png" },
  { name: "Serbie", flag: "/flags/serbia.png" },
  { name: "Suisse", flag: "/flags/switzerland.png" },
  { name: "Turquie", flag: "/flags/turkey.png" },
  { name: "Ukraine", flag: "/flags/ukraine.png" },
  { name: "Vatican", flag: "/flags/vatican city.png" },
]

export default function AccordionAccount() {
  const [showAlert, setShowAlert] = useState(false);

  const handleAccordionChange = (value: string) => {
    if (value === "item-6") {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  return (
    <div className="mt-8">
      <Accordion type="single" collapsible className="w-full" onValueChange={handleAccordionChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Nationality</AccordionTrigger>
          <AccordionContent>
            <Select defaultValue="Allemagne">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>European Countries</SelectLabel>
                  {europeanCountries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      <div className="flex items-center">
                        <img src={country.flag} alt={country.name} className="w-6 h-4 mr-2" />
                        {country.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Password</AccordionTrigger>
          <AccordionContent>
            <Input type="password" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Email</AccordionTrigger>
          <AccordionContent>
            <Input type="mail" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Date of Birth</AccordionTrigger>
          <AccordionContent>
            <Input type="date" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>ID Information</AccordionTrigger>
          <AccordionContent>
            <Input type="text" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Privacy</AccordionTrigger>
          <AccordionContent>
            {showAlert && (
              <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
                      <br />
                      <a href="terms-of-service" rel="noopener noreferrer" className="text-blue-500 underline">
                        View GDPR Policy
                      </a>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}