import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { UserAuthForm } from "@/components/forms/user-auth-form";

export const metadata: Metadata = {
  title: "Register",
  description: "A register page with two columns. The first column has the register form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.",
};

export default function RegisterPage() {
  return (
    <div className=" grid h-screen grid-cols-1 overflow-y-hidden px-4 md:grid-cols-2 ">
      <div className=" flex items-center justify-center">
        <Card className="w-full md:w-[400px]">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <UserAuthForm type="register" />
            </Suspense>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Link
              href="/login"
              className="mx-auto">
              <Button variant={"link"}>Already have an account? Log In</Button>
            </Link>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-brand underline underline-offset-4">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-brand underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
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
