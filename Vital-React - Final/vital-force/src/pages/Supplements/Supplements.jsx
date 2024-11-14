import styles from "./Supplements.module.css";
import React, { useState, useEffect } from "react";
import wheyImage from "../../png/whey.png";
import energyImage from "../../png/energy.png";
import bcaaImage from "../../png/bcaa.png";
import creatineImage from "../../png/creatine.png";
import electrolytesImage from "../../png/electrolytes.png";
import fatBurnImage from "../../png/fatBurn.png";
import collagenImage from "../../png/collagen.png";
import vitaminsImage from "../../png/vitamins.png";
import omega3Image from "../../png/omega-3.png";
import testosteroneImage from "../../png/testosterone.png";

import supplementCover1 from "../../images/supplementCover1.png";

import preWorkoutImage1 from "../../images/preWorkout.jpg";
import bcaaImage1 from "../../images/BCAA1.jpg";
import creatineImage1 from "../../images/Creatine1.jpg";
import electrolytesImage1 from "../../images/electrolytes1.jpg";
import fatBurnersImage1 from "../../images/fatBurenrs1.jpg";
import collagenImage1 from "../../images/collagen2.jpg";
import multivitaminsImage1 from "../../images/multivitamins.jpg";
import omega3Image1 from "../../images/Omega3.2.jpg";
import testosteroneImage1 from "../../images/testosteron1.jpg";
import wheyImage1 from "../../images/whey2.jpg";

