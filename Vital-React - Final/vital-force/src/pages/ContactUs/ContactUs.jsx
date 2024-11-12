import React from "react";
import ContactUsCSS from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <div className={ContactUsCSS.container}>
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, feel free to reach out!</p>

      <div className={ContactUsCSS.contactInfo}>
        <h2>Pavel Adrian</h2>
        <p>Email: pavel.adrian@vitalforce.com</p>
        <p>Phone: +40 123 456 789</p>
        <p>Address: Strada Manole nr 123, București, România</p>
      </div>

      <div className={ContactUsCSS.messageForm}>
        <h2>Send Us a Message</h2>
        <form>
          <input
            type="text"
            placeholder="Your Name"
            required
            className={ContactUsCSS.inputField}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className={ContactUsCSS.inputField}
          />
          <textarea
            placeholder="Your Message"
            required
            className={ContactUsCSS.textAreaField}
          />
          <button type="submit" className={ContactUsCSS.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
