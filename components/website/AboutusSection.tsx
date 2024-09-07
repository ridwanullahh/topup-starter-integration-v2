import SectionHeader from "./SectionHeader";

export async function AboutusSection() {
  return (
    <section
      id="about"
      className="flex flex-col items-center">
      <SectionHeader title="Who we are ?" />
      <p className=" text-primary-100 text-center text-lg  leading-relaxed  tracking-wide lg:text-4xl lg:leading-relaxed">At MeroEcommerce, we specialize in crafting personalized e-commerce solutions designed specifically for your business. Working closely with you, we develop custom online stores that capture your brand essence and meet your unique requirements. Our mission is to empower your business with intuitive, user-friendly platforms that not only drive growth but also foster meaningful customer interactions. Trust MeroEcommerce to deliver tailored solutions that elevate your online presence and help you achieve your business goals with ease.</p>
    </section>
  );
}
