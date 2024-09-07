import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const ServicesSection = ({
  items,
}: {
  items: {
    heading: string;
    shortDesc: string;
    thumbnail?: any;
  }[];
}) => {


  
  return (
    <section>
      <SectionHeader title=" What you get with saasgain " />
      <div className={"grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3"}>
        {items.map((item, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{item.heading}</CardTitle>
              {/* <CardDescription>{item.shortDesc}</CardDescription> */}
            </CardHeader>
            <CardContent>
              <Image
                src={item.thumbnail || ""}
                alt={item.heading}
                width={400}
                height={400}
                className="obje rounded-md  md:h-52  "
              />
            </CardContent>
            <CardFooter>
              <p>{item.shortDesc}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
