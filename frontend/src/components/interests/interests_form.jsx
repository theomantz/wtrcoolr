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

  addTopic(e, field){
    e.preventDefault()
    if (this.state[field].length < 3){
      let entry = [field.slice(0, field.length-1).concat('ToAdd')]
      let newItem = this.state[entry]
      let newState = this.state[field].concat(newItem)
      this.setState({
          [field]: newState,
          [entry]: ""
        })
      
    } else {
      //error handling
    }
  }

  render(){
    const interests = (
        <ul className="topics-list">
          <li>1: {this.state.interests[0]}</li>
          <li>2: {this.state.interests[1]}</li>
          <li>3: {this.state.interests[2]}</li>
        </ul>
    )

    const nonStarters = (
      <ul className="topics-list">
        <li>1: {this.state.nonStarters[0]}</li>
        <li>2: {this.state.nonStarters[1]}</li>
        <li>3: {this.state.nonStarters[2]}</li>
      </ul>

    )
    return(
    <div className="interests-form-container">
      <form className="interests-form">
        <h2>Share your topics of interest and get over the awkward silence a little faster...</h2>
          <div>
            <input 
              placeholder="Top 3 topics:" 
              type="text"
              value={this.state.interestToAdd}
              onChange={this.update('interestToAdd')}
              >
            </input>
            <button onClick={(e)=>this.addTopic(e, "interests")}>Add</button>
            <span>{this.props.errors.interests}</span>
          </div>
          {interests}
        <div>
          <input 
            placeholder="Let's stay away from:" 
            type="text"
            value={this.state.nonStarterToAdd}
            onChange={this.update('nonStarterToAdd')}
            >
          </input>
          <button onClick={(e)=>this.addTopic(e, "nonStarters")}>Add</button>
          <span>{this.props.errors.nonStarters}</span>
        </div>
        {nonStarters}
        <div className="submit-button">
          <input 
            type="submit" 
            onClick={this.handleSubmit}
            value='Get Started!'
          />
        </div>
      </form>
    </div>
    )
  }

}

export default InterestsForm