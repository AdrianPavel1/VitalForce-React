import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [miniHeader, setMiniHeader] = useState(false);
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const changeMenu = () => {
    setMiniHeader(!miniHeader);
  };

  useEffect(() => {
    if (!miniHeader) {
      document.body.classList.add("noScroll");
      console.log("noScroll added");
    } else {
      document.body.classList.remove("noScroll");
      console.log("noScroll removed");
    }
  }, [miniHeader]);

  return (
    <>
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
              <Link to="/CustomEatingMeals">Custom Meals</Link>
            </li>
            <li>
              <Link to="/NewAboutUs">About us</Link>
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

        <span
          className={`${
            miniHeader
              ? `${styles.miniMenu} ${styles.miniMenuOn}`
              : `${styles.miniMenu}`
          } material-symbols-outlined`}
          onClick={changeMenu}
        >
          menu
        </span>
      </header>
      {miniHeader && (
        <div className={styles.phoneModeHeader}>
          <div className={styles.newMenu}>
            <ul className={styles.menuList2}>
              <li>
                <Link to="/mainMenu">Home</Link>
              </li>
              <li>
                <Link to="/CustomEatingMeals">Custom Meals</Link>
              </li>
              <li>
                <Link to="/NewAboutUs">About us</Link>
              </li>
              <li>
                <Link to="/PhoneApp">App</Link>
              </li>
              <li>
                <Link to="/Supplements">Supplements</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
