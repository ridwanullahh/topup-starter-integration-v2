import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IocnVideoPlay } from "../svg/IocnVideoPlay";
import { ChevronRight } from "lucide-react";
type Props = {};

export default async function Hero({}: Props) {
  return (
    <div
      className="  flex min-h-screen flex-col justify-around pt-14 ">
      <main className="  flex flex-col items-center gap-8">
        <Button className=" border-primary-400/60 flex items-center gap-4  rounded-full border bg-transparent text-sm text-orange-400 duration-300 hover:text-zinc-50">
          Announcing Early Adopters Plan
          <ChevronRight
          size={18}
          />
        </Button>
        <p className=" w-full text-center text-4xl  text-zinc-900 dark:text-zinc-50  md:text-6xl lg:w-9/12">Take your business online with personalized e-commerce solutions</p>
        <p className=" text-center text-zinc-500  dark:text-zinc-400 md:w-7/12">We offer custom designs, social media integration, SEO, payment gateways, sales reports, mobile-friendly designs, automated inventory management and comprehensive admin panels.</p>
        <div className=" flex items-center space-x-4">
          <Button className=" py-6 ">Live Demo (Testing)</Button>
          <Link
            target="_blank"
            href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
            <Button
              variant="outline"
              className=" py-6 ">
              <IocnVideoPlay />
              Watch Video
            </Button>
          </Link>
        </div>
      </main>

      <div className=" mt-20">
        <video
          autoPlay
          muted
          playsInline
          loop>
          <source src="https://framerusercontent.com/assets/tYa2OLCojK0ocbl96Mtx0YTg2k.mp4" />
          Your browser does not support the video tag...
        </video>
      </div>
    </div>
  );
}