import pumpProteinImage from "../../png/pumpProtein.png";
import fastRebuildProteinImage from "../../png/fastRebuildProtein.png";
import efficacyProteinImage from "../../png/efficacyProtein.png";
import staminaPreWorkoutImage from "../../png/staminaPre-Workout.png";
import endurancePreWorkoutImage from "../../png/endurancePre-workout.png";
import concentratePreWorkoutImage from "../../png/concentratePRE-WORKOUT.png";
import muscleBCAAImage from "../../png/muscleBCAA.png";
import painBCAAImage from "../../png/painBCAA.png";
import perseveranceBCAAImage from "../../png/perseveranceBCAA.png";
import strengthCreatineImage from "../../png/strengthCreatine.png";
import creatine2Image from "../../png/creatine2.png";
import creatine3Image from "../../png/creatine3.png";
import electro1Image from "../../png/electro1.png";
import electro2Image from "../../png/electro2.png";
import electro3Image from "../../png/electro3.png";
import fat1Image from "../../png/fat1.png";
import fat2Image from "../../png/fat2.png";
import fat3Image from "../../png/fat3.png";
import colagen1Image from "../../png/colagen1.png";
import colagen2Image from "../../png/colagen2.png";
import colagen3Image from "../../png/colagen3.png";
import vitamin1Image from "../../png/vitamin1.png";
import vitamin2Image from "../../png/vitamin2.png";
import vitamin3Image from "../../png/vitamin3.png";
import omega1Image from "../../png/omega1.png";
import omega2Image from "../../png/omega2.png";
import omega3Image2 from "../../png/omega3.3.png";
import testoste1Image from "../../png/testoste1.png";
import testoste2Image from "../../png/testoste2.png";
import testoste3Image from "../../png/testoste3.png";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Supplements = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);

  const supplementBar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", supplementBar);
    return () => {
      window.removeEventListener("scroll", supplementBar);
    };
  }, [lastScrollY]);

  const [activeSection, setActiveSection] = useState("main");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("username");
    setUser(currentUser);
  }, []);

  const afisare = () => {
    console.log(user);
  };
  return (
    <div>
      {<Header />}

      {activeSection === "protein" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${wheyImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Proteins</p>

            <h1 className={styles.mainH1}>Protein Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Proteins are large, complex molecules that play many critical
              roles in the body. They do most of the work in cells and are
              required for the structure, function, and regulation of the body’s
              tissues and organs.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://www.mypronutrition.com/sports-nutrition/the-whey/11353515.html"
                className={styles.shopBtn}
              >
                Buy Protein
              </a>
              {/* <button onClick={() => afisare()}>Afisare</button> */}
              <a
                href="https://www.youtube.com/watch?v=wvTv8TqWC48&ab_channel=RCSBProteinDataBank"
                className={styles.checkVideoBtn}
              >
                About Protein
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={pumpProteinImage} alt="pump" className="smallIcons" />
              <p>
                Whey protein is rich in essential amino acids, especially
                leucine, which stimulates muscle protein synthesis.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img
                src={fastRebuildProteinImage}
                alt="fastRebuild"
                className="smallIcons"
              />
              <p>
                Whey protein aids in quicker recovery after intense workouts by
                repairing muscles and reducing muscle soreness.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img
                src={efficacyProteinImage}
                alt="efficacy"
                className="smallIcons"
              />
              <p>
                Consuming whey protein can enhance athletic performance by
                supporting energy and endurance levels.
              </p>
            </div>
          </div>
        </section>
      )}
      {}
      {activeSection === "preWorkout" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${preWorkoutImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Pre-Workouts</p>
            <h1 className={styles.mainH1}>Pre-Workout Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Pre-workout supplements are designed to enhance your exercise
              performance by increasing energy, endurance, and focus.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://www.mypronutrition.com/sports-nutrition/the-pre-workout/12663794.html"
                className={styles.shopBtn}
              >
                {" "}
                Buy Pre-Workout
              </a>

              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className={styles.checkVideoBtn}
              >
                About Pre-Workout
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img
                src={staminaPreWorkoutImage}
                alt="energyBoost"
                className="smallIcons"
              />
              <p>
                This pre-workout supplement is packed with caffeine and
                beta-alanine to boost your energy levels and delay fatigue.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img
                src={endurancePreWorkoutImage}
                alt="enduranceEnhancer"
                className="smallIcons"
              />
              <p>
                Formulated with BCAAs and citrulline, this supplement supports
                endurance and reduces muscle soreness.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={concentratePreWorkoutImage} alt="focusFormula" />
              <p>
                With ingredients like tyrosine and caffeine, this pre-workout
                enhances mental focus and concentration.
              </p>
            </div>
          </div>
        </section>
      )}
      {}
      {activeSection === "bcaa" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${bcaaImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about BCAA</p>
            <h1 className={styles.mainH1}>BCAA Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              BCAAs are essential nutrients that help stimulate muscle growth
              and repair. They are used to reduce muscle soreness and fatigue.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/bcaa-amino-hydrate-applied-nutrition.html"
                className={styles.shopBtn}
              >
                Buy BCAA
              </a>

              <a
                href="https://www.youtube.com/watch?v=-jc4EeIGgRU&ab_channel=PictureFit"
                className={styles.checkVideoBtn}
              >
                About BCAA
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={muscleBCAAImage} alt="bcaaGrowth" />
              <p>
                BCAA supplements promote muscle protein synthesis and increase
                muscle growth.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={painBCAAImage} alt="bcaaRecovery" />
              <p>
                They help decrease muscle soreness after workouts, leading to
                quicker recovery times.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={perseveranceBCAAImage} alt="bcaaEndurance" />
              <p>
                BCAAs can enhance endurance and reduce exercise-induced fatigue.
              </p>
            </div>
          </div>
        </section>
      )}
      {}
      {activeSection === "creatine" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${creatineImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Creatine</p>
            <h1 className={styles.mainH1}>Creatine Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Creatine helps your muscles produce energy during high-intensity
              exercise, improving strength, increasing muscle mass, and
              enhancing performance.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/kreatin-crea7in-300-g-gymbeam.html"
                className={styles.shopBtn}
              >
                Buy Creatine
              </a>

              <a
                href="https://www.youtube.com/watch?v=V13R5lu9VNc&ab_channel=PictureFit"
                className={styles.checkVideoBtn}
              >
                About Creatine
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={strengthCreatineImage} alt="creatineStrength" />
              <p>
                Creatine improves strength and power output during exercise.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={creatine2Image} alt="creatineMuscle" />
              <p>
                It helps increase muscle mass through improved water retention
                in muscle cells.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={creatine3Image} alt="creatinePerformance" />
              <p>
                Enhances overall exercise performance and allows for more
                intense workouts.
              </p>
            </div>
          </div>
        </section>
      )}
      {}
      {activeSection === "electrolytes" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${electrolytesImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Electrolytes</p>
            <h1 className={styles.mainH1}>Electrolyte Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Electrolytes are minerals that help maintain fluid balance, nerve
              function, and muscle contraction.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/electroliti-ostrovit.html"
                className={styles.shopBtn}
              >
                Buy Electrolytes
              </a>

              <a
                href="https://www.youtube.com/watch?v=l3VWb0mUS7Y&ab_channel=PictureFit"
                className={styles.checkVideoBtn}
              >
                About Electrolytes
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={electro1Image} alt="electrolyteBalance" />
              <p>
                Helps maintain fluid balance and prevents dehydration during
                intense exercise.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={electro2Image} alt="electrolyteMuscle" />
              <p>
                Supports proper muscle function and reduces the risk of cramps
                during exercise.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={electro3Image} alt="electrolyteRecovery" />
              <p>
                Assists in faster recovery by replenishing minerals lost through
                sweat.
              </p>
            </div>
          </div>
        </section>
      )}
      {activeSection === "fatBurners" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${fatBurnersImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Fat Burners</p>
            <h1 className={styles.mainH1}>Fat Burner Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Fat burners are supplements designed to increase the metabolic
              rate, enhance fat oxidation, and aid in weight loss.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/fat-burner-plus-60-caps-goldfield.html"
                className={styles.shopBtn}
              >
                Buy Fat Burners
              </a>

              <a
                href="https://www.youtube.com/watch?v=3wYh9MPW0aA&ab_channel=GravityTransformation-FatLossExperts"
                className={styles.checkVideoBtn}
              >
                About Fat Burners
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={fat1Image} alt="fatBurnerMetabolism" />
              <p>
                Boosts metabolism and promotes fat oxidation for more effective
                weight loss.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={fat2Image} alt="fatBurnerAppetite" />
              <p>
                Suppresses appetite and reduces calorie intake, aiding in weight
                management.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={fat3Image} alt="fatBurnerEnergy" />
              <p>
                Increases energy levels and improves overall exercise
                performance.
              </p>
            </div>
          </div>
        </section>
      )}

      {}
      {activeSection === "collagen" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${collagenImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Collagen</p>
            <h1 className={styles.mainH1}>Collagen Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Collagen plays a key role in maintaining the structure and
              elasticity of skin, joints, and connective tissues.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/catalogsearch/result/?q=collagen"
                className={styles.shopBtn}
              >
                Buy Collagen
              </a>

              <a
                href="https://www.youtube.com/watch?v=r_HKOmvPZNg&ab_channel=DoctorER"
                className={styles.checkVideoBtn}
              >
                About Collagen
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={colagen1Image} alt="collagenSkin" />
              <p>
                Enhances skin elasticity and hydration, reducing the appearance
                of wrinkles.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={colagen2Image} alt="collagenJoints" />
              <p>
                Supports joint health and reduces joint pain by improving
                cartilage strength.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={colagen3Image} alt="collagenHair" />
              <p>
                Promotes healthier hair growth and strengthens hair follicles.
              </p>
            </div>
          </div>
        </section>
      )}

      {}

      {activeSection === "multivitamins" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${multivitaminsImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Multivitamins</p>
            <h1 className={styles.mainH1}>Multivitamin Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Multivitamins help fill nutritional gaps and support various
              bodily functions, enhancing immune health.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/catalogsearch/result/?q=multivitamins"
                className={styles.shopBtn}
              >
                Buy Multivitamins
              </a>

              <a
                href="https://www.youtube.com/watch?v=ISZLTJH5lYg&ab_channel=TED-Ed"
                className={styles.checkVideoBtn}
              >
                About Multivitamins
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={vitamin1Image} alt="multivitaminHealth" />
              <p>
                Supports overall health by providing essential vitamins and
                minerals.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={vitamin2Image} alt="multivitaminEnergy" />
              <p>
                Boosts energy levels and reduces fatigue by addressing
                nutritional deficiencies.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={vitamin3Image} alt="multivitaminImmune" />
              <p>
                Enhances immune function and helps protect against common
                illnesses.
              </p>
            </div>
          </div>
        </section>
      )}

      {}
      {activeSection === "omega3" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${omega3Image1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Omega-3</p>
            <h1 className={styles.mainH1}>Omega-3 Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Omega-3 fatty acids provide numerous health benefits including
              improved heart health and cognitive function.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/omega-3-gymbeam.html?utm_source=google&utm_medium=cpc&utm_campaign=SRCH%20-%20PROD%20-%20GymBeam%20%23Bee&utm_id=15990082690&gad_source=1&gclid=Cj0KCQjwpP63BhDYARIsAOQkATZraq52nYUHkMkcz143AxfZ-UVi5ctm0Bap6rmj5_HyL8t2cxCRFEkaAuG6EALw_wcB"
                className={styles.shopBtn}
              >
                Buy Omega-3
              </a>

              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className={styles.checkVideoBtn}
              >
                About Omega-3
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={omega1Image} alt="omegaHeart" />
              <p>
                Supports heart health by reducing triglyceride levels and
                lowering blood pressure.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={omega2Image} alt="omegaBrain" />
              <p>
                Enhances brain function and may help reduce the risk of
                cognitive decline.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={omega3Image2} alt="omegaInflammation" />
              <p>
                Reduces inflammation throughout the body, aiding in joint and
                overall health.
              </p>
            </div>
          </div>
        </section>
      )}

      {}
      {activeSection === "testosterone" && (
        <section
          className={styles.oneSection}
          style={{ backgroundImage: `url(${testosteroneImage1})` }}
        >
          <div className={styles.mainSect}>
            <p className={styles.p1}>All about Testosterone </p>
            <h1 className={styles.mainH1}>Testosterone Boost Supplements</h1>
            <div className={styles.proteinLine}></div>
            <p className={styles.secondP}>
              Testosterone Boost supplements are designed to naturally increase
              testosterone levels and improve vitality.
            </p>
            <div className={styles.proteinButtons}>
              <a
                href="https://gymbeam.ro/catalogsearch/result/?q=testosterone"
                className={styles.shopBtn}
              >
                Buy Testosterone
              </a>
              <a
                href="https://www.youtube.com/watch?v=cX0MNCQvBt8&ab_channel=AsapSCIENCE"
                className={styles.checkVideoBtn}
              >
                About Testosterone
              </a>
            </div>
          </div>
          <div className={styles.elementPros}>
            <div className={styles.elemPro}>
              <img src={testoste1Image} alt="testosteroneMuscle" />
              <p>
                Supports muscle growth and strength by increasing natural
                testosterone production.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={testoste2Image} alt="testosteroneEnergy" />
              <p>
                Enhances energy levels and reduces fatigue, improving overall
                vitality.
              </p>
            </div>
            <div className={styles.elemPro}>
              <img src={testoste3Image} alt="testosteroneLibido" />
              <p>
                Boosts libido and supports sexual health by balancing hormone
                levels.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSection === "main" && (
        <section
          className={`${styles.oneSection} ${styles.mainSection}`}
          style={{ backgroundImage: `url(${supplementCover1})` }}
        >
          <div className={styles.mainSect}>
            <h1>All About Supplements</h1>
            <p className={styles.secondP}>Click on one of the buttons </p>
          </div>
        </section>
      )}
      <div className={`${styles.iconButtons} ${show ? "" : styles.hidden}`}>
        <button
          className={`${styles.iconButton} ${styles.proteinBtn}`}
          onClick={() => handleSectionChange("protein")}
        >
          <img src={wheyImage} alt="Icon 1" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.preWorkoutBtn}`}
          onClick={() => handleSectionChange("preWorkout")}
        >
          <img src={energyImage} alt="Icon 2" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.bcaaBtn}`}
          onClick={() => handleSectionChange("bcaa")}
        >
          <img src={bcaaImage} alt="Icon 3" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.creatineBtn}`}
          onClick={() => handleSectionChange("creatine")}
        >
          <img src={creatineImage} alt="Icon 4" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.electrolytesBtn}`}
          onClick={() => handleSectionChange("electrolytes")}
        >
          <img src={electrolytesImage} alt="Icon 5" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.fatBurnersBtn}`}
          onClick={() => handleSectionChange("fatBurners")}
        >
          <img src={fatBurnImage} alt="Icon 6" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.collagenBtn}`}
          onClick={() => handleSectionChange("collagen")}
        >
          <img src={collagenImage} alt="Icon 7" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.multivitaminsBtn}`}
          onClick={() => handleSectionChange("multivitamins")}
        >
          <img src={vitaminsImage} alt="Icon 8" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.omega3Btn}`}
          onClick={() => handleSectionChange("omega3")}
        >
          <img src={omega3Image} alt="Icon 9" className={styles.icon} />
        </button>
        <button
          className={`${styles.iconButton} ${styles.testosteroneBtn}`}
          onClick={() => handleSectionChange("testosterone")}
        >
          <img src={testosteroneImage} alt="Icon 10" className={styles.icon} />
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Supplements;
