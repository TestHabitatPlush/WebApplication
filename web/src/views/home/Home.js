import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import FAQ from "./FAQ";
import HeroSection from "./HeroSection";
import WhyHabitatPlush from "./WhyHabitatPlush";
import HabitatPlushERP from "./HabitatPlushERP";
import HabitatPlushGateApp from "./HabitatPlushGateApp";
import ContactForm from "./ContactForm";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-100">
        <HeroSection />
      </section>
      <WhyHabitatPlush />
      <HabitatPlushERP />
      <HabitatPlushGateApp />
   
      {/* FAQ Section */}
      <section className="py-10 bg-gray-100">
        <FAQ />
      </section>
      {/* Contact Form */}
      <ContactForm/>
 
      <Footer />
    </div>
  );
};

export default Home;
