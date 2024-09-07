
import React from "react";
import { Button } from "@/components/ui/button";
import MobileSheet from "./MobileSheet";

import Link from "next/link";
import { BoxesIcon } from "lucide-react";
type Props = {};

export default function Header({}: Props) {
  return (
    <header className=" relative z-50 flex w-full items-center justify-center">
      <div className="text-primary-50 bg-primary-950/95 border-primary-400/60 fixed top-4 mx-auto flex w-11/12 items-center justify-between rounded-2xl border px-4 py-2 text-[14px] sm:w-9/12 md:w-7/12  lg:w-7/12 xl:w-5/12">
        <Link
        href={"/"}
      >
          <div className=" flex items-center gap-1">
            <BoxesIcon fontSize={30} />
            <span className=" text-lg">Vyaparix</span>
          </div>
        </Link>

        <Link
              href={"/"}
        >
          <span className=" hidden lg:block">About</span>
        </Link>

        <Link
            href={"/"}>
          <span className=" hidden lg:block">Trusted By</span>
        </Link>

        <Link
           href={"/"}>
          <span className=" hidden lg:block">Features</span>
        </Link>

       

        <Link
             href={"/"}>
          <span className=" hidden lg:block">Team</span>
        </Link>

        <Link
          href={"/"}>
          <Button
            variant="outline"
            className="bg-primary-50 hover:bg-primary-50/80 text-primary-950 hidden lg:block">
            Make a call
          </Button>
        </Link>

     
        <MobileSheet />
      </div>
    </header>
  );
}



