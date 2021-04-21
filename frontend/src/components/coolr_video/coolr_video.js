import './coolr.css'
import React from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faMicrophone,
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';
import Peer from 'simple-peer';


class CoolrVideo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      response: null
    }

    this.userVideo = null;
    this.peerVideo = null;
    this.myPeer = null;
    

    this.handleMute = this.handleMute.bind(this)
    
  }
  
  componentDidMount() {
    
  }

  handleJoin() {

  }

  handleMute() {
    this.setState({ audio: !this.state.audio })
  }

  handleVideo() {
    this.setState({ video: !this.state.video })
  }


  render() {
    return (
      <div className="coolr-call container">
        <div className="header">
          <div className="logo">
            <h3>wtrcoolr</h3>
          </div>
        </div>
        <div className="video main">
          <div className="main-left">
            <div id="video-grid-container">
              <div id="video-grid"></div>
            </div>
            <div className="options">
              <div className="options-left">
                <div id="video-icon">
                  <FontAwesomeIcon icon={faVideo} className="option-button" />
                </div>
                <div id="microphone-icon">
                  <FontAwesomeIcon
                    icon={faMicrophone}
                    className="option-button"
                    onClick={this.handleMute}
                  />
                </div>
              </div>
              <div className="options-right"></div>
            </div>
          </div>
          <div className="main-right">
            <div className="main-chat-window">
              <div className="messages"></div>
            </div>
            <div className="main-message-container">
              <input 
                id='chat_message' 
                type='text' 
                autoComplete='off' 
                placeholder='type a message' />
              <div id="send-icon">
                <FontAwesomeIcon icon={faPaperPlane} className='option-button'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoolrVideo