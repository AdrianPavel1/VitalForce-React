import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import axios from "axios";
const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    console.log(currentDate);
  }, []);

  const dateClick = (day) => {

    const newDate = new Date(currentDate);
    newDate.setDate(day); 
    setCurrentDate(newDate); 
  };

  const [greenMeals, setGreenMeals] = useState([]);

  const takeGreenMeals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/take-greens"
      );
      setGreenMeals(response.data);
    } catch (err) {
      console.log("error on greanMeals");
      alert("Error:Unable to get greenMeals datas");
    }
  };

  useEffect(() => {
    takeGreenMeals();
  }, []);

  useEffect(() => {
    if (currentDate) {
      console.log("cand adaug in localStorage:", currentDate);
      onDateSelect(currentDate);

    }
  }, [currentDate]);

  const afisare = () => {

    console.log(currentDate);
  };
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

        <div className={styles.month}>
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            return (
              <div
                key={day}
                className={`${styles.day} ${
                  currentDate.getDate() === day ? styles.selected : ""
                } ${
                  greenMeals.some((e) => {
                    const greenMealDate = new Date(e.date);
                    return (
                      greenMealDate.getDate() === day &&
                      greenMealDate.getMonth() === currentDate.getMonth() &&
                      greenMealDate.getFullYear() === currentDate.getFullYear()
                    );
                  })
                    ? styles.highlight
                    : ""
                }`}
                onClick={() => dateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calendar;