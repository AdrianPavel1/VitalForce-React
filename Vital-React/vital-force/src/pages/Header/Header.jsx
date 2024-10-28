import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [show, setShow] = useState(true); // State pentru controlul vizibilității header-ului
  const [lastScrollY, setLastScrollY] = useState(0); // Pentru a urmări poziția de scroll

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false); // Scroll în jos, ascundem header-ul
    } else {
      setShow(true); // Scroll în sus, arătăm header-ul
    }
    setLastScrollY(window.scrollY); // Actualizăm poziția de scroll
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]); // Adăugăm lastScrollY ca dependență

  return (
    <header className={`${styles.header} ${show ? "" : styles.hidden}`}>
      <div className={styles.logo}>
        <h1>Vital Force</h1>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/mainMenu">Home</Link>
          </li>
          <li>
            <Link to="/AboutMe">Abt me</Link>
          </li>
          <li>
            <Link to="/aboutUs">About Us</Link>
          </li>
          <li>
            <Link to="/PhoneApp">App</Link>
          </li>
          <li>
            <Link to="/Supplements">Supplements</Link>
          </li>
          <li>
            <Link to="/trackProgress" className={styles.progressButton}>
              Progress
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
