import React, { useRef, useEffect, useState } from "react";
import styles from "./EmailUs.module.css";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const clearForm = () => {
    setFormData({
      from_name: "",
      from_email: "",
      message: "",
    });
  };

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_9ss4zvk", "template_iwkntt5", form.current, {
        publicKey: "Erw8UnpdQ9YqW3Bp_",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <h3 className={styles.mailFormH3}>Send us an email</h3>
      <form
        ref={form}
        onSubmit={(e) => {
          e.preventDefault();
          sendEmail(e);
          clearForm();
        }}
        className={styles.mailForm}
      >
        <label>Name</label>
        <input
          type="text"
          name="from_name"
          value={formData.from_name}
          onChange={(e) => {
            setFormData({ ...formData, from_name: e.target.value });
          }}
        />
        <label>Email</label>
        <input
          type="email"
          name="from_email"
          value={formData.from_email}
          onChange={(e) => {
            setFormData({ ...formData, from_email: e.target.value });
          }}
        />
        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
          }}
        />
        <input type="submit" value="Send" className={styles.mailFormBttn} />
      </form>
    </>
  );
};

export default ContactUs;
