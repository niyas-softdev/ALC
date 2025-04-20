import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5174/api/contact/submit", formData);
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSuccess("Failed to send message.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-pink-50 rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column - Info */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-4xl font-extrabold text-pink-700 mb-4">
            Get in Touch with ALC Jewelry
          </h2>
          <p className="text-gray-700 text-base mb-6">
            Whether you're looking for the perfect piece of jewelry or need help with an order, our team is here to assist you.
            ALC Jewelry crafts elegance for every occasion — reach out to us and we’ll make sure you sparkle.
          </p>

          <div className="space-y-4 text-gray-800">
            <div className="flex items-center gap-3">
              <Phone className="text-pink-600" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-pink-600" />
              <span>support@alcjewelry.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-pink-600" />
              <span>Chennai, Tamil Nadu, India</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg text-pink-700 mb-2">Why ALC?</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Premium handcrafted jewelry</li>
              <li>Certified gold & diamond pieces</li>
              <li>Custom orders & gifting options</li>
              <li>Safe delivery and easy returns</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-pink-700 mb-6">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>

            {success && (
              <p className="text-center mt-4 text-green-600 font-medium">{success}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
