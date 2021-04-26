![wtcoolr logo](frontend/src/assets/wtrcoolr-logo.png)

`wtrcoolr` is the best MERN Stack video chatting app to help remote teams build bonds and socialize.

## Live Link:

[wtrcooler live](https://wtrcoolr.herokuapp.com/#/)

## Our Tech Stack:

`wtrcoolr` is a MERN stack app, meaning it is fully javascript from stem to stern. The rundown goes like this:

 - Backend:
   - Server: built on the Express framework and running on Node.js
   - Database: No-SQL MongoDB
 - Frontend:
   - React-Redux to provide SPA or single page app functionality
 - Integration:
   - API endpoints to pass data between Express server and React-Redux frontend.

## Feature Spotlight:

### 1 - Coolr Chat

Coolr chat uses Socket.IO and SimplePeer to implement web socket communication between two coworkers.

To begin the chat or `coolr`, two peers are matched and their websocket id's syncronized. This process begins on connection. Each user is assigned a socket id which is then sent to the database: 

<br></br>
```javascript
// ./frontend/src/components/coolr_video/coolr_video

const { user } = this.props
    this.socket.on('connect', data => {
      this.setState({ sendSocket: this.socket.id })
      if( this.socket.id ) {
        this.props.assignSocket({ user: user, sendSocket: this.socket.id })
        this.props.fetchSocket(socketToFetch);
      }
    })
```
<br></br>

Immediately after their socket id's are sent to the database, each user searches the database for their match through a purpose-built API route which returns a 400 error if the user being queried does not have a socket id assigned. Email is used for the query, as it has a uniqueness database constraint, however, user id would also be sufficient.

<br></br>

```javascript
// ./frontend/src/actions/users_actions

export const fetchSocket = email => dispatch => {
  return APIUsersUtil.fetchSocket(email)
    .then(user => dispatch(receiveUserSocket(user)))
    .catch(err => console.log(err))
}

// ./routes/api/users

router.get('/sockets/:email', (req, res) => {
  const email = req.params.email
  User.findOne({ email: email })
    .then(user => {
      const payload = { user: user.id, name: user.name, socket: user.socket, email: user.email }
      if( user.socket ) {
        res.status(200).json(payload)
      } else {
        res.status(400).json({error: 'User has no assigned socket'})
      }
    })
}) 
```
<br></br>

Once each user has their peer, a syncronization process is started. This process is to ensure that both users have the correct socket id's and user information. On a high level, users receive their peer and broadcast a 'handshake' to their peer's socket id. When each user receives a 'handshake' it checks the senders socket id against the socket id the user retreived from the server, reassigning the socket id if necessary. Once the reassignment is done, each user sends a 'synced' message to the other and communications can begin.

```javascript
// ./frontend/src/components/coolr_video/coolr_video

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

```

Once syncronized, users can chat with one another. As each user types a message, the message is saved to local state. 

```javascript
// ./frontend/src/components/coolr_video/coolr_video

handleChatChange = (e) => {
    this.setState({
      chatMessage: e.currentTarget.value,
    });
  };
```

Users can then press enter to submit a message as well as clicking the send button, this is acheived through a function that looks for the `enter` key through the React `onKeyPress` prop callback.

```javascript
// ./frontend/src/components/coolr_video/coolr_video

 handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.submitChatMessage(e);
    }
  };
```

When the above function is triggered it calls the submit chat message callback. The message object is then constructed and the message is sent through an emit call. The message is then picked up by the server and routed to the intended recipient. 

```javascript
// ./frontend/src/components/coolr_video/coolr_video

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
    this.scrollToBottom();
  };
```

The server routing function:

```javascript
// ./app

socket.on('sendChatMessage', msg => {
    console.log(`New Chat Message from ${msg.name} at socket: ${msg.sendSocket} to socket: ${msg.receiveSocket}`)
    console.log(msg)
    return io.to(msg.receiveSocket).emit('receiveChatMessage', msg)
  })
```

When each user receives a message, the message is added to local state and the senders socket id is again checked against the stored value. A chat notification sound is also played.

```javascript
// ./frontend/src/components/coolr_video/coolr_video

this.socket.on("receiveChatMessage", (message) => {
      this.setState({ messages: this.state.messages.concat(message) });
      if( this.props.userMatch.socket !== message.sendSocket ) {
        this.setState({ receiveSocket: message.sendSocket })
      }
      this.chatNotificationSound().play();
      this.scrollToBottom();
    });
```

The messages are rendered through a simple mapping function:

```javascript
// ./frontend/src/components/coolr_video/coolr_video

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
```

A scroll to bottom function is called as a callback in both the receive chat message and send chat message functions so that the user doesnt have to continually scroll down to read the most recent message.

```javascript
// ./frontend/src/components/coolr_video/coolr_video

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
```

<!-- Video chat function coming soon -->

### 2 - Dashboard

On Wtrcoolr's dashboard page, users can easily view and manage their organizations and schedule. 
This page gives users access to a list of their organizations, a schedule of their organizations' chat times or 'coolr hours' as we call them, and lists of both popular and trending organizations.

A list of a users organizations allows them to view all of the organizations that a they belong to and administrate. This list is updated in real time as a user join or leaves any organization.

If users administrate any organizations, an admin button next to that organization in the list will take them to an admin page.
On the admin page a user can manage their organization's users and coolr hours. 

The next dashboard feature is a schedule listing the user's next upcoming coolr hours and all user's weekly cooler hours.
Given that users could be widely spread across time zones, but calls need to occur synchronously, all the reoccuring times and weekdays of coolr hours are stored as a string in UTC time in MongoDB.
To render the coolr hours in a user's schedule, we built an algorithm that converts the weekday and time in UTC to the local weekday and time of the user's location. 

```javascript

// Simple algorithm to adjust weekly occuring weekday and time as a string from UTC to local time

export const fixToStr = (num) => {
  if (num < 10) {
    return "0" + num.toString()
  } else {
    return num.toString()
  }
}

export const applyUTCoffset = (str) => {

  const localTime = new Date();
  const offset = localTime.getTimezoneOffset();
  const offsetHours = offset / 60;
  const offsetMins = offset % 60;
  const strHours = parseInt(str[1] + str[2]);
  const strMins = parseInt(str[3] + str[4]);
  let adjHours = strHours - offsetHours;
  let adjMins = strMins - offsetMins;
  let adjDay = parseInt(str[0]);

  if (adjMins > 59) {
    adjMins = adjMins % 60;
    adjHours += 1;
  } else if (adjMins < 0) {
    adjMins = 60 - (Math.abs(adjMins));
    adjHours -= 1;
  }

  if (adjHours > 23) {
    adjHours = adjHours % 24;
    adjDay += 1;
  } else if (adjHours < 0) {
    adjHours = 24 - (Math.abs(adjHours));
    adjDay -= 1;
  }

  if (adjDay < 0) {
    adjDay = 6 - (Math.abs(adjDay));
  }

  const finalHours = fixToStr(adjHours)
  const finalMins = fixToStr(adjMins)

  const adjStr = `${adjDay}${finalHours}${finalMins}${str.slice(5)}`
  return adjStr
}

```
So that admins can easily set and update the coolr hours of their organizations on the admin page, we simply ran our algorithm in reverse.


```javascript

// Algorithm to ajdust weekly occuring weekday and time from local time to UTC time as a string


    const localTime = new Date();
    const offset = -1*localTime.getTimezoneOffset();
    const offsetHours = offset / 60;
    const offsetMins = offset % 60;
    const strHours = parseInt(str[1] + str[2]);
    const strMins = parseInt(str[3] + str[4]);
    let adjHours = strHours - offsetHours;
    let adjMins = strMins - offsetMins;
    let adjDay = parseInt(str[0]);
  
    if (adjMins > 59) {
      adjMins = adjMins % 60;
      adjHours += 1;
    } else if (adjMins < 0) {
      adjMins = 60 - (Math.abs(adjMins));
      adjHours -= 1;
    }
  
    if (adjHours > 23) {
      adjHours = adjHours % 24;
      adjDay += 1;
    } else if (adjHours < 0) {
      adjHours = 24 - (Math.abs(adjHours));
      adjDay -= 1;
    }
  
    if (adjDay < 0) {
      adjDay = 7 - (Math.abs(adjDay));
    }
  
  
    const fixToStr = (num) => {
      if (num < 10) {
        return "0" + num.toString()
      } else {
        return num.toString()
      }
    }
    const finalHours = fixToStr(adjHours)
    const finalMins = fixToStr(adjMins)
  
    const adjStr = `${adjDay}${finalHours}${finalMins}${str.slice(5)}`
    return adjStr
  }

```

A final dashboard feature allows users to explore popular and trending organizations. This is separated into two lists. The Most Popular section lists all the organizations with the highest member count. The trending section lists all the organizations with the largest member count percentage growth within the last 24 hours. To keep the list of trending organizations accurate, an algorithm in our Express server runs every 24 hours (using node-chron [node-chron](https://github.com/node-cron/node-cron) to set the frequency of occurence) to update the 'previousMembers' property of each organization document. On the front-end, we selectively list the organizations with the greatest daily growth relative to their respective 'previousMembers' property.

``` javascript

// Asynch function in Express server updating the organizations daily so that the top trending organizations can be shown

const cron = require('node-cron')

cron.schedule('0 0 0 * * *', function() {
  Org.find({}).then(orgs => {
      orgs.forEach((org) =>{
        let prev = (org.members.length)
        Org.findByIdAndUpdate(org.id, { $set: {"previousMembers": prev}})
          .exec()
    })
  })
})

``` 
