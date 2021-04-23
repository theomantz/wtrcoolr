import React from 'react';
import watercooler from '../../assets/watercooler.png'; 
import './splash.css'



class Splash extends React.Component {
 
  render() {
     
      return (
        <div className="splash-container">
            <img className="watercooler" src={watercooler} />
            <div>
            <h1>WTRCOOLR</h1>
            <p>We're bringing awkward water cooler encounters online.</p>
            </div>
        </div>
      );
  }
}

export default Splash;