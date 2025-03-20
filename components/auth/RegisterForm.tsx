"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Le nom d'utilisateur doit comporter au moins 3 caractères" }),
    firstname: z.string().min(1, { message: "Le prénom est requis" }),
    name: z.string().min(1, { message: "Le nom de famille est requis" }),
    email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide" }),
    password: z
      .string()
      .min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" }),
    confirmPassword: z
      .string()
      .min(6, { message: "La confirmation du mot de passe doit comporter au moins 6 caractères" }),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Vous devez accepter les termes et conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const { register: registerUser, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { confirmPassword, ...registerData } = data;
    await registerUser({ ...registerData, role: "user" });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">S'inscrire</CardTitle>
          <CardDescription>
            Remplissez les informations ci-dessous pour créer votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Nom d'utilisateur *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="john.doe"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstname">Prénom *</Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="John"
                  {...register("firstname")}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nom de famille *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Doe"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consent"
                  {...register("consent")}
                  className="mr-2"
                />
                <Label htmlFor="consent">
                  J'accepte les termes et conditions *
                </Label>
              </div>
              {errors.consent && (
                <p className="text-red-500 text-sm">{errors.consent.message}</p>
              )}
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Chargement..." : "S'inscrire"}
              </Button>
              {error && (
                <p className="text-red-500 text-sm">
                  Une erreur est survenue : {error}
                </p>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte ?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Connectez-vous
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        En cliquant sur s'inscrire, vous acceptez nos{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          termes et conditions
        </Link>{" "}
        et notre{" "}
        <Link href="#" className="underline underline-offset-4 hover:text-primary">
          politique de confidentialité
        </Link>.
      </div>
    </div>
  );
}
