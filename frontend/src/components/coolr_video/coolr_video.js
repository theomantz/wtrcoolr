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
      socketId: [],
    };

    this.userVideo = null;
    this.peerVideo = null;
    this.myPeer = null;

    this.handleChatChange = this.handleChatChange.bind(this);
    this.handleMute = this.handleMute.bind(this);
  }

  componentDidMount() {
    let socketURL = "127.0.0.1:5000";
    if (process.env.NODE_ENV === "production") {
      socketURL =
        process.env.REACT_APP_SOCKET_URL || "https://wtrcoolr.herokuapp.com/";
    }
    this.socket = openSocket(socketURL, { transports: ["websocket"] });
    const { user } = this.props
    this.props.assignSocket({ user: user, socketId: this.socket.id })

    this.socket.on("FromAPI", (data) => {
      this.setState({ response: data })
    });
    
    this.socket.on('connect', data => {
      this.setState({ socketId: this.socket.id })
      this.props.assignSocket({ user: user, socketId: this.state.socketId })
      console.log(this.socket.id)
      console.log(this.state.socketId)
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

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    return () => this.socket.disconnect;
  }

  chatNotificationSound() {
    return (
      new Howl({
        src: [notificationSound],
        loop: false,
        preload: true,
      }).play()
    );
  }

  ringtoneSound() {
    return (
      new Howl({
        src: [ringtone],
        loop: true,
        preload: true
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

  handleUserInputSubmit(e) {
    const { userToCall } = this.state
    
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

  handleCall() {
    if( !this.state.call ) {
      return (
        <div className='call-prompt container'>
          <form 
            onSubmit={this.handleCall}
            className='call-form'>
              <input
                type='text'
                name='peer'/>

          </form>
        </div>
      )
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const peer = new Peer({
          initiator: true,
          stream: stream,
        });

        peer.on("signal", (data) => {
          this.socket.current.emit("callUser", {});
        });
      })
      .catch((err) => console.log(err));
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