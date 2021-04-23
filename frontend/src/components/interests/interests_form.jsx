import React from 'react'
import './interests_form.css'

class InterestsForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      interests: "",
      nonStarters: "",
      currentUserId: this.props.currentUserId
    }

    this.update = this.update.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
  }

  update(field) {
    return (
      e => this.setState({
        [field]: [e.currentTarget.value]
      })
    )
  }

  handleSubmit(e) {
    debugger
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

  render(){
    return(
    <div className="interests-form-container">
      <form className="interests-form">
        <div>
          <label>Interests:
            <input 
              placeholder="What do you like to talk about?" 
              type="text"
              value={this.state.interests}
              onChange={this.update('interests')}
              >
            </input>
            <span>{this.props.errors.interests}</span>
          </label>
        </div>
        
        <div>
          <label>Non-Starters:
            <input 
              placeholder="Let's not talk about:" 
              type="password"
              value={this.state.nonStarters}
              onChange={this.update('nonStarters')}
              >
            </input>
            <span>{this.props.errors.nonStarters}</span>
          </label>
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