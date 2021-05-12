import './coolr.css'
import React from 'react';
import { ReactComponent as WtrcoolrLogo } from "../../assets/SVG/HeaderText.svg";
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import Peer from 'simple-peer';
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
      connected: false,
      sendSocket: null,
      receiveSocket: null,
      callActive: false,
      receivingCall: false,
      userToCall: '',
      audioMuted: false,
      videoMuted: false,
      streamSource: null,
      synced: false,
    };

    this.userVideo = React.createRef();
    this.peerVideo = React.createRef();
    this.stream = React.createRef();
    this.userPeer = null;
    this.remotePeer = null;


    this.videoGridWidth = null;
    this.videoGridHeight = null;
    
    this.setState = this.setState.bind(this)
    this.handleMute = this.handleMute.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.endCall = this.endCall.bind(this);
    this.endCallButton = this.endCallButton.bind(this);

  }

  debug(c) {
    if(process.env.NODE_ENV !== 'production') {
      console.log(c)
    }
  }

  componentDidMount() {
    window.scrollTo(0,document.body.scrollHeight);

    let socketURL = "127.0.0.1:5000";

    if (process.env.NODE_ENV === "production") {
      socketURL =
        process.env.REACT_APP_SOCKET_URL || "https://wtrcoolr.herokuapp.com/";
    }
    
    this.socket = io(socketURL, { transports: ["websocket"] });
    
    this.debug(this.socket)

    const { 
      user, 
      initiator, 
      fetchSocket, 
      assignSocket,
      userMatch
    } = this.props

    this.socket.on('connect', data => {
      this.setState({ sendSocket: this.socket.id })
      this.debug('connecting')
      if( this.socket.id ) {
        
        assignSocket({ user: user, sendSocket: this.socket.id })

      }

    })

    if( userMatch && initiator ) {
      fetchSocket(userMatch)
    }


  
    if( initiator && this.props.userMatchObject ) {
      const { userMatchObject } = this.props
      this.debug('socket Object:')
      this.debug(this.socket.id)
      this.debug(`userMatchObject from props: ${userMatchObject}`)
      this.debug(userMatchObject)
      if( !this.state.synced && userMatchObject ) {
        this.debug(`sending handshake to ${userMatchObject}`)
        this.socket.emit('handshake', {
          sendSocket: this.socket.id,
          receiveSocket: userMatchObject.socket,
          targetId: userMatchObject.id
        })
      }
    }

    this.socket.on('handshake', data => {
      this.debug(`handshake received from ${data.sendSocket}`)
      
      this.setState( { receiveSocket: data.sendSocket } )

      this.debug('sending sync')

      
      this.socket.emit('sync', {
        to: this.state.receiveSocket,
        from: this.socket.id
      })
    })
  
    this.socket.on('sync', data => {
      
      this.debug('sync')
      this.setState({
        synced: true,
        receiveSocket: data.from
      })
    })

    if ( initiator && this.state.receiveSocket ) {
      
      this.debug(`initiating call with ${this.state.receiveSocket}`)
      
      this.initiateCall();

    }

    this.socket.on("receiveCall", (data) => {

      this.setState({
        callActive: true,
        receivingCall: true,
        hasPeer: true
      })

      this.receiveCall(data)

    })


    this.socket.on('callEnded', data => {
      this.userPeer.destroy()
      this.props.history.push('/')
    })


    this.videoGridWidth = document.getElementById("video-grid").clientWidth;
    this.videoGridHeight = document.getElementById("video-grid").clientHeight;
  
  }

  endCall() {
    /* Button to end calls using simple peer */
    if(this.userPeer) {
      this.userPeer.destroy()
    }
    
    this.socket.emit('callEnded', {
      to: this.state.receiveSocket
    })

    this.props.history.replace('/')
  }

  endCallButton() {
    return (
      <div
        className='call-end-button-container'>
        <button 
          onClick={e => this.endCall()} 
          id='call-end-button'
        >End Call</button>
      </div>
    )
  }

  receiveCall(data) {
    
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {

          this.userPeer = new Peer({
            initiator: this.props.initiator,
            stream: stream,
          });
          
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
            this.socket.emit("acceptCall", {
              userToCall: receiveSocket,
              signalData: signal,
              from: user,
            });

          });
          
          this.userPeer.on("stream", stream => {
            this.peerVideo = stream
            const peerVideo = document.getElementById('peer-video')
            if('srcObject' in peerVideo) {
              peerVideo.srcObject = stream
            } else {
              peerVideo.src = window.URL.createObjectURL(stream)
            }
          })

        }).catch(err => console.log(err))
  }

  componentDidUpdate() {
    if( this.props.initiator && this.state.receiveSocket ) {
      this.initiateCall()
    }
    const { userMatchObject } = this.props;
    if ( !this.state.synced && userMatchObject && !this.stream.current ) {
      this.socket.emit("handshake", {
        sendSocket: this.socket.id,
        receiveSocket: userMatchObject.socket,
        targetId: userMatchObject.user,
      });
    }
  }

  componentWillUnmount() {
    this.socket.off('connect');
    if( this.stream.current ) {
      this.stream.getTracks()
        .forEach(track => track.stop())
    }
    this.props.unpause()
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
      if('srcObject' in video ) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }



      this.userPeer = new Peer({
        initiator: this.props.initiator,
        trickle: false,
        config: {
          iceServers: [
            { url: "stun:stun01.sipphone.com" },
            { url: "stun:stun.ekiga.net" },
            { url: "stun:stun.fwdnet.net" },
            { url: "stun:stun.ideasip.com" },
            { url: "stun:stun.iptel.org" },
            { url: "stun:stun.rixtelecom.se" },
            { url: "stun:stun.schlund.de" },
            { url: "stun:stun.l.google.com:19302" },
            { url: "stun:stun1.l.google.com:19302" },
            { url: "stun:stun2.l.google.com:19302" },
            { url: "stun:stun3.l.google.com:19302" },
            { url: "stun:stun4.l.google.com:19302" },
            { url: "stun:stunserver.org" },
            { url: "stun:stun.softjoys.com" },
            { url: "stun:stun.voiparound.com" },
            { url: "stun:stun.voipbuster.com" },
            { url: "stun:stun.voipstunt.com" },
            { url: "stun:stun.voxgratia.org" },
            { url: "stun:stun.xten.com" },
            {
              url: "turn:numb.viagenie.ca",
              credential: "muazkh",
              username: "webrtc@live.com",
            },
            {
              url: "turn:192.158.29.39:3478?transport=udp",
              credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
              username: "28224511:1379330808",
            },
            {
              url: "turn:192.158.29.39:3478?transport=tcp",
              credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
              username: "28224511:1379330808",
            },
            {
              url: "turn:turn.bistri.com:80",
              credential: "homeo",
              username: "homeo",
            },
            {
              url: "turn:turn.anyfirewall.com:443?transport=tcp",
              credential: "webrtc",
              username: "webrtc",
            },
          ],
        },
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
    })
    .catch((err) => console.log(err));
  }

  renderPeerVideoScreen() {
    const { videoGridHeight, videoGridWidth } = this
    if(!videoGridWidth || !videoGridHeight) {
      return null
    }
    return (
      <Rnd
        style={style}
        default={{
          x: 8,
          y: 8,
          width: videoGridWidth,
          height: videoGridHeight,
        }}
      >
        <video id="peer-video" playsInline autoPlay />
      </Rnd>
    );
  }

  render() {
    return (
      <div className="coolr-call container">
        <div className="header">
          <div className="logo">
            <WtrcoolrLogo style={{height: '60px'}}/>
          </div>
        </div>
        <div className="video main">
          <div className="main-left">
            <div id="video-grid-container">
              <div id="video-grid">
                {this.renderPeerVideoScreen()}
                <Rnd
                  style={style}
                  default={{
                    x: 0,
                    y: 0,
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
            <div className="main-information-window">
              {this.endCallButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoolrVideo