
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default async function TrustedBySection() {
  return (
    <div
      className="">
      <SectionHeader title="Who are using Midsaw" />
      <div className=" grid grid-cols-1 gap-8  md:grid-cols-2">
        {trustedbys.map((item, idx) => (
          <div key={idx}>
            <div className=" border-primary-400/60 overflow-hidden rounded-md border  ">
              <Image
                src={item.banner}
                alt={item.name}
                width={700}
                height={700}
              />
            </div>
            <Link href={"/"}>
            <h1 className="mt-2 flex   items-center gap-2 text-xl font-bold">{item.name} <ExternalLink  size={20} /> </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const trustedbys = [
  {
    name: "Example Company",
    banner: "https://res.cloudinary.com/dubzpy7hn/image/upload/v1721241314/ecommerce-saas/trusted-by/miniture_pkk3go.png",
    href: "https://example.com/",
  },

  {
    name: "Example Company",
    banner: "https://res.cloudinary.com/dubzpy7hn/image/upload/v1721241314/ecommerce-saas/trusted-by/miniture_pkk3go.png",
     href: "https://example.com/",
  },

  {
    name: "Example Company",
    banner: "https://res.cloudinary.com/dubzpy7hn/image/upload/v1721241314/ecommerce-saas/trusted-by/miniture_pkk3go.png",
     href: "https://example.com/",
  },

  {
    name: "Example Company",
    banner: "https://res.cloudinary.com/dubzpy7hn/image/upload/v1721241314/ecommerce-saas/trusted-by/miniture_pkk3go.png",
     href: "https://example.com/",
  },

  {
    name: "Example Company",
    banner: "https://res.cloudinary.com/dubzpy7hn/image/upload/v1721241314/ecommerce-saas/trusted-by/miniture_pkk3go.png",
     href: "https://example.com/",
  },

  {
    name: "Example Company",
    banner: "https://res.cloudinary.com/dubzpy7hn/image/upload/v1721241314/ecommerce-saas/trusted-by/miniture_pkk3go.png",
     href: "https://example.com/",
  },
];
