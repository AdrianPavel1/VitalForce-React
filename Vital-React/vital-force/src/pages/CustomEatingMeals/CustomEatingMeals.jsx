import styles from "./CustomEatingMeals.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import backgroundVideo from "../../images/customEating.mp4";
function CustomEatingMeals() {
  return (
    <>
      <div className={styles.videoContainer}>
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.gradientOverlay}></div>
        <Header />
        <div className={styles.intro}>
          <h1>Custom Eating Meals</h1>
          <div className={styles.Line}></div>
          <p className={styles.firstP}>
            We created custom eating plans for your goal!
          </p>
          <p>Just select one of the options bellow and see what it brings</p>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.contentContainer}>
            <h1>
              {" "}
              Meals for <span>Username</span>
            </h1>

            <div className={styles.orderPanel}>
              <div className={styles.orderSection}>
                <div className={styles.menuItem}>
                  <div className={styles.photoSpace}>
                    <img
                      src="images/sample-food.jpg"
                      alt="Meal Image"
                      className={styles.roundImage}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <h2>Meal Title</h2>
                    <p>Description of the meal goes here.</p>
                    {/* Dropdown pentru detalii */}
                    <select className={styles.mealSelect}>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </div>
                </div>

                {/* Butoane pentru stânga și dreapta */}
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.navButton} ${styles.leftButton}`}
                  >
                    &lt; Prev
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.rightButton}`}
                  >
                    Next &gt;
                  </button>
                </div>

                {/* Butonul SHOW MEAL */}
                <button className={styles.bigButton}>SHOW MEAL</button>
              </div>
            </div>
          </div>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity (grams)</th>
                  <th>Proteins</th>
                  <th>Carbohydrates</th>
                  <th>Fat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Poached eggs with smoked salmon and bubble & squeak</td>
                  <td>310 kcal</td>
                  <td>19.00</td>
                  <td>29.00</td>
                  <td>13.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.mealContainer}>
        <h2>Here is an image of how your meal suppose to look</h2>
        <div className={styles.mealPicture}></div>
      </div>

      <Footer />
    </>
  );
}

export default CustomEatingMeals;
