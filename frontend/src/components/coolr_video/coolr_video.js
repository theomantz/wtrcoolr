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

/* Upcoming features: 
- Video chat
- Chat timeout function for initial 90 seconds and then automatically 
cancelling the call at 5 minutes  */

class CoolrVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      chatMessage: "",
      messages: [],
      connected: false,
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
    this.peerVideo = React.createRef();
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
    
    let socketToFetch =
      this.props.user.email === "theo@example.com"
        ? "demo@example.com"
        : "theo@example.com";

    const { user } = this.props

    this.socket.on('connect', async data => {
      this.setState({ sendSocket: this.socket.id })

      if( this.socket.id ) {
        
        this.props.assignSocket({ user: user, sendSocket: this.socket.id })

      }

    })

    if(this.props.user) {
      this.props.fetchSocket(socketToFetch);
    }

    const { userMatch } = this.props
    if( !this.state.synced && !!userMatch.socket ) {
      this.socket.emit('handshake', {
        sendSocket: this.socket.id,
        receiveSocket: userMatch.socket,
        targetId: userMatch.id
      })
    }

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

    if (this.props.initiator && this.state.receiveSocket ) {
      // debugger;
      this.initiateCall();

    }

    this.socket.on("receiveCall", (data) => {

      console.log('Receiving call')

      this.setState({
        callActive: true,
        receivingCall: true,
        hasPeer: true
      })

      this.receiveCall(data)

    })


    this.videoGridWidth = document.getElementById("video-grid").clientWidth;
    this.videoGridHeight = document.getElementById("video-grid").clientHeight;
  
  }

  receiveCall(data) {
    
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {

          this.userPeer = new Peer({
            initiator: this.props.initiator,
            stream: stream,
          });
          
          // debugger
          const receiveSocket = data.fromSocket
          const streamSource = new MediaStream(stream);
          this.userVideo = streamSource;
          
          this.stream = stream;

          const video = document.getElementById("user-video");
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }
          
          video.onloadedmetadata = (e) => {
            video.play();
          };
        

          this.userPeer.signal(data.signalData)

          const { user } = this.props;         
          this.userPeer.on("signal", (signal) => {
            // debugger
            this.socket.emit("acceptCall", {
              userToCall: receiveSocket,
              signalData: signal,
              from: user,
            });

          });

          // this.userPeer.on('connect', () => {
          //   debugger
          //   this.setState({connected: true})
          //   this.userPeer.send('connected')
          // })
          
          this.userPeer.on("stream", stream => {
            // debugger
            this.peerVideo = stream
            const peerVideo = document.getElementById('peer-video')
            if('srcObject' in peerVideo) {
              peerVideo.srcObject = stream
            } else {
              peerVideo.src = window.URL.createObjectURL(stream)
            }
          })

          // this.userPeer.on("data", (message) => {
          //   this.setState({
          //     messages: this.state.messages.concat(message),
          //   });

          //   if (this.props.userMatch.socket !== message.sendSocket) {
          //     this.setState({ receiveSocket: message.sendSocket });
          //   }

          //   this.chatNotificationSound().play();
          //   this.scrollToBottom();
          // });

        }).catch(err => console.log(err))
  }

  componentDidUpdate() {
    if( this.props.initiator && this.state.receiveSocket ) {
      this.initiateCall()
    }
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
    // if(this.state.connected) {
    //   this.userPeer.send(message);
    // }
    this.scrollToBottom();
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
      // debugger

      // debugger

      console.log(stream)
      const streamSource = new MediaStream(stream)
      this.userVideo = streamSource
      
      this.stream = stream
      const video = document.getElementById('user-video')
      if('srcObject' in video ) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }

      console.log(video)


      this.userPeer = new Peer({
        initiator: this.props.initiator,
        stream: stream,
      });

      const { user } = this.props;
      const { receiveSocket } = this.state;

      this.userPeer.on("signal", (signal) => {
        this.socket.emit("callUser", {
          userToCall: receiveSocket,
          signalData: signal,
          from: user,
          fromSocket: this.socket.id
        });
      });

      // this.userPeer.on("connect", () => {
      //   // debugger
      //   this.setState({connected: true})
      //   this.userPeer.send('Connected')
      // });

      this.socket.on('callAccepted', signal => {
        this.userPeer.signal(signal.signalData)
      })


      this.userPeer.on("stream", (stream) => {
        const peerVideo = document.getElementById("peer-video");
        if ("srcObject" in peerVideo) {
          peerVideo.srcObject = stream;
        } else {
          peerVideo.src = window.URL.createObjectURL(stream);
        }
      });

      this.userPeer.on("data", (message) => {
        debugger
        this.setState({
          messages: this.state.messages.concat(message),
        });

        if (this.props.userMatch.socket !== message.sendSocket) {
          this.setState({ receiveSocket: message.sendSocket });
        }

        this.chatNotificationSound().play();
        this.scrollToBottom();
      });

      
      
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
                {this.renderMessages()}
                <div
                  id='messages-end'
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