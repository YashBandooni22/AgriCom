import React from "react";
import soil from  "../assets/soil.png";
const AboutPage = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 via-green-50 to-green-200 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-8">
          About Us
        </h2>
        <p className="text-center text-lg text-gray-700 mb-12">
          We are passionate about creating a sustainable future. Learn more
          about our mission, values, and the journey that brought us here.
        </p>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src={soil} alt="" />
          </div>

          {/* Text Section */}
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-6">
              At EcoShop, our mission is to provide eco-friendly products that
              empower people to live a sustainable lifestyle. We believe small
              changes can make a big difference in protecting the planet.
            </p>
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Our Values
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Commitment to Sustainability</li>
              <li>High-Quality, Eco-Friendly Products</li>
              <li>Community Engagement and Awareness</li>
              <li>Transparency and Ethical Practices</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-green-800 mb-4">
            Join Us in Making a Difference
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Become a part of the movement towards a greener future. Every
            product you buy supports sustainable living and helps reduce
            environmental impact.
          </p>
          <a
            href="#shop"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;