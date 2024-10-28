import React from "react";
import AboutUsCSS from "./AboutUs.module.css";
import firstImg from "../../images/part1.png";
import secondImg from "../../images/abtus2.png";
import thirdImg from "../../images/part2.png";
import MainPage from "../mainPage/MainPage";

const AboutUs = () => {
  return (
    <div className={AboutUsCSS.blackCover}>
    <section className={AboutUsCSS.mainSection}>
      <div
        className={AboutUsCSS.firstPage}
        style={{ backgroundImage: `url(${firstImg})` }}
      >
        <div className={AboutUsCSS.textContainer}>
          <h1>Vital Force</h1>
          <p>
            Vital Force is a renowned, dedicated fitness center improving
            physical and mental performance through a combination of unique
            personalized training and expertise.
          </p>
          <button className={AboutUsCSS.contactButton}>Contact Us</button>
        </div>
      </div>

      <div
        className={AboutUsCSS.middlePage}
        style={{ backgroundImage: `url(${secondImg})` }}
      >
        <h1>About Us</h1>
      </div>

      <div
        className={AboutUsCSS.thirdPage}
        style={{ backgroundImage: `url(${thirdImg})` }}
      >
        <div className={AboutUsCSS.textContainer}>
          <div className={AboutUsCSS.column}>
            <h2>Our Mission</h2>
            <p>
              Our mission is to inspire individuals to achieve their fitness
              goals through tailored programs and unwavering support.
            </p>
          </div>
          <div className={AboutUsCSS.column}>
            <h2>Join Us</h2>
            <p>
              Become part of a community that prioritizes health, wellness, and
              personal growth.
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutUs;
