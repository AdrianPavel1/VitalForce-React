import React, { useState } from "react";
import styles from "./Calendar.module.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleHighlightToday = () => {
    setCurrentDate(new Date());
  };

  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={() => changeMonth(-1)}>◀</button>
        <h2>
          {monthName} {year}
        </h2>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>
      {/* <button onClick={handleHighlightToday}>Marchează ziua curentă</button> */}
      <div className={styles.month}>
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={day}
              className={`${styles.day} ${isToday ? styles.highlight : ""}`}
            >
              {day}
              {isToday && <span className={styles.badge}>✔</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
