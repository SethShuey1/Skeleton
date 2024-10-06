"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react"; // Make sure you have lucide-react installed

import Image from "next/image";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Sending...");

    const { firstName, lastName, phoneNumber, email, message } = formData;
    const combinedMessage = `First Name: ${firstName}\nLast Name: ${lastName}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nMessage: ${message}`;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error details for Email:", errorData);
        setSubmitStatus(`Failed to send Email message: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("An Email error occurred. Please try again later.");
    }

    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, combinedMessage }),
      });

      if (response.ok) {
        setSubmitStatus("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error details for SMS:", errorData);
        setSubmitStatus(`Failed to send SMS message: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("An SMS error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <Image
          src="/APDS-logo.svg"
          alt="APDS Landscaping Logo"
          width={200}
          height={200}
        />
      </div>
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to APDS Landscaping
      </h1>

      <p className="mb-8 text-lg text-center">
        Transform your outdoor space with Lubbock&apos;s premier landscaping
        service.
      </p>
      <p className="mb-8 text-lg text-center">
        Hours: 8am-5pm <br></br>Monday through Friday<br></br>Phone:
        806-789-1234
      </p>

      <p className="mb-8 text-lg text-center">
        Our normal business ours are 8am-5pm Monday through Friday. If you need
        to reach us outside of those hours, please leave a message. The form
        will be send to us as an email, as well as text message to our business
        line. We will get back to you as soon as possible.
      </p>

      {isMobile && (
        <a
          href="tel:+1234567890" // Replace with your actual phone number
          className="block w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-center py-3 rounded-lg mb-8 flex items-center justify-center transition duration-150 ease-in-out"
        >
          <Phone className="mr-2" size={20} />
          Click to Call
        </a>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block mb-1">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block mb-1">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>

      {submitStatus && (
        <p className="mt-4 text-center font-bold">{submitStatus}</p>
      )}
    </div>
  );
}
