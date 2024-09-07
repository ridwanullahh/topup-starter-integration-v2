import paymentgateway from "@/public/_static/bento/payment-gateway.jpg";
import dashboard from "@/public/_static/bento/dashbaord.png";
import googleanalytics from "@/public/_static/bento/google-analytics.jpg";
import seointegration from "@/public/_static/bento/seo-integration.webp";
import socialmediaIntegration from "@/public/_static/bento/socialmedia-integration.png";
import customizeddesign from "@/public/_static/bento/customized-design.webp";
import { AboutusSection } from "@/components/website/AboutusSection";
import ContactusSection from "@/components/website/ContactusSection";
import FaqSection from "@/components/website/FaqSection";
import Hero from "@/components/website/Hero";
import { ServicesSection } from "@/components/website/ServicesSection";
import TrustedBySection from "@/components/website/TrustedBySection";

export default async function Home() {
  return (
    <main className=" ">
      <div className="mx-auto w-full space-y-20 px-4 lg:w-9/12">
        <Hero />
        <AboutusSection />
        <TrustedBySection />
        <ServicesSection items={services} />
        <FaqSection />
        <ContactusSection />
      </div>
    </main>
  );
}

const services = [
  {
    heading: "Mobile & Web Responsive",
    shortDesc: "We ensure your website adjusts perfectly and responsively across all devices, providing a seamless user experience.",
    slug: "mobile-and-web-responsive",
    thumbnail: paymentgateway,
  },

  {
    heading: "Admin Panel and Sales Report",
    shortDesc: "We empower you to manage your online store effortlessly, offering tools for real-time sales tracking and detailed performance insights.",
    slug: "mobile-and-web-responsive",
    thumbnail: dashboard,
  },

  {
    heading: "Payment Gateway Integration",
    shortDesc: "We integrate secure payment gateways to ensure seamless and secure transactions for your online store.",
    slug: "mobile-and-web-responsive",
    thumbnail: paymentgateway,
  },
  {
    heading: "Google Analytics Integration",
    shortDesc: "We integrate Google Analytics to help you understand your website traffic and user behavior, enabling data-driven decisions.",
    slug: "mobile-and-web-responsive",
    thumbnail: googleanalytics,
  },

  {
    heading: "SEO Optimization",
    shortDesc: "We optimize your website for search engines to increase visibility and attract organic traffic, improving your online presence.",
    slug: "mobile-and-web-responsive",
    thumbnail: seointegration,
  },

  {
    heading: "Social Media Integration",
    shortDesc: "We integrate social media platforms to enhance engagement, broaden your audience reach, and strengthen your brand presence.",
    slug: "mobile-and-web-responsive",
    thumbnail: socialmediaIntegration,
  },

  {
    heading: "Customized Design",
    shortDesc: "We specialize in creating custom website designs that align with your brand identity and resonate with your target audience.",
    slug: "mobile-and-web-responsive",
    thumbnail: customizeddesign,
  },
];
