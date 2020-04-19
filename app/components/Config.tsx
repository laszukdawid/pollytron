import React, { useState } from 'react';
import { updateAwsConfig } from "../controllers/aws";
import { Link } from 'react-router-dom';
import styles from './Config.css';
import routes from '../constants/routes.json';
import { awsConfigType } from '../types';

type Props = {
  awsConfig: awsConfigType,
  updateAwsConfig: (awsConfigType: awsConfigType) => void,
};

export default function Config(props: Props) {
  const { awsConfig } = props;
  const updateConfig = props.updateAwsConfig;

  const [region, setRegion] = useState(awsConfig.region);
  const [accessKeyId, setAccessKeyId] = useState(awsConfig.accessKeyId);
  const [secretAccessKey, setSecretAccessKey] = useState(awsConfig.secretAccessKey);

  const submitConfig = () => {
    const newConfig: awsConfigType = { region, accessKeyId, secretAccessKey };
    updateConfig(newConfig)
    updateAwsConfig(newConfig)
  }

  return (
    <div className={styles.configPage} >
      <div className={styles.configNav} 
      style={{display: "flex"}}
      >
        <div className={styles.backButton}>
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <h1>Configuration</h1>
        <button type='submit' onClick={submitConfig} >
          <i className="fa fa-save" />
          Save
        </button>
      </div>

      <div className={styles.config} >
        <div className={styles.awsConfig}>
          <h2>AWS Config</h2>
          <form>
              <span style={{gridRow: 1, gridColumn: 1}} >AWS region</span>
              <input style={{gridRow: 1, gridColumnStart: 2, gridColumnEnd: 4}} type="text" value={region} onChange={ev => setRegion(ev.target.value)} />

              <span style={{gridRow: 2, gridColumn: 1}} >Access Key</span>
              <input style={{gridRow: 2, gridColumnStart: 2, gridColumnEnd: 4}} type="text" value={accessKeyId} onChange={ev => setAccessKeyId(ev.target.value)} />

              <span style={{gridRow: 3, gridColumn: 1}} >Secret key</span>
              <input style={{gridRow: 3, gridColumnStart: 2, gridColumnEnd: 4}} type="text" value={secretAccessKey} onChange={ev => setSecretAccessKey(ev.target.value)} />
          </form>
        </div>
      </div>
    </div>
  );
}

