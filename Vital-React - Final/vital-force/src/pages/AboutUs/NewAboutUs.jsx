import { light } from "@mui/material/styles/createPalette";
import styles from "./NewAboutUs.module.css";
import { useEffect, useRef } from "react";
import video from "../../images/customEating.mp4";

import Header from "../Header/Header.jsx";
import Personal from "../Personal/Personal.jsx";
import Footer from "../Footer/Footer.jsx";
import wave from "../../images/WhiteWave.png";
import wave2 from "../../images/WhiteWave2.png";
import trainer1 from "../Personal/imagesTrainers/trainer1.jpg";
import trainer6 from "../Personal/imagesTrainers/trainer6.jpg";
import trainer2 from "../Personal/imagesTrainers/trainer2.jpg";
import trainer3 from "../Personal/imagesTrainers/trainer3.jpg";
import trainer4 from "../Personal/imagesTrainers/trainer4.jpg";
import trainer5 from "../Personal/imagesTrainers/trainer5.jpg";
import pics1 from "./pics/pic1.jpg";
import pics2 from "./pics/pic2.jpg";
import pics3 from "./pics/pic3.jpg";
import pics4 from "./pics/pic4.jpg";
import pics5 from "./pics/pic5.jpg";
import pics6 from "./pics/pic6.jpg";
import pics7 from "./pics/pic7.jpg";
import pics8 from "./pics/pic8.jpg";
import pics9 from "./pics/pic9.jpg";
const NewAboutUs = () => {
  const lightRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;
      }
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.overlay}></div>
        <header className={styles.hexGrid} ref={gridRef}>
          <div className={styles.light} ref={lightRef}></div>
          <div className={styles.grid}></div>
        </header>

        <div className={styles.container2}>
          <div className={styles.cards}>
            <div className={`${styles.card} ${styles.card1}`}>
              <h2>Our Values</h2>
              <p>
                At Vital Force, we believe in wellness, resilience, and
                empowerment. Guided by integrity and passion, we’re here to
                support your journey to a healthier, stronger you.
              </p>
            </div>

            <div className={`${styles.card} ${styles.card2}`}>
              <h2>About us</h2>
            </div>

            <div className={`${styles.card} ${styles.card3}`}>
              <h2 className={styles.autoShow}>Our Team</h2>
              <p>
                Meet our team who is passionate, skilled, and here to support
                your journey to health and strength.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.valuesContainer}>
        <h3 className={styles.valuesTitle}>Our Vital Values</h3>
        <img src={wave} alt="" className={styles.whiteWave} />
      </div>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <div className={styles.item}>
            <img src={pics1} alt="" />
            <span className={styles.hoverText}>
              "Health begins with balance! We focus on mindful food choices."
            </span>
          </div>

          <div className={styles.item}>
            <img src={pics2} alt="" />
            <span className={styles.hoverText}>
              "Be strong, stay resilient!"
            </span>
          </div>

          <div className={styles.item}>
            <img src={pics3} alt="" />
            <span className={styles.hoverText}>
              "Inspiration comes from teamwork!"
            </span>
          </div>

          <div className={styles.item}>
            <img src={pics4} alt="" />
            <span className={styles.hoverText}>"Energy for life!"</span>
          </div>

          <div className={styles.item}>
            <img src={pics5} alt="" />
            <span className={styles.hoverText}> "No steps backward!"</span>
          </div>

          <div className={styles.item}>
            <img src={pics6} alt="" />
            <span className={styles.hoverText}>
              "Building trust through transparency!"
            </span>
          </div>

          <div className={styles.item}>
            <img src={pics7} alt="" />
            <span className={styles.hoverText}>
              "Together, we are unstoppable!"
            </span>
          </div>
        </div>
      </div>
      <div className={styles.valuesContainer}>
        <h3 className={styles.valuesTitle}>Our Vital Team</h3>
        <img src={wave2} alt="" className={styles.whiteWave} />
      </div>
      <Personal />
      <div className={styles.details}>
        <div className={styles.firstParagraph}>
          <ul>
            <li>
              <div className={`${styles.trainer} ${styles.trainerE1}`}>
                <img src={trainer1} />
                <h3>Alex</h3>
                <p>
                  Description: Alex is passionate about bodybuilding and
                  functional fitness, with over 8 years of experience in
                  strength training. He helps clients build muscle mass and
                  achieve their performance goals.
                </p>
              </div>
            </li>

            <li>
              <div className={`${styles.trainer} ${styles.trainerE2}`}>
                <img src={trainer6} />
                <h3>Mara</h3>
                <p>
                  Description: Mara creates personalized nutrition plans,
                  focusing on healthy and sustainable habits. She specializes in
                  balanced diets that promote long-term health and vitality.
                </p>
              </div>
            </li>

            <li>
              <div className={`${styles.trainer} ${styles.trainerE3}`}>
                <img src={trainer2} />
                <h3>Chris</h3>
                <p>
                  Description: Chris has a background in marathon and triathlon
                  coaching, helping athletes improve stamina and speed. He
                  tailors his programs to push endurance limits safely and
                  effectively.
                </p>
              </div>
            </li>

            <li>
              <div className={`${styles.trainer} ${styles.trainerE4}`}>
                <img src={trainer5} />
                <h3>Anna</h3>
                <p>
                  Description: Anna combines yoga, meditation, and mindfulness
                  techniques to help clients relieve stress and improve
                  flexibility. Her sessions emphasize mind-body connection and
                  inner peace.
                </p>
              </div>
            </li>

            <li>
              <div className={`${styles.trainer} ${styles.trainerE5}`}>
                <img src={trainer3} />
                <h3>Liam</h3>
                <p>
                  Description: Liam designs strength training programs for
                  athletes and beginners alike, focusing on muscle strength,
                  agility, and injury prevention. He’s committed to building
                  power from the core.
                </p>
              </div>
            </li>

            <li>
              <div className={`${styles.trainer} ${styles.trainerE6}`}>
                <img src={trainer4} />
                <h3>Leo</h3>
                <p>
                  Description: Leo specializes in high-intensity interval
                  training (HIIT) and functional fitness. He’s known for her
                  energy-packed sessions that enhance endurance, strength, and
                  fat loss.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.secondParagraph}>
          <h2>"Strength isn’t given, it’s earned."</h2>
          <p>Vf Team</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewAboutUs;
