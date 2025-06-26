import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Navbar/>
      <div className="bg-gray-100 min-h-screen text-gray-900 font-sans">
        <section className="text-center py-12 bg-blue-600 text-white">
          <h1 className="text-4xl font-bold">Habitat Plush</h1>
          <p className="mt-4 text-lg">
            Nurture Communities for a Sustaining Tomorrow
          </p>
        </section>

        <section className="container mx-auto px-6 py-12 max-w-7xl">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            About Us
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to <strong>Habitat Plush</strong>! At Habitat Plush, we
            envision a future where communities thrive in harmony with the
            environment. Our mission is to empower society and stakeholders to
            build sustainable, efficient, and connected communities.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our team of passionate individuals, with expertise in technology,
            sustainability, and community development, came together to create a
            platform that addresses the unique needs of society management.
          </p>

          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-gray-700">
              Join the Habitat Plush family and build for the future!!!
            </p>
            <p className="mt-2 text-gray-700">
              Be a part of our journey towards creating sustainable communities.
              Explore our platform, and discover how Habitat Plush can help you
              build a better tomorrow.
            </p>
          </div>

          {/* Image */}
          <section className="mt-12 flex justify-center">
            <div className="relative w-full max-w-3xl h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/community.jpg" // Replace with your image path
                alt="Habitat Plush Community"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-12 text-center">
            <Link href="/contact">
              <p className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300">
                Get Involved Today
              </p>
            </Link>
          </section>
        </section>
      </div>
      <Footer/>
    </main>
  );
}
