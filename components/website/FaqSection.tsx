import SectionHeader from "./SectionHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section>
      <SectionHeader title="Frequently Asked Question" />
      <div className="   mx-auto">
        {faqsList.map((item, idx) => (
          <Accordion
            type="single"
            collapsible
            className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

const faqsList = [
  {
    q: "What does MeroEcommerce offer?",
    a: "MeroEcommerce specializes in creating customized e-commerce solutions tailored to meet your specific business requirements and preferences.",
  },

  {
    q: "Can I customize the chosen template?",
    a: "Yes, we offer redesign services to tailor the chosen template according to your specific requirements and preferences, ensuring a unique look for your online store.",
  },

  {
    q: "How does the customization process work?",
    a: "We start by understanding your needs. Our team then designs and develops an e-commerce solution that aligns perfectly with your business goals and user expectations.",
  },

  {
    q: "Can I request specific features for my e-commerce platform?",
    a: "Absolutely! We prioritize your requirements. Whether it's advanced functionalities, unique design elements, or specific integrations, we tailor the solution to match your vision.",
  },

  {
    q: "How long does it take to develop a custom e-commerce solution?",
    a: "Development timelines vary based on project scope and complexity. Normally it takes 4-6 weeks to complete the development process.",
  },

  {
    q: "What features are included in your e-commerce solutions?",
    a: "Our solutions include custom designs, social media integration, SEO optimization, Google Analytics integration, payment gateway integration, detailed sales reports, and mobile-friendly designs.",
  },
  {
    q: "Is there support available after the integration?",
    a: "Yes, we provide ongoing support to ensure your e-commerce platform runs smoothly. Our team is available to assist with any issues or updates you may need.",
  },
  {
    q: "What is the cost of your e-commerce solutions?",
    a: "The cost varies based on the template selected and the extent of customizations required. Please contact us for a detailed quote tailored to your business needs.",
  },

  {
    q: "How do I get started with MeroEcommerce?",
    a: "Begin by contacting us with your project requirements. Our team will guide you through the process, from initial consultation to the successful launch of your customized e-commerce solution.",
  },
];
