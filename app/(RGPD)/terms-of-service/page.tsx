"use client"

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RgpdPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleRefuseClick = () => {
    setShowAlert(true);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Politique de Confidentialité et Consentement à l&apos;Utilisation des Données</h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), nous attachons une importance particulière à la protection de vos données personnelles. Ce document vise à vous informer sur la manière dont nous collectons, utilisons et protégeons vos informations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">2. Responsable du Traitement</h2>
          <p>Le responsable du traitement des données est [Nom de l&apos;entreprise], situé à [Adresse], joignable à [Email de contact].</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">3. Données Collectées</h2>
          <ul className="list-disc pl-5">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Adresse IP</li>
            <li>Informations de navigation et cookies</li>
            <li>Toute autre information nécessaire au service demandé</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">4. Finalité du Traitement</h2>
          <p>Vos données sont collectées pour les finalités suivantes :</p>
          <ul className="list-disc pl-5">
            <li>Gestion de votre compte utilisateur</li>
            <li>Amélioration de nos services</li>
            <li>Envoi de communications marketing (avec votre consentement)</li>
            <li>Respect des obligations légales et réglementaires</li>
            <li>Sécurisation de notre plateforme et prévention des fraudes</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">5. Base Légale du Traitement</h2>
          <p>Le traitement de vos données repose sur votre consentement explicite, l&apos;exécution d&apos;un contrat, le respect d&apos;une obligation légale ou encore notre intérêt légitime.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">6. Durée de Conservation des Données</h2>
          <p>Vos données sont conservées pendant une durée conforme aux exigences légales en vigueur, soit [indiquer la durée exacte ou les critères de conservation].</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">7. Partage des Données</h2>
          <p>Nous ne partageons pas vos données avec des tiers, sauf dans les cas suivants :</p>
          <ul className="list-disc pl-5">
            <li>Lorsque cela est nécessaire à la fourniture du service (partenaires techniques, hébergeurs...)</li>
            <li>Pour répondre à une obligation légale</li>
            <li>Avec votre consentement explicite</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">8. Vos Droits</h2>
          <p>Vous disposez des droits suivants sur vos données :</p>
          <ul className="list-disc pl-5">
            <li>Accès, rectification, suppression</li>
            <li>Opposition et limitation du traitement</li>
            <li>Portabilité des données</li>
            <li>Retrait du consentement à tout moment</li>
            <li>Dépôt d&apos;une plainte auprès de la CNIL (https://www.cnil.fr)</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à [Email de contact].</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">9. Sécurité des Données</h2>
          <p>Nous mettons en place des mesures techniques et organisationnelles pour garantir la sécurité de vos données et prévenir tout accès non autorisé.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">10. Modification de la Politique</h2>
          <p>Nous nous réservons le droit de modifier cette politique. Toute modification sera communiquée via nos canaux habituels.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">11. Confirmation du Consentement</h2>
          <p>En cochant la case correspondante ou en cliquant sur &quot;J&apos;accepte&quot;, vous confirmez avoir pris connaissance de cette politique et acceptez l&apos;utilisation de vos données selon les conditions précisées.</p>
        </section>

        <section className="mt-8">
          <p>En cochant la case correspondante ou en cliquant sur &quot;J&apos;accepte&quot;, vous confirmez avoir pris connaissance de cette politique et acceptez l&apos;utilisation de vos données.</p>
          <div className="flex justify-center space-x-4 mt-5">
            <Button><Link href="/profile">
              J&apos;accepte
            </Link></Button>
            
            <Button onClick={handleRefuseClick} className="bg-red-500 hover:bg-red-600">
              Je refuse
            </Button>
          </div>
        </section>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <br />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600"><a href="/profile">Continue</a></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RgpdPage;