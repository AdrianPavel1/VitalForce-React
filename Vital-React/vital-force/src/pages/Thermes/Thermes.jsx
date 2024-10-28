import styles from './Thermes.module.css';

const Thermes = () => {
  return (
    <div>
      <header className={styles.header}>
        <h1>Terms and Conditions</h1>
        <p>Effective Date: September 14, 2024</p>
      </header>

      <main className={styles.termsContainer}>
        <section className={styles.termsContent}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Vital Force, a fitness platform based in Romania. By using
            our services, you agree to the following terms and conditions. Please
            read them carefully before registering and using the platform.
          </p>

          <h2>2. User Accounts</h2>
          <p>
            To access certain features of the platform, users must create an
            account. You are responsible for maintaining the confidentiality of
            your login credentials and are fully responsible for all activities
            that occur under your account.
          </p>

          <h2>3. Fitness Tracking and Advice</h2>
          <p>
            Our platform offers tools to track your fitness progress and provides
            general fitness advice. However, we are not liable for any injuries or
            health issues that may result from using our recommendations. Always
            consult a healthcare professional before starting any new fitness
            program.
          </p>

          <h2>4. Downloadable Apps</h2>
          <p>
            The fitness apps available for download are provided "as-is" without
            any warranties. We do not guarantee that the apps will meet your
            expectations or that they will function without interruptions or
            errors.
          </p>

          <h2>5. User-Generated Content</h2>
          <p>
            Users may share their progress, comments, and other content on the
            platform. By submitting content, you grant us the right to use,
            display, and distribute such content on the platform.
          </p>

          <h2>6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account if you
            violate any of these terms. You may also terminate your account at any
            time.
          </p>

          <h2>7. Amendments</h2>
          <p>
            We may update these terms and conditions from time to time. You will
            be notified of any significant changes, and your continued use of the
            platform signifies your acceptance of the updated terms.
          </p>

          <h2>8. Contact Information</h2>
          <p>
            If you have any questions about these terms, please contact us at
            support@vitalforce.ro.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Vital Force. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Thermes;
