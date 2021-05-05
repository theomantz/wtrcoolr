import React from 'react';
import watercooler from '../../assets/watercooler.png'; 
import './splash.css'



class Splash extends React.Component {
 
  render() {
     
      return (
        <div>
          <div className="splash-container">
              <img 
                className="watercooler-img" 
                src={watercooler} 
                alt='people-at-cooler'/>
                
              <div 
                className='splash-text-container'>
                <h1 
                  className='splash-header'
                  >WTRCOOLR
                </h1>
                <p 
                  className='splash-text'>
                  We're disrupting the watercooler chat industry.
                </p>
              </div>
          </div>
          <div class="footer">
              <a href="https://github.com/theomantz/wtrcoolr">
                  <i class="fab fa-github"></i>
              </a>
          </div>
        </div>
      );
  }
}

export default Splash;