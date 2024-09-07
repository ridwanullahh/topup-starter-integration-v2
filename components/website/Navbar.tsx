"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BoxesIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Icons } from "../shared/icons";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "@/components/ModeToggle";
import { ModalContext } from "../modals/providers";

type Props = {
  children?: React.ReactNode;
};

export default function Navbar({}: Props) {
  const { data: session, status } = useSession();
  console.log("🚀 ~ Navbar ~ status:", status);
  console.log("🚀 ~ Navbar ~ session:", session);
  const { setShowSignInModal } = useContext(ModalContext);

  return (
    <header className=" relative z-50 flex w-full items-center justify-center">
      <div className="text-primary-50 border-primary-400/60 fixed top-4 mx-auto flex w-11/12 items-center justify-between rounded-lg border bg-zinc-50 px-4 py-2 text-[14px] dark:bg-zinc-950 sm:w-9/12 md:w-7/12  lg:w-7/12 xl:w-5/12">
        <Link href="/">
          <div className=" flex items-center gap-1">
            <BoxesIcon fontSize={30} />
            <span className=" text-lg">saasgain</span>
          </div>
        </Link>

       <div className=" flex items-center gap-4">
       {navitems.map((item, index) => (
          <Link
            href={item.href}
            key={index}>
            <span className=" ">{item.name}</span>
          </Link>
        ))}

        <ModeToggle />

        {session ? (
          <Link
            href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
            className="">
            <Button
              className="gap-2 px-5"
              variant="default"
              size="sm">
              <span>Dashboard</span>
            </Button>
          </Link>
        ) : status === "unauthenticated" ? (
          <Button
            className="hidden gap-2 px-5 md:flex"
            variant="default"
            size="sm"

            onClick={() => setShowSignInModal(true)}
          >
            <span>Sign In</span>
            <Icons.arrowRight className="size-4" />
          </Button>
        ) : (
          <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
        )}
       </div>

      </div>
    </header>
  );
}

const navitems = [{ name: "Pricing", href: "/pricing" },{ name: "Login", href: "/login" }];
