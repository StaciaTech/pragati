"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROLES, type Role } from "@/lib/constants";
import {
  MOCK_INNOVATOR_USER,
  MOCK_TTCS,
  MOCK_PRINCIPAL_USERS,
} from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const getDashboardLink = (role: Role) => {
  switch (role) {
    case ROLES.INNOVATOR:
      return `/dashboard?role=${role}`;
    case ROLES.PRINCIPAL:
      return `/dashboard/principal?role=${role}`;
    case ROLES.COORDINATOR:
      return `/dashboard/coordinator?role=${role}`;
    case ROLES.SUPER_ADMIN:
      return `/dashboard/admin?role=${role}`;
    default:
      return `/dashboard?role=${ROLES.INNOVATOR}`;
  }
};

export function LoginForm() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });
      console.log(res);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast({
          title: "Login Successful",
          description: `Welcome! Redirecting to the ${res.data.user.role} dashboard.`,
        });
        router.push(getDashboardLink(res.data.user.role));
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Server error. Please try again.",
      });
    }

    // let userRole: Role | null = null;

    // if (email === "admin@pragati.ai") {
    //   userRole = ROLES.SUPER_ADMIN;
    // } else if (MOCK_PRINCIPAL_USERS.some((p) => p.email === email)) {
    //   userRole = ROLES.PRINCIPAL;
    // } else if (MOCK_TTCS.some((t) => t.email === email)) {
    //   userRole = ROLES.COORDINATOR;
    // } else if (
    //   MOCK_INNOVATOR_USER.email.toLowerCase() === email.toLowerCase()
    // ) {
    //   userRole = ROLES.INNOVATOR;
    // }

    // if (userRole) {
    //   toast({
    //     title: "Login Successful",
    //     description: `Welcome! Redirecting to the ${userRole} dashboard.`,
    //   });
    //   router.push(getDashboardLink(userRole));
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Login Failed",
    //     description: "Invalid credentials. Please try again.",
    //   });
    // }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@pragati.ai"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <span>Login</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
