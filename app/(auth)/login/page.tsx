import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { UserAuthForm } from "@/components/forms/user-auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.",
};

export default function LoginPage() {
  return (
    <div className=" grid h-screen grid-cols-1 overflow-y-hidden px-4 md:grid-cols-2 ">
      <div className=" flex items-center justify-center">
        <Card className="w-full md:w-[400px]">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Enter your email to sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <UserAuthForm />
            </Suspense>
          </CardContent>
          <CardFooter className="">
            <Link
              href="/register"
              className="mx-auto">
              <Button
                variant={"link"}
                className=" ">
                Don&apos;t have an account? Sign Up
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="2000"
          height="2000"
          className="size-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
