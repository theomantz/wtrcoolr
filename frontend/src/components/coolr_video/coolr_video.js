import './coolr.css'
import React from 'react';
import openSocket, { io } from 'socket.io-client';
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
import { Rnd } from 'react-rnd'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "#fffff",
};

class CoolrVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      chatMessage: "",
      messages: [],
      sendSocket: null,
      receiveSocket: null,
      callActive: false,
      receivingCall: false,
      userToCall: '',
      audioMuted: false,
      videoMuted: false,
      streamSource: null,
      hasPeer: true
    };

    this.userVideo = React.createRef();
    this.remoteVideo = React.createRef();
    this.stream = React.createRef();
    this.userPeer = null;
    this.remotePeer = null;

    this.handleChatChange = this.handleChatChange.bind(this);
    this.handleMute = this.handleMute.bind(this);

  }

  componentDidMount() {
    let socketURL = "127.0.0.1:5000";
    if (process.env.NODE_ENV === "production") {
      socketURL =
        process.env.REACT_APP_SOCKET_URL || "https://wtrcoolr.herokuapp.com/";
    }
    this.socket = io(socketURL, { transports: ["websocket"] });
    
    
    const { user } = this.props
    this.socket.on('connect', data => {
      this.setState({ sendSocket: this.socket.id })
      console.log("Client side connection")
      console.log(this.socket.id)
      if( this.socket.id ) {
        console.log(this.socket.id)
        this.props.assignSocket({ user: user, sendSocket: this.socket.id })
      }
    })

    
    this.socket.on("receiveChatMessage", (message) => {
      this.setState({ messages: this.state.messages.concat(message) });
      if( this.props.userMatch.socket !== message.sendSocket ) {
        this.setState({ receiveSocket: message.sendSocket })
      }
      this.chatNotificationSound().play();
    });
    
    this.socket.on("coolr!", (data) => {
      this.setState({
        callActive: true,
        receivingCall: true,
        hasPeer: true
      })
      this.remoteVideo = data.signalData;
      this.remotePeer = data.from;
      // this.ringtoneSound().play()
    });

    this.socket.on('handshake', data => {
      if( data.sendSocket !== this.props.userMatch.socket &&
        data.targetEmail === this.props.user.email ) {
        this.setState({ receiveSocket: data.sendSocket })
      }
    })
    
    let socketToFetch = 
    this.props.user.email === 'theo@example.com' ? 
    'theo2@example.com' : 
    'theo@example.com'
    
    this.props.fetchSocket(socketToFetch)
    this.scrollToBottom();
    this.initiateCall();

    if( !this.state.receiveSocket ) {
      this.socket.emit('handshake', {
        sendSocket: this.socket.id,
        receiveSocket: this.props.userMatch.socket,
        targetEmail: socketToFetch
      })
    }
    
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.acceptCallPrompt();
  }

  acceptCallPrompt() {
    if( this.state.receivingCall ) {
      return (
        null
      )
    }
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
      })
    );
  }

  ringtoneSound() {
    return (
      new Howl({
        src: [ringtone],
        loop: true,
        preload: true,
        volume: 0.1
      })
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
    const { chatMessage, sendSocket } = this.state;
    const { userMatch } = this.props
    const { socket } = userMatch
    if (chatMessage === "") {
      return null;
    }
    const { user } = this.props;
    const { userId, name } = user;
    console.log(socket)
    const time = moment();
    e.preventDefault();
    const message = {
      sendSocket: sendSocket,
      receiveSocket: this.state.receiveSocket || socket,
      chatMessage,
      userId,
      name,
      time,
    }
    this.socket.emit("sendChatMessage", message);
    this.setState({ messages: this.state.messages.concat(message) })
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


  initiateCall() {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {

      const streamSource = new MediaStream(stream)
      this.userVideo = streamSource
      

      const video = document.getElementById('user-video')
      video.srcObject = this.userVideo
      
      
      video.onloadedmetadata = e => {
        video.play();
      };

      this.userPeer = new Peer({
        initiator: true,
        stream: streamSource,
      });

      const { user, userMatch } = this.props;
      const { socket } = userMatch

      this.userPeer.on("signal", (data) => {
        this.socket.emit("callUser", {
          userToCall: socket,
          signalData: data,
          from: user,
        });
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
              <div id="video-grid">
                <Rnd
                  style={style}
                  default={{
                    x: 600,
                    y: -10,
                    width: 500,
                    height: 470,
                  }}
                >
                  <video id="peer-video" playsInline muted autoPlay />
                </Rnd>
                <Rnd
                  style={style}
                  default={{
                    x: 40,
                    y: -10,
                    width: 500,
                    height: 470,
                  }}
                >
                  <video id="user-video" playsInline muted autoPlay />
                </Rnd>
              </div>
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