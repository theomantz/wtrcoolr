import './coolr.css'
import React from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faVideo, 
  faMicrophone,
  faPlus 
} from '@fortawesome/free-solid-svg-icons'
import Peer from 'simple-peer';


class CoolrVideo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      response: null
    }
    
  }


  render() {
    return(
      <div className='coolr-call container'>
        <div className='header'>
          <div className='logo'>
            <h3>wtrcoolr</h3>
          </div>
        </div>
        <div className='video main'>
          <div className='main-left'>
            <div id='video-grid-container'>
              <div id='video-grid'>

              </div>
            </div>
            <div className='options'>
              <div className='options-left'>
                <div id='video-icon'>
                  <FontAwesomeIcon icon={faVideo} />
                </div>
                <div id='microphone-icon'>
                  <FontAwesomeIcon icon={faMicrophone} />
                </div>
              </div>
              <div className='options-right'>

              </div>
            </div>
          </div>
          <div className='main-right'>
            <div className='main-chat-window'>
              <div className='messages'>
                
              </div>
            </div>
            <div className='main-messages-container'>
              <div id='send-icon'>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CoolrVideo