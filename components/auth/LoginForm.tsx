"use client";

import { useState } from "react";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginData.username, loginData.password);
  };

  useEffect(() => {
    if (error) {
      setLoginData((prev) => ({ ...prev, password: "" }));
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your name user below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                    id="email"
                    type="text"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    placeholder="username"
                    required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    placeholder="password"
                    onChange={handleLoginChange}
                    required
                />
                    <Link href="/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot password?
                    </Link>
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                    Register
                </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <Link href={"#"}>Terms of Service</Link>{" "}
        and <Link href={"#"}>Privacy Policy</Link>
      </div>
    </div>
  )
}