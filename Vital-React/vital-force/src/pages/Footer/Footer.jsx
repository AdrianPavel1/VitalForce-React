// src/Footer/Footer.jsx
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <section className={styles.getFitSection}>
        <h2>Get Fit, Feel Amazing</h2>
        <hr className={styles.underline} />
        <p>
          Discover your potential and take control of your fitness journey. With
          personalized workout plans and expert coaching, we’re here to guide
          you towards a healthier, happier lifestyle.
        </p>
      </section>

      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Links to Social Media</h3>
          <p>Stay up to date</p>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Terms of Service</h3>
          <p>Read our latest terms and conditions</p>
          <ul>
            <li>
              <Link to="/TrackProgress">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contact Information</h3>
          <p>Get in touch with us</p>
          <ul>
            <li>
              <a href="mailto:paveladrian011@gmail.com">
                Email: paveladrian011@gmail.com
              </a>
            </li>
            <li>
              <a href="#">Phone: 0711111111</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 Vital Force - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
