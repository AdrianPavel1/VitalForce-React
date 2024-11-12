import mainPageCSS from "./MainPage.module.css";
import logoImg from "../../images/logo.png";
import girlImg from "../../images/girlPng.png";
import backgroundImg from "../../images/background.png";
import { Link } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";

function MainPage() {
  return (
    <>
      <div
        className={mainPageCSS.pageContainer}
        style={{
          backgroundImage: `url(${backgroundImg})`,
        }}
      >
        <div className={mainPageCSS.redSquare}>
          <header className={mainPageCSS.headerContent}>
            <img src={logoImg} alt="logo" className={mainPageCSS.headerImg} />
            <ul className={mainPageCSS.navLinks}>
              <li>
                <Link to="/AboutUs" className={mainPageCSS.linkButton}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className={mainPageCSS.linkButton}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </header>

          <img
            src={girlImg}
            alt="Fitness Girl"
            className={mainPageCSS.fitnessImg}
          />

          <div className={mainPageCSS.loginSection}>
            <p
              className={`${mainPageCSS.loginText} ${mainPageCSS.welcomeBack}`}
            >
              Welcome Back
            </p>
            <p className={`${mainPageCSS.loginText} ${mainPageCSS.readyText}`}>
              Ready to Sweat?
            </p>
            <p className={`${mainPageCSS.loginText} ${mainPageCSS.stayStrong}`}>
              Stay Strong
            </p>
            <Link to="/LoginPage" className={mainPageCSS.loginBtn}>
              Log In
            </Link>
          </div>

          <div className={mainPageCSS.sectionContent}>
            <h1>VitalForce</h1>
            <p>
              At Vital Force, we are dedicated to revolutionizing the fitness
              experience with personalized training programs, calorie tracking,
              customized menus, and a VR application for home workouts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
