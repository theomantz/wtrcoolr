import './coolr.css'
import React from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faMicrophone,
  faPaperPlane, 
} from '@fortawesome/free-solid-svg-icons';
import Peer from 'simple-peer';
import moment from 'moment';
import { Howl } from 'howler'
import notificationSound from '../../sounds/chat-notif.mp3'
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
      hasPeer: true,
      synced: false
    };

    this.userVideo = React.createRef();
    this.remoteVideo = React.createRef();
    this.stream = React.createRef();
    this.userPeer = null;
    this.remotePeer = null;


    this.videoGridWidth = null;
    this.videoGridHeight = null;
    
    this.setState = this.setState.bind(this)
    this.handleChatChange = this.handleChatChange.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.handleVideo = this.handleVideo.bind(this);

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
      if( this.socket.id ) {
        this.props.assignSocket({ user: user, sendSocket: this.socket.id })
        this.props.fetchSocket(socketToFetch);
      }
    })

    
    this.socket.on("receiveChatMessage", (message) => {
      this.setState({ messages: this.state.messages.concat(message) });
      if( this.props.userMatch.socket !== message.sendSocket ) {
        this.setState({ receiveSocket: message.sendSocket })
      }
      this.chatNotificationSound().play();
    });
    
    this.socket.on('handshake', data => {
      this.setState( { receiveSocket: data.sendSocket } )
      this.socket.emit('sync', {
        to: this.state.receiveSocket,
        from: this.socket.id
      })
    })

    this.socket.on('sync', data => {
      this.setState({
        synced: true,
        receiveSocket: data.from
      })
    })

    if (this.state.receiveSocket && this.userPeer) {
      const { user } = this.props;
      const { receiveSocket } = this.state;

      this.userPeer.on("signal", (data) => {
        this.socket.emit("callUser", {
          userToCall: receiveSocket,
          signalData: data,
          from: user,
        });
      });

      this.userPeer.on("stream", (stream) => {
        const peerVideo = document.getElementById("peer-video");
        if ("srcObject" in peerVideo) {
          peerVideo.srcObject = stream;
        } else {
          peerVideo.src = window.URL.createObjectURL(stream);
        }
      });
    }

    this.socket.on("coolr!", (data) => {
      console.log('Receiving call')
      this.setState({
        callActive: true,
        receivingCall: true,
        hasPeer: true
      })
      debugger
      if( this.userVideo ) {
        const { user } = this.props;
        const { receiveSocket } = this.state;

        this.userPeer.on("signal", (data) => {
          this.socket.emit("callUser", {
            userToCall: receiveSocket,
            signalData: data,
            from: user,
          });
        });

        this.userPeer.on("stream", (stream) => {
          const peerVideo = document.getElementById("peer-video");
          if ("srcObject" in peerVideo) {
            peerVideo.srcObject = stream;
          } else {
            peerVideo.src = window.URL.createObjectURL(stream);
          }
        });
      }
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {

          const streamSource = new MediaStream(stream)
          this.userVideo = streamSource
          

          const video = document.getElementById('peer-video')
          video.srcObject = this.userVideo
          
          this.stream = stream;
          video.onloadedmetadata = e => {
            video.play();
          };


          this.userPeer = new Peer({
            initiator: this.props.initiator,
            stream: streamSource,
          });


          if( this.state.receiveSocket && !this.stream ) {

            const { user } = this.props;
            const { receiveSocket } = this.state
            
            this.userPeer.on("signal", (data) => {
              this.socket.emit("callUser", {
                userToCall: receiveSocket,
                signalData: data,
                from: user,
              });
            });

            this.userPeer.on("stream", stream => {
              const peerVideo = document.getElementById('peer-video')
              if( 'srcObject' in peerVideo ) {
                peerVideo.srcObject = stream
              } else {
                peerVideo.src = window.URL.createObjectURL(stream)
              }
            }) 
          }
        }).catch(err => console.log(err))
    })

    if( this.props.initiator ) {
      this.initiateCall()
    }

    this.videoGridWidth = document.getElementById("video-grid").clientWidth;
    this.videoGridHeight = document.getElementById("video-grid").clientHeight;
    
    let socketToFetch =
    this.props.user.email === 'theo@example.com' ? 
    'theo2@example.com' : 
    'theo@example.com'
    
    this.scrollToBottom();
    this.initiateCall();

    const { userMatch } = this.props
    if( !this.state.synced && !!userMatch.socket ) {
      this.socket.emit('handshake', {
        sendSocket: this.socket.id,
        receiveSocket: userMatch.socket,
        targetId: userMatch.id
      })
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
    this.props.fetchSocket(this.props.userMatch)
    const { userMatch } = this.props;
    if ( !this.state.synced && userMatch && !this.stream.current ) {
      this.socket.emit("handshake", {
        sendSocket: this.socket.id,
        receiveSocket: userMatch.socket,
        targetId: userMatch.user,
      });
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

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.submitChatMessage(e);
    }
  };

  submitChatMessage = (e) => {
    const { 
      chatMessage, 
      receiveSocket, 
      sendSocket } = this.state
    if (chatMessage === "") {
      return null;
    }

    const { user } = this.props;
    const { userId, name } = user;
    const time = moment();
    e.preventDefault();
    const message = {
      sendSocket: sendSocket,
      receiveSocket: receiveSocket,
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
    if(this.stream) {
      this.setState({ audioMuted: !this.state.audioMuted })
      this.stream.getAudioTracks()[0].enabled = this.state.audioMuted
    }
  }

  handleVideo() {
    if(this.stream) {
      this.setState({ videoMuted: !this.state.videoMuted });
      this.stream.getVideoTracks()[0].enabled = this.state.videoMuted
    }
  }


  initiateCall() {
    navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {

      const streamSource = new MediaStream(stream)
      this.userVideo = streamSource
      
      this.stream = stream
      const video = document.getElementById('user-video')
      video.srcObject = this.userVideo
      
      
      video.onloadedmetadata = e => {
        video.play();
      };


      this.userPeer = new Peer({
        initiator: this.props.initiator,
        stream: streamSource,
      });


      if( this.state.receiveSocket ) {

        const { user } = this.props;
        const { receiveSocket } = this.state
        
        this.userPeer.on("signal", (data) => {
          this.socket.emit("callUser", {
            userToCall: receiveSocket,
            signalData: data,
            from: user,
          });
        });

        this.userPeer.on("stream", stream => {
          const peerVideo = document.getElementById('peer-video')
          if( 'srcObject' in peerVideo ) {
            peerVideo.srcObject = stream
          } else {
            peerVideo.src = window.URL.createObjectURL(stream)
          }
        })
        
      }
    })
    .catch((err) => console.log(err));
  }

  render() {
    const gridWidth = this.videoGridWidth || 470;
    const gridHeight = this.videoGridHeight || 500;
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
                    width: gridWidth,
                    height: gridHeight,
                  }}
                >
                  <video id="peer-video" playsInline autoPlay />
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
                    className={`option-button video ${this.state.videoMuted}`}
                    onClick={this.handleVideo}
                  />
                </div>
                <div id="microphone-icon">
                  <FontAwesomeIcon
                    icon={faMicrophone}
                    className={`option-button microphone ${this.state.audioMuted}`}
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