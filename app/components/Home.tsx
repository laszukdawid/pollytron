import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Reader from './Reader';

export default function Home() {
  return (
    <div>
      <div className={styles.container} data-tid="container">
        <h2>PollyTron</h2>
        <Link to={routes.CONFIG}>Configuration</Link>
      </div>
      <div className={styles.body}>
        <Reader />
      </div>
    </div>
  );
}
