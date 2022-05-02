import React from "react";
import { Link } from 'react-router-dom';
import './Config.css';
import routes from '../constants/routes.json';

const cmdOrCtrl = 'CMD';
// const cmdOrCtrl = process.platform !== 'darwin' ? 'CTRL' : 'CMD';

export default function Shortcuts() {
  return (
    <div>
      <div className="configNav" style={{ display: "flex", alignItems: "center" }} >
        <div className="backButton">
          <button>
            <Link to={routes.HOME}>
              {/* <i className="fa fa-arrow-left fa-3x" /> */}
              Back
            </Link>
          </button>
        </div>
        <h1>Shortcuts</h1>
      </div>
      <h3>Global shortcuts</h3>
      <span>Press <b>{cmdOrCtrl}+SHIFT+SPACE</b> to read what's in the clipboard. Yes, you don't have to focus the app on it.</span>
      <h3>In app shortcuts</h3>
      <span>Currently none. But just wait...</span>
    </div>
  )
};