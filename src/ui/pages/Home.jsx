import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.hero}>
                <h1 className={styles.title}>Modular Chess AI Engine</h1>
                <p className={styles.subtitle}>
                    A state-of-the-art platform to play, test, and analyze advanced chess algorithms.
                </p>
            </div>

            <div className={styles.grid}>
                {/* Play against AI */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={styles.icon}>♟️</span>
                        <h2 className={styles.cardTitle}>Play vs AI</h2>
                        <p className={styles.cardDescription}>
                            Challenge our powerful AI engines in single matches. Customize difficulty, time controls, and play as white or black.
                        </p>
                    </div>
                    <div className={styles.cardAction}>
                        <Link to="/play" className={`${styles.button} ${styles.btnPrimary}`}>
                            Start Playing
                        </Link>
                    </div>
                </div>

                {/* Run AI tournaments */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={styles.icon}>🏆</span>
                        <h2 className={styles.cardTitle}>Run Tournaments</h2>
                        <p className={styles.cardDescription}>
                            Pit various AI models against each other in automated round-robin or knockout tournaments.
                        </p>
                    </div>
                    <div className={styles.cardAction}>
                        <Link to="/tournament" className={`${styles.button} ${styles.btnSecondary}`}>
                            Create Tournament
                        </Link>
                    </div>
                </div>

                {/* Analyze games */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={styles.icon}>📊</span>
                        <h2 className={styles.cardTitle}>Analyze Games</h2>
                        <p className={styles.cardDescription}>
                            Review past matches using detailed engine evaluations, move statistics, and deep position analysis.
                        </p>
                    </div>
                    <div className={styles.cardAction}>
                        <Link to="/replay" className={`${styles.button} ${styles.btnOutline}`}>
                            View Replays
                        </Link>
                    </div>
                </div>

                {/* Project architecture overview */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={styles.icon}>🏗️</span>
                        <h2 className={styles.cardTitle}>Architecture</h2>
                        <p className={styles.cardDescription}>
                            Explore the modular design behind the engine. View documentation, performance metrics, and engine interfaces.
                        </p>
                    </div>
                    <div className={styles.cardAction}>
                        <Link to="/about" className={`${styles.button} ${styles.btnOutline}`}>
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
