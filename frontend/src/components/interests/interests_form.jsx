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

  addTopic(field){
    debugger
    if (this.state[field].length < 3){
      let newItem = this.state[field.slice(0, field.length-1).concat('ToAdd')]
      console.log(newItem)
      console.log(this.state[field])
      console.log(this.state[field].push(newItem))
     
      return (
        e => this.setState({
          [field]: this.state[field].push(newItem)
        })
      )
    } else {
      // error handling
      // this.props.re
    }
  }

  render(){

    console.log(this.state.interests)

    const interests = (
        <ul>
          {
          this.state.interests.map(interest =>{
            <li>{interest}</li>
          })
          }
        </ul>
    )



    const nonStarters = (
      <ul>
        {
        this.state.nonStarters.map(nonStarter =>{
          <li>{nonStarter}</li>
        })
        }
      </ul>

    )
    return(
    <div className="interests-form-container">
      <form className="interests-form">
        <h2>Get over that awkward silence a little faster...</h2>
          <div>
            <label>Interests:
              <input 
                placeholder="What do you like to talk about?" 
                type="text"
                value={this.state.interestToAdd}
                onChange={this.update('interestToAdd')}
                >
              </input>
              <span>{this.props.errors.interests}</span>
              <button onClick={this.addTopic("interests")}>Add</button>
            </label>
            {interests}
          </div>
        
        <div>
          <label>Non-Starters:
            <input 
              placeholder="Let's not talk about:" 
              type="password"
              value={this.state.nonStarterToAdd}
              onChange={this.update('nonStarterToAdd')}
              >
            </input>
            <span>{this.props.errors.nonStarters}</span>
            <button onClick={this.addTopic("nonStarters")}>Add</button>
          </label>
          {nonStarters}
        </div>
          <input 
            type="submit" 
            onClick={this.handleSubmit}
            value='Get Started!'
          />
      </form>
    </div>
    )
  }

}

export default InterestsForm