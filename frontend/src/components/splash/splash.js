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
            <h1>How does it work?</h1>
            <div className="feature-row">
              <h2><strong>1. </strong>Join an organization</h2>
              <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_jacuxkpv.json"  background="transparent"  speed="1"  style={{width: '200px', height: '200px'}}  loop autoplay></lottie-player>
            </div>
            <div className="feature-row">
            <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_ygrktkrl.json"  background="transparent"  speed="1"  style={{width: '200px', height: '200px'}}  loop autoplay></lottie-player>
              
              <h2><strong>2. </strong>Wait for designated Coolr Time</h2>
            </div>
            <div className="feature-row">
              <h2><strong>3. </strong>Video chat with a stranger</h2>
              <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_6awaiv9e.json"  background="transparent"  speed="1"  style={{width: '200px', height: '200px'}}  loop autoplay></lottie-player>
            </div>
            
            
            
            
          </div>

          <div className="team-div">
            <h1>Team Members</h1>
            <div className="team">
            
            <div className="team-member">
                  <img className="team-member-pic" src={jack} />
                  <strong>Jack Egbert</strong>
                  Backend Engineer
                  <div className="socmed-icons">
                  <a href="https://github.com/jhnegbrt" target="_blank">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/jack-egbert/" target="_blank">
                      <i className="fab fa-linkedin"></i>
                  </a>
                  </div>
            </div>

            <div className="team-member">
                  <img className="team-member-pic" src={theo} />
                  <strong>Theo Mantz</strong>
                  Project Lead
                  <div className="socmed-icons">
                  <a href="https://github.com/theomantz" target="_blank">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/theo-mantz/" target="_blank">
                      <i className="fab fa-linkedin"></i>
                  </a>
                  </div>
            </div>

            <div className="team-member">
                  <img className="team-member-pic" src={gino} />
                  <strong>Gino Reyes</strong>
                  Frontend Engineer
                  <div className="socmed-icons">
                  <a href="https://github.com/grmreyes" target="_blank">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/grmreyes/" target="_blank">
                      <i className="fab fa-linkedin"></i>
                  </a>
                  </div>
            </div>

            <div className="team-member">
                  <img className="team-member-pic" src={everett} />
                  <strong>Everett Smith</strong>
                  Full-Stack Engineer
                  <div className="socmed-icons">
                  <a href="https://github.com/evrtt" target="_blank">
                      <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/everett-smith-924798153/" target="_blank">
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