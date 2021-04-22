import './coolr.css'
import React from 'react';
import openSocket from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faMicrophone,
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';
import Peer from 'simple-peer';
import moment from 'moment';
import { Howl } from 'howler'
import notificationSound from '../../sounds/chat-notif.mp3'
import notificationSound2 from '../../sounds/chat-notif-2.mp3'
import ringtone from '../../sounds/ringtone.mp3'

class CoolrVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      chatMessage: "",
      messages: [],
      socketId: null,
      callActive: false,
      userToCall: '',
      audioMuted: false,
      videoMuted: false,
      streamURL: null,
    };

    this.userVideo = React.createRef();
    this.peerVideo = React.createRef();
    this.stream = React.createRef();
    this.myPeer = null;
    this.remotePeer = null;

    this.handleChatChange = this.handleChatChange.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.sendCall = this.sendCall.bind(this);
    this.renderVideo = this.renderVideo.bind(this)
  }

  componentDidMount() {
    let socketURL = "127.0.0.1:5000";
    if (process.env.NODE_ENV === "production") {
      socketURL =
        process.env.REACT_APP_SOCKET_URL || "https://wtrcoolr.herokuapp.com/";
    }
    this.socket = openSocket(socketURL, { transports: ["websocket"] });
    
    
    const { user } = this.props
    this.socket.on('connect', data => {
      this.setState({ socketId: this.socket.id || this.state.socketId })
      if( this.state.socketId ) {
        this.props.assignSocket({ user: user, socketId: this.state.socketId })
      }
    })
    
    this.socket.on("receiveChatMessage", (message) => {
      this.setState({ messages: this.state.messages.concat(message) });
      this.chatNotificationSound();
    });

    this.socket.on("coolr!", (data) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          const peer = new Peer({});
        });
    });

    this.getUserVideo();

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.socket.off('connect');
    if( this.stream.current ) {
      this.stream.getTracks()
        .forEach(track => track.stop())
    }
  }

  chatNotificationSound() {
    return (
      new Howl({
        src: [notificationSound],
        loop: false,
        preload: true,
        volume: 0.1
      }).play()
    );
  }

  ringtoneSound() {
    return (
      new Howl({
        src: [ringtone],
        loop: true,
        preload: true,
        volume: 0.1
      }).play()
    )
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  handleChatChange = (e) => {
    this.setState({
      chatMessage: e.currentTarget.value,
    });
  };

  handleUserInputChange = e => {
    this.setState({
      userToCall: e.currentTarget.value
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.submitChatMessage(e);
    }
  };

  submitChatMessage = (e) => {
    const { chatMessage } = this.state;
    if (chatMessage === "") {
      return null;
    }
    const { user } = this.props;
    const { userId, name } = user;
    const time = moment();
    e.preventDefault();
    this.socket.emit("sendChatMessage", {
      chatMessage,
      userId,
      name,
      time,
    });
    this.setState({ chatMessage: "" });
  };

  renderMessages() {
    if (!this.state.messages.length) return null;
    const messages = this.state.messages.map((message) => {
      return (
        <li key={uuidv4()} className="message">
          <b>{message.name}</b>
          <span>{message.chatMessage}</span>
        </li>
      );
    });
    return <ul className="chat-message-list">{messages}</ul>;
  }

  handleMute() {
    this.setState({ audio: !this.state.audio });
  }

  handleVideo() {
    this.setState({ video: !this.state.video });
  }

  sendCall(e) {
    e.preventDefault()
    this.setState({ 
      callActive: true
    })
  }

  constructPeer(stream) {
    this.myPeer = new Peer({
      initiator: true,
      stream: stream,
    });
    if( this.myPeer ) {
      this.sendPeerSignal()
    }
  }

  sendPeerSignal() {
    const { user } = this.props;
    const { userToCall } = this.state;
    this.myPeer.on("signal", (data) => {
      this.socket.emit("callUser", {
        userToCall: userToCall,
        signalData: data,
        from: user,
      });
    });
  }

  getUserVideo() {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {

      console.log(stream)
      
      this.userVideo = stream;
      
      debugger
      
      this.setState({ 
        streamURL: window.URL.createObjectURL(stream)
      })
      
      this.constructPeer(stream)
    })
    .catch((err) => console.log(err));
  }

  renderUserVideo() {
    console.log(this.userVideo)
    return (
      <div className='user-video-container'>
        <video
          className='user-video'
          playsInline
          muted
          ref={el => this.userVideo = el} 
          autoPlay>
            <source src={this.stream}/>
          </video>
      </div>
    )
  }

  renderVideo() {
    debugger
    if( !this.stream.current ) return null
    return (
      <div id="video-grid">
        {this.renderUserVideo()}
      </div>
    );
  }

  handleCall() {
    if( !this.state.callActive ) {
      return (
        <div className='call-prompt container'>
          <label className='call-label'>Whomst've?
            <form 
              onSubmit={this.sendCall}
              className='call-form'>
                <input
                  type='text'
                  name='peer'
                  value={this.state.userToCall}
                  onChange={e => this.setState({userToCall: e.currentTarget.value})}
                  />
            <button className='submit-button'>Call</button>
            </form>
          </label>
        </div>
      )
    }
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
                {this.handleCall()}
                {this.renderVideo()}
            </div>
            <div className="options">
              <div className="options-left">
                <div id="video-icon">
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="option-button video"
                  />
                </div>
                <div id="microphone-icon">
                  <FontAwesomeIcon
                    icon={faMicrophone}
                    className="option-button microphone"
                    onClick={this.handleMute}
                  />
                </div>
              </div>
              <div className="options-right"></div>
            </div>
          </div>
          <div className="main-right">
            <div className="main-chat-window">
              <div className="messages">
                <span>{this.state.response}</span>
                {this.renderMessages()}
                <div
                  ref={(el) => {
                    this.messagesEnd = el;
                  }}
                ></div>
              </div>
            </div>
            <div className="main-message-container">
              <input
                id="chat_message"
                type="text"
                autoComplete="off"
                placeholder="type a message"
                value={this.state.chatMessage}
                onChange={this.handleChatChange}
                onKeyPress={this.handleKeyPress}
              />
              <div id="send-icon">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="option-button"
                  onClick={this.submitChatMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoolrVideo