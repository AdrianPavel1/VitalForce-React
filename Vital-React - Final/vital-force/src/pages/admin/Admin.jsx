import styles from "./Admin.module.css";
import logo from "../../images/logo.png";
import { useState, useEffect, useRef } from "react";
import AvailableFoodIcon from "../../png/AvailableFood.png";
import UserIcon from "../../png/user.png";
import GoalsIcon from "../../png/goal.png";
import axios from "axios";
import HandleFoods from "./HandleFoods";
import ManageRecomandations from "./ManageRecomandations";
const Admin = () => {
  const [title, setTitle] = useState("Home");
  const [error, setError] = useState("");

  //home page details
  const [homePageDetails, setHomePageDetails] = useState({
    userNumbers: 1,
    weightLossCount: 1,
    muscleGainCount: 1,
    foodsTotal: 1,
  });

  const getHomeDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/getHomeDetails"
      );

      if (response.status === 200) {
        setHomePageDetails(response.data);
      }
    } catch (err) {
      setError("An error occured while getting users data");
    }
  };

  useEffect(() => {
    getHomeDetails();
  }, []);
  //chart
  useEffect(() => {
    if (title !== "Home") return;

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      const data = google.visualization.arrayToDataTable([
        ["Task", "Value"],
        ["weight loss", Number(homePageDetails.weightLossCount)],
        ["muscle gain", Number(homePageDetails.muscleGainCount)],
      ]);

      const options = {
        title: "User Goals Percentage",
        is3D: true,
        backgroundColor: "transparent",

        titleTextStyle: {
          color: "#ffffff",
          fontSize: 18,
        },

        legend: {
          position: "bottom",
          textStyle: {
            color: "#ffffff",
            fontSize: 18,
          },
        },

        chartArea: {
          left: "10%",
          top: "10%",
          width: "80%",
          height: "70%",
        },

        slices: {
          0: { color: "#3D8D7A" },
          1: { color: "#27667B" },
        },
      };

      const chart = new google.visualization.PieChart(
        document.getElementById("piechart_3d")
      );
      chart.draw(data, options);
    }
  }, [title, homePageDetails]);

  //from the database-----

  //get users from DB
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/getUsers");

      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (err) {
      setError("An error occured while getting users data");
    }
  };

  //get user details

  const [usersDetails, setUsersDetails] = useState([]);

  const getUsersDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/getUsersDetails"
      );

      if (response.status === 200) {
        setUsersDetails(response.data);
      }
    } catch (err) {
      setError("An error occured while getting users data");
    }
  };

  //backend-frontend page content calls

  const getPage = (title) => {
    setTitle(title);

    switch (title) {
      case "Users":
        getUsers();
        return;
      case "User profiles":
        getUsersDetails();
        return;
    }
  };

  const pageHandler = () => {
    switch (title) {
      case "Home":
        return (
          <div className={styles.right}>
            <h3>{title}</h3>
            <div className={styles.cards}>
              <div className={styles.card}>
                <img src={UserIcon} alt="icon" />
                <p>Number of Users</p>
                <h3>{homePageDetails.userNumbers}</h3>
              </div>

              <div className={styles.card}>
                <img src={AvailableFoodIcon} alt="icon" />
                <p>Available Foods</p>
                <h3>{homePageDetails.foodsTotal}</h3>
              </div>
            </div>

            <div
              id="piechart_3d"
              style={{ width: "800px", height: "500px" }}
              className={styles.chartContainer}
            ></div>
          </div>
        );
      case "Users":
        return (
          <>
            <h2>{title}</h2>

            <h3>Users Informations</h3>
            <div className={styles.adminTables}>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user[0]}</td>
                      <td>{user[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case "User profiles":
        return (
          <>
            <h2>{title}</h2>
            <h3>Users Info</h3>
            {/* <button onClick={() => checkerFunction()}>Check me</button> */}
            <div className={styles.adminTables}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Body Type</th>
                    <th>Goal</th>
                    <th>Weight</th>
                    <th>Height</th>
                    <th>Pysical Activity</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {usersDetails.map((profile) => (
                    <tr key={profile.profile_id}>
                      <td>{profile.profile_id}</td>
                      <td>{profile.username}</td>
                      <td>{profile.age}</td>
                      <td>{profile.bodyType}</td>
                      <td>{profile.goal}</td>
                      <td>{profile.weight}</td>
                      <td>{profile.height}</td>
                      <td>{profile.physicalActivity}</td>
                      <td>{profile.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case "Breakfast":
        return title ? (
          <>
            <h3>{title}</h3>
            {<ManageRecomandations title={title} />}
          </>
        ) : null;
      case "Lunch":
        return (
          <>
            <h3>{title}</h3>
            {title === "Lunch" && <ManageRecomandations title={title} />}
          </>
        );
      case "Dinner":
        return (
          <>
            <h3>{title}</h3>
            {<ManageRecomandations title={title} />}
          </>
        );
      case "Foods":
        return (
          <>
            <HandleFoods title={title} />
          </>
        );
      default:
        return (
          <div className={styles.right}>
            <h3>{title}</h3>
            <div className={styles.cards}>
              <div className={styles.card}>
                <img src={UserIcon} alt="icon" />
                <p>Number of Users</p>
                <h3>120</h3>
              </div>

              <div className={styles.card}>
                <img src={AvailableFoodIcon} alt="icon" />
                <p>Available Foods</p>
                <h3>120</h3>
              </div>

              <div className={styles.card}>
                <img src={GoalsIcon} alt="icon" />
                <p>Goals</p>
                <h3>120</h3>
              </div>
            </div>

            <div
              id="piechart_3d"
              style={{ width: "900px", height: "500px" }}
              className={styles.chartContainer}
            ></div>
          </div>
        );
    }
  };
  return (
    <div className={styles.adminContainer}>
      <div className={styles.left}>
        <div className={styles.containerHeader}>
          <img src={logo} alt="logo" />
          <h2>VitalForce-Admin</h2>
        </div>

        <nav className={styles.sideBar}>
          <ul>
            <li>
              <button onClick={() => getPage("Home")}>Home</button>
            </li>
            <li className={styles.sectionTitle}>Manage Users</li>
            <li>
              <button onClick={() => getPage("Users")}>Users</button>
            </li>
            <li>
              <button onClick={() => getPage("User profiles")}>
                User profiles
              </button>
            </li>
            <li className={styles.sectionTitle}>Manage Recommendations</li>
            <li>
              <button onClick={() => getPage("Breakfast")}>Breakfast</button>
            </li>
            <li>
              <button onClick={() => getPage("Lunch")}>Lunch</button>
            </li>
            <li>
              <button onClick={() => getPage("Dinner")}>Dinner</button>
            </li>
            <li className={styles.sectionTitle}>Manage all foods</li>
            <li>
              <button onClick={() => getPage("Foods")}>Foods</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.right}>{pageHandler()}</div>
    </div>
  );
};

export default Admin;
