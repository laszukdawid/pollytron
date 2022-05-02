import React, { useState } from 'react';
// import { updateAwsConfig } from "../../app/controllers/aws";
import { Link } from 'react-router-dom';
import styles from './Config.css';
import routes from '../constants/routes.json';
import { awsConfigType } from '../reducers/types';
// import { ipcRenderer } from 'electron';

type Props = {
  awsConfig: awsConfigType,
  updateAwsConfig: (awsConfigType: awsConfigType) => void,
};



function Config(props: Props) {
  const { awsConfig } = props;
  const updateConfig = props.updateAwsConfig;

  const [profile, setProfile] = useState("polly");
  const [region, setRegion] = useState("us-west-2");
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretAccessKey, setSecretAccessKey] = useState("");
  // const [profile, setProfile] = useState(awsConfig.profile);
  // const [region, setRegion] = useState(awsConfig.region);
  // const [accessKeyId, setAccessKeyId] = useState(awsConfig.accessKeyId);
  // const [secretAccessKey, setSecretAccessKey] = useState(awsConfig.secretAccessKey);

  const submitConfig = () => {
    const newConfig: awsConfigType = { region, accessKeyId, secretAccessKey, profile };
    updateConfig(newConfig)
    // updateAwsConfig(newConfig)
  }

  const submitProfile = () => {
    // const newAwsConfig: awsConfigType = ipcRenderer.sendSync("profile", profile);
    // setRegion(newAwsConfig.region)
    // setAccessKeyId(newAwsConfig.accessKeyId)
    // setSecretAccessKey(newAwsConfig.secretAccessKey)
  }

  return (
    <div className="configPage" >
      {/* TODO: Honestly, not sure why CSS is not being populated... eh. */}
      <div className="configNav" style={{ display: "flex", alignItems: "center" }} >
        <div className="backButton">
          <button>
            <Link to={routes.HOME}>
              {/* <i className="fa fa-arrow-left fa-3x" /> */}
              Back
            </Link>
          </button>
        </div>
        <h1>Configuration</h1>
        <button type='submit' onClick={submitConfig} >
          <i className="fa fa-save" />
          Save
        </button>
      </div>

      <div className="config" >
        <div className="awsConfig">
          <h2 className="item">AWS Config</h2>
          <span className="item" >You can either lookup credentials by using the profile field, or fill the form manually.</span>
          <form className="item">
            <span style={{ gridRow: 1, gridColumnStart: 1, gridColumnEnd: 4 }} >AWS profile</span>
            <input style={{ gridRow: 1, gridColumnStart: 4, gridColumnEnd: 10 }}
              type="text" value={profile} onChange={ev => setProfile(ev.target.value)} placeholder={"polly"} />
            <button style={{ gridRow: 1, gridColumnStart: 10, gridColumnEnd: 12 }} onClick={submitProfile} >
              <i className="fas fa-search" />
              <span style={{ fontSize: "x-small" }} >Search</span>
            </button>

            <span style={{ gridRow: 2, gridColumnStart: 1, gridColumnEnd: 4 }} >AWS region</span>
            <input style={{ gridRow: 2, gridColumnStart: 4, gridColumnEnd: 10 }}
              type="text" value={region} onChange={ev => setRegion(ev.target.value)} placeholder={"us-west-2"} />

            <span style={{ gridRow: 3, gridColumnStart: 1, gridColumnEnd: 4 }} >Access Key</span>
            <input style={{ gridRow: 3, gridColumnStart: 4, gridColumnEnd: 10 }}
              type="text" value={accessKeyId} onChange={ev => setAccessKeyId(ev.target.value)} />

            <span style={{ gridRow: 4, gridColumnStart: 1, gridColumnEnd: 4 }} >Secret Key</span>
            <input style={{ gridRow: 4, gridColumnStart: 4, gridColumnEnd: 10 }}
              type="text" value={secretAccessKey} onChange={ev => setSecretAccessKey(ev.target.value)} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Config;