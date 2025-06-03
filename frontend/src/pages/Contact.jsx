
import React from "react";

const ContactPage = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 via-green-50 to-green-200 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-8">
          Get in Touch
        </h2>
        <p className="text-center text-lg text-gray-700 mb-12">
          We’d love to hear from you! Feel free to reach out with any questions or feedback.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Contact Us
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details and Map */}
          <div className="flex flex-col justify-between space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-green-600"></i>
                  <span className="text-gray-700">123 Eco Street, Green City</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fas fa-phone-alt text-green-600"></i>
                  <span className="text-gray-700">+1 234 567 890</span>
                </li>
                <li className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-green-600"></i>
                  <span className="text-gray-700">contact@eco-friendly.com</span>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508618!2d144.9537354153184!3d-37.81720997975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772e9b5f909e0!2s123%20Eco%20Street!5e0!3m2!1sen!2sus!4v1691350488729!5m2!1sen!2sus"
                className="w-full h-64 border-none"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
