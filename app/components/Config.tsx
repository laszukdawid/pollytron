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
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <h1>Configuration</h1>
      </div>
      <div className={styles.config} >
        <form>
          <div className="row" >
            <span>AWS region</span>
            <input type="text" value={region} onChange={ev => setRegion(ev.target.value)} />
          </div>
          <div className="row" >
            <span>Access Key</span>
            <input type="text" value={accessKeyId} onChange={ev => setAccessKeyId(ev.target.value)} />
          </div>
          <div className="row" >
            <span>Secret key</span>
            <input type="text" value={secretAccessKey} onChange={ev => setSecretAccessKey(ev.target.value)} />
          </div>
          <button type='submit' onClick={submitConfig} >Save</button>
        </form>
      </div>
      <div>
        <span></span>
      </div>
    </div>
  );
}

