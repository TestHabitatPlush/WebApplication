import React from "react";
import Navbar from "../navbar/Navbar";
<<<<<<< HEAD
import Footer from "../Footer/Footer";
=======
import Footer from "../footer/Footer";
>>>>>>> c6c1dfd5fcce2b989ccff079b263f58e51b5cc70
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
