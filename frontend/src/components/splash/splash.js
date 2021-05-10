import React from 'react';
import watercooler from '../../assets/watercooler.png'; 
import jack from '../../assets/je.jpg'; 
import theo from '../../assets/tm.jpg'; 
import gino from '../../assets/gr.jpg'; 
import everett from '../../assets/es.jpg'; 
import './splash.css'



class Splash extends React.Component {
  constructor(props){
    super(props)
    this.state={
      modal: true
    }
  }

  componentDidMount(){
    this.props.openModal("welcome")
  }
 
  render() {
     
      return (
        <div className="splash-container">
          <div className="main-div">
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
          <div className="features-div">
            <h1>Features</h1>


          </div>

          <div className="team-div">
            <h1>Team Members</h1>
            <div className="team">
            
            <div className="team-member">
                  <img className="team-member-pic" src={jack} />
                  <strong>Jack Egbert</strong>
                  Backend Engineer
                  <div className="socmed-icons">
                  <a href="https://github.com/jhnegbrt">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/jack-egbert/">
                      <i className="fab fa-linkedin"></i>
                  </a>
                  </div>
            </div>

            <div className="team-member">
                  <img className="team-member-pic" src={theo} />
                  <strong>Theo Mantz</strong>
                  Project Lead
                  <div className="socmed-icons">
                  <a href="https://github.com/theomantz">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/theo-mantz/">
                      <i className="fab fa-linkedin"></i>
                  </a>
                  </div>
            </div>

            <div className="team-member">
                  <img className="team-member-pic" src={gino} />
                  <strong>Gino Reyes</strong>
                  Frontend Engineer
                  <div className="socmed-icons">
                  <a href="https://github.com/grmreyes">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/grmreyes/">
                      <i className="fab fa-linkedin"></i>
                  </a>
                  </div>
            </div>

            <div className="team-member">
                  <img className="team-member-pic" src={everett} />
                  <strong>Everett Smith</strong>
                  Full-Stack Engineer
                  <div className="socmed-icons">
                  <a href="https://github.com/evrtt">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/everett-smith-924798153/">
                      <i className="fab fa-linkedin"></i>
                  </a>
                  </div>
            </div>
                
            </div>
          </div>
          


        </div>
      );
  }
}

export default Splash;