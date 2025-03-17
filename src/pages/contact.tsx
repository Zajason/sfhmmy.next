import React, { useState } from "react";
import { Meteors } from "../components/meteorAnimation"; // Adjust path as needed
import emailjs from "emailjs-com";
import { useTheme } from "../utils/ThemeContext";

const ContactPage: React.FC = () => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send email to the user (confirmation message)
      await emailjs.send(
        "service_oq88c5p", // Replace with your service ID
        "template_2fp9foy", // Replace with the user template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "CyoYqF6L8z4iB0KeD" // Replace with your EmailJS public key
      );

      // Send email to yourself with the user's message
      await emailjs.send(
        "service_oq88c5p", // Replace with your service ID
        "template_0lmz04g", // Replace with your template ID for receiving messages
        {
          user_name: formData.name,
          user_email: formData.email,
          user_message: formData.message,
        },
        "CyoYqF6L8z4iB0KeD" // Replace with your EmailJS public key
      );

      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send the message. Please try again.");
    }
  };

  const backgroundColor = theme === "dark" ? "bg-black" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <div
      className={`relative w-full h-screen ${backgroundColor} overflow-hidden`}
    >
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <Meteors number={30} />
      </div>

      {/* Contact Form */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <h1 className={`${textColor} text-3xl font-bold mb-6`}>Contact Us</h1>
        <form
          className="w-full max-w-md bg-gray-900 text-white p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
          >
            Send Message
          </button>
        </form>

        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ContactPage;
