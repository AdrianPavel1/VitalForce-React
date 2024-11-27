import styles from "./Personal.module.css";
import dragon1 from "../../images/dragon_1.jpg";
import trainer1 from "./imagesTrainers/trainer1.jpg";
import trainer2 from "./imagesTrainers/trainer2.jpg";
import trainer3 from "./imagesTrainers/trainer3.jpg";
import trainer4 from "./imagesTrainers/trainer4.jpg";
import trainer5 from "./imagesTrainers/trainer5.jpg";
import trainer6 from "./imagesTrainers/trainer6.jpg";
import Ceo from "./imagesTrainers/Ceo.png";
const Personal = () => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.slider} style={{ "--quantity": 6 }}>
          <div className={styles.item} style={{ "--position": 1 }}>
            <img src={trainer1} alt="" />
          </div>
          <div className={styles.item} style={{ "--position": 2 }}>
            <img src={trainer2} alt="" />
          </div>
          <div className={styles.item} style={{ "--position": 3 }}>
            <img src={trainer3} alt="" />
          </div>
          <div className={styles.item} style={{ "--position": 4 }}>
            <img src={trainer4} alt="" />
          </div>
          <div className={styles.item} style={{ "--position": 5 }}>
            <img src={trainer5} alt="" />
          </div>
          <div className={styles.item} style={{ "--position": 6 }}>
            <img src={trainer6} alt="" />
          </div>
        </div>
        <div className={styles.content}>
          <h1 data-content="Vital Team">Vital Team</h1>
          <div className={styles.model}></div>
        </div>
      </div>
    </>
  );
};

export default Personal;
