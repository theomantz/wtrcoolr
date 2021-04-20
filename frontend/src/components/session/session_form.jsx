import React from 'react';

class SessionForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: ''
    }
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
    if (this.props.formType === 'Sign up') {
      this.props.formAction({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    } else if (this.props.formType === 'Log in') {
      this.props.formAction({
        email: this.state.email,
        password: this.state.password
      })
    }
  }

  render() {

    return (
      <div className="session-form-container">
        <form 
          onSubmit={this.handleSubmit}
          className="session-form">
          
          {this.props.formType === 'Sign up' ? 

            <input 
              placeholder="Name" 
              type="text"
              value={this.state.name}
              onChange={this.update('name')}
              >
            </input>
          
            : null

          }

          <input 
            placeholder="Email" 
            type="text"
            value={this.state.email}
            onChange={this.update('email')}
            >
          </input>
          
          <input 
            placeholder="Password" 
            type="password"
            value={this.state.password}
            onChange={this.update('password')}
            >
          </input>
         
          <input type="submit" value={this.props.formType}/>
          
        </form>
      </div>
    )
  }

}

export default SessionForm