import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import Reader from './Reader';

import { textStateType, readerConfigType } from '../reducers/types';

type Props = {
  setReaderConfig: Function,
  setReaderText: (text: textStateType) => void,
  readerConfig: readerConfigType,
  readerText: textStateType,
}

export default function Home(props: Props) {
  return (
    <div className={styles.container} >
      <div className={styles.options} >
        <Link to={routes.CONFIG}>Configurations</Link>
        <Link to={routes.SHORTCUTS}>Shortcuts</Link>
      </div>
      <hr style={{width: "100%"}} />
      <div className={styles.body}>
        <Reader
          readerConfig={props.readerConfig} setReaderConfig={props.setReaderConfig}
          readerText={props.readerText} setReaderText={props.setReaderText}
          />
      </div>
    </div>
  );
}
