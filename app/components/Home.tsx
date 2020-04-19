import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Reader from './Reader';

export default function Home() {
  return (
    <div className={styles.container} >
      <div className={styles.options} >
        <Link to={routes.CONFIG}>Configurations</Link>
      </div>
      <hr style={{width: "100%"}} />
      <div className={styles.body}>
        <Reader />
      </div>
    </div>
  );
}
