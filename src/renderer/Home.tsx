// import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import Reader from './Reader';
import './Home.css';

import { readerConfigType } from '../reducers/types';
import { useState } from "react";

const initConfigState: readerConfigType = {
  language: 'english',
  voice: 'Joanna',
  speed: 100,
};


function Home() {
  const [readerConfig, setReaderConfig] = useState(initConfigState);
  const [readerText, setReaderText] = useState("");

  return (
    <div className="container" >
      <div className="options" >
        <button><Link to={routes.CONFIG}>Configurations</Link></button>
        <button><Link to={routes.SHORTCUTS}>Shortcuts</Link></button>
      </div>
      <hr style={{ width: "100%" }} />
      <div className="body">
        <Reader
          readerConfig={readerConfig} setReaderConfig={setReaderConfig}
          readerText={readerText} setReaderText={setReaderText}
        />
      </div>
    </div>
  );
}

export default Home;