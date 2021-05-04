import React from 'react'
import './interests_form.css'

class InterestsForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      interests: [],
      nonStarters: [],
      interestToAdd: '',
      nonStarterToAdd: '',
      currentUserId: this.props.currentUserId
    }

    this.update = this.update.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
    this.addTopic = this.addTopic.bind(this)
  }

  update(field) {
    return (
      e => this.setState({
        [field]: e.currentTarget.value
      })
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.updateUser({
      interests: this.state.interests,
      nonStarters: this.state.nonStarters,
      id: this.state.currentUserId
    })
    .then((res) => {
      if (!res.isAxiosError){
        this.props.closeModal()
      }
    })
    .catch(() => {})
  }

  addTopic (field){
    return event =>{
      event.stopPropagation();
      if (this.state[field].length < 3){
        let newItem = this.state[field.slice(0, field.length-1).concat('ToAdd')]
        let newField = this.state[field].concat(newItem)
        debugger
        return (
          e => this.setState({
            [field]: newField
            
          })
        )
      } else {
        // error handling
        // this.props.re
      }
      
    }
  }

  render(){

    const { interests, nonStarters } = this.state

    const interestsList = (
        <ul>
          { interests.map(interest => <li>{interest}</li> )}
        </ul>
    )

    const nonStartersList = (
      <ul>
        { nonStarters.map(nonStarter => <li>{nonStarter}</li> )}
      </ul>
    )

    return (
      <div className="interests-form-container">
        <form onSubmit={this.addTopic("interests")} className="interests-form">
          <h2>Get over that awkward silence a little faster...</h2>
          <div>
            <label>
              Interests:
              <input
                placeholder="What do you like to talk about?"
                type="text"
                value={this.state.interestToAdd}
                onChange={this.update("interestToAdd")}
              ></input>
              <span>{this.props.errors.interests}</span>
            </label>
            <input type="submit" value="Add" />
            {interestsList}
          </div>
        </form>
        <form onSubmit={this.addTopic("interests")} className="interests-form">
          <div>
            <label>
              Non-Starters:
              <input
                placeholder="Let's not talk about:"
                type="password"
                value={this.state.nonStarterToAdd}
                onChange={this.update("nonStarterToAdd")}
              ></input>
              <span>{this.props.errors.nonStarters}</span>
            </label>
            <input type="submit" value="Add" />
            {nonStartersList}
          </div>
        </form>
        <form
          className='interests-form'>
          <input
            type="submit"
            onClick={this.handleSubmit}
            value="Get Started!"
          />
        </form>
      </div>
    );
  }

}

export default InterestsForm