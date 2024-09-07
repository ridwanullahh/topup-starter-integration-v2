import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import Link from "next/link";
import IconFacebook from "@/components/svg/IconFacebook";
import IconLinkedin from "@/components/svg/IconLinkedin";
import IconTwitter from "@/components/svg/IconTwitter";
import IconCircularSaw from "@/components/svg/IconCircularSaw";
import { Menu } from "lucide-react";


export default function MobileSheet() {
  const footerNavs = [
    {
      href: "#hero",
      name: "Home",
    },
    {
      href: "#trusted-by",
      name: "Trusted By",
    },

    {
      href: "#features",
      name: "Features",
    },

    {
      href: "#about",
      name: "About",
    },

    {
      href: "#team",
      name: "Team",
    },

    {
      href: "#contact",
      name: "Contact",
    },
  ];
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button
          variant={"default"}
          className=" block  lg:hidden">
          <Menu fontSize={22} />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-primary-400/60 border-l">
        <SheetHeader>
          <Link
                  href={"/"}>
            <div className=" text-primary-50 border-primary-400/60 flex items-center justify-center gap-1 rounded-2xl border p-2">
              <IconCircularSaw fontSize={30} />
              <span className=" text-lg">Midsaw</span>
            </div>
          </Link>
        </SheetHeader>
        <div className=" mt-8 flex flex-col gap-6 ">
          {footerNavs.map((item, idx) => (
            <Link
              key={idx}
              href={"/"}>
              <SheetClose asChild>
              <span className=" text-primary-200 hover:text-primary-100 active:text-primary-50 text-lg transition-all duration-300 ease-in-out hover:translate-x-1 ">{item.name}</span>
              </SheetClose>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex space-x-4 ">
          <Button
            size="icon"
            className=" text-primary-200 hover:text-primary-100 transition-all duration-300 ease-in-out hover:-translate-y-1 ">
            <IconFacebook className="size-5" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button
            size="icon"
            className=" text-primary-200 hover:text-primary-100 transition-all duration-300 ease-in-out hover:-translate-y-1 ">
            <IconTwitter className="size-5" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button
            size="icon"
            className=" text-primary-200 hover:text-primary-100 transition-all duration-300 ease-in-out hover:-translate-y-1 ">
            <IconLinkedin className="size-5" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
