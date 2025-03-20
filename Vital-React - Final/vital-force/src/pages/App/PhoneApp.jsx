import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./PhoneApp.module.css";
import image1 from "./appImages/1.png";
import image2 from "./appImages/2.png";
import card1 from "./appImages/card1.jpg";
import card2 from "./appImages/card2.jpg";
import card3 from "./appImages/card3.jpg";
import card4 from "./appImages/card4.jpg";
import card5 from "./appImages/card5.jpg";
import card6 from "./appImages/card6.jpg";

const PhoneApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [card1, card2, card3, card4, card5, card6];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Header />

      <div className={styles.mainAppContainer}>
        <section className={styles.arWorkouts}>
          <div className={styles.textContainer}>
            <h2>Why Web AR?</h2>
            <p>
              AR (Augmented Reality) enhances the real world by adding digital
              elements, making interactions more immersive and interactive.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <img src={image2} alt="AR Example" />
          </div>
        </section>

        <section className={styles.arDownload}>
          <div className={styles.imageContainer}>
            <img src={image1} alt="Second Example" />
          </div>
          <div className={styles.textContainer}>
            <h2>How to Install?</h2>
            <ol>
              <li>Click on the download button</li>
              <li>Unzip the file</li>
              <li>Transfer the app to your Android device</li>
              <li>Install the app</li>
              <li>Scan the images below or print them</li>
            </ol>

            <a href="/folderApp.zip" download className={styles.downloadBtn}>
              DOWNLOAD
            </a>
          </div>
        </section>

        <section className={styles.arImages}>
          <h2>AR Cards</h2>

          <div className={styles.carouselContainer}>
            <button className={styles.arrowButton} onClick={handlePrev}>
              <span className={"material-symbols-outlined"}>
                arrow_back_ios
              </span>
            </button>
            <div className={styles.carouselWrapper}>
              <img
                src={cards[currentIndex]}
                alt={`card-${currentIndex}`}
                className={styles.carouselImage}
              />
            </div>
            <button className={styles.arrowButton} onClick={handleNext}>
              <span className={"material-symbols-outlined"}>
                arrow_forward_ios
              </span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default PhoneApp;
