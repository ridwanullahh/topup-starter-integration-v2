import FooterSection from "@/components/website/FooterSection";
import Navbar from "@/components/website/Navbar";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className=" space-y-20">
      <Navbar />
        {children}
      <FooterSection/>
    </div>
  );
}
