import IconCircularSaw from "@/components/svg/IconCircularSaw";
import IconFacebook from "@/components/svg/IconFacebook";
import IconLinkedin from "@/components/svg/IconLinkedin";
import IconTwitter from "@/components/svg/IconTwitter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BoxesIcon } from "lucide-react";



export default function FooterSection() {
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
   <footer className="border-primary-400/30 border-t"> 
     <div className="  mx-auto  w-full  px-4 py-5  lg:w-9/12  ">
      <div className=" flex flex-col items-center  justify-center sm:mx-auto sm:text-center">
        <div className=" text-primary-50 flex items-center gap-1">
          <BoxesIcon  />
          <span className="max-w-lg text-4xl">saasgain</span>
        </div>
        <p className="text-primary-100 mt-2 max-w-2xl text-[15px] leading-relaxed tracking-wider">Take your business online with MeroEcommerce’s personalized e-commerce solutions. We offer custom designs, social media integration, SEO, payment gateways, sales reports, mobile-friendly designs, automated inventory management and comprehensive admin panels.</p>
      </div>
      <ul className="mt-8 items-center justify-center space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li
            key={idx}
            className=" text-primary-200 hover:text-primary-100 text-sm">
            <Link
            href="/"
           >
              <span className=" hidden sm:block">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="text-primary-200 mt-4 text-sm sm:mt-0">&copy; 2024 saasgain , all rights reserved.</div>
        <div className="mt-6">
          <div className="mt-2 flex space-x-2">
            <Button
              size="icon"
              className=" transition-all duration-300 ease-in-out hover:-translate-y-1  ">
              <IconFacebook className="size-4" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button
              size="icon"
              className=" transition-all duration-300 ease-in-out hover:-translate-y-1  ">
              <IconTwitter className="size-4" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button
              size="icon"
              className=" transition-all duration-300 ease-in-out hover:-translate-y-1  ">
              <IconLinkedin className="size-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
   </footer>
  );
}
