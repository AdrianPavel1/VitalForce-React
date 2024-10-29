import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  useEffect(() => {
    // Citește data selectată din localStorage la montarea componentei
    const savedDate = localStorage.getItem("selectedDate");
    console.log("savedDate: ", savedDate);
    if (savedDate) {
      setSelectedDate(new Date(savedDate));
    }
  }, []);

  const handleDateClick = (day) => {
    console.log("data curenta : ", currentDate);
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(clickedDate);
    localStorage.setItem("selectedDate", clickedDate);
    console.log("ai dat click pe : ", clickedDate);
    onDateSelect(clickedDate);
    window.location.reload();
  };

  // const afisare = () => {
  //   console.log(selectedDate);
  // };
  return (
    <>
      <div className={styles.calendar}>
        <h1>Strake Calendar</h1>
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
            const isSelected =
              selectedDate &&
              day === selectedDate.getDate() &&
              currentDate.getMonth() === selectedDate.getMonth() &&
              currentDate.getFullYear() === selectedDate.getFullYear();

            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`${styles.day} ${isToday ? styles.highlight : ""} ${
                  isSelected ? styles.selected : ""
                }`}
              >
                {day}
                {isToday && <span className={styles.badge}>✔</span>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
/*
1.Adaug in mysql o noua linie ce va fi completata doar dupa ce procentajul a atins un anumit prag de 90% .
2.Linia va fi adaugata pe baza unui useState ce va devenii 1 si apoi trimis in baza de date (asta in trackProgres.jsx)
3.Adaug o a 2 a functie de backend ce imi va lua toate datele unde se gaseste acel 1 si le va pune intr-un array.
4.Acel array va fi vizibil in calendar.jsx pentru a le putea parcurge si aplica stilul special verde pe datele selectate.


*/
export default Calendar;
