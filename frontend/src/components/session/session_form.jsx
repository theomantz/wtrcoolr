import React from 'react';
import './session_form.css'

class SessionForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: ''
    }

    if(this.props.formType === 'Sign up') {
      this.state.password2 = this.state.password2 || ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  update(field) {
    return (
      e => this.setState({
        [field]: e.currentTarget.value
      })
    )
  }

  demoLogIn(e) {
    e.preventDefault();
    try {
      this.props
        .demoLogin()
        .then((res) => {
          this.props.openModal("addInterests");
        });
    } catch (err) {
      console.log(err);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.formType === 'Sign up') {
      this.props.formAction({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      })
      .then((res) => {
        if (!res.isAxiosError){
          this.props.openModal("addInterests")
        }
      })
      .catch(() => {})
    } else if (this.props.formType === 'Log in') {
      this.props.formAction({
        email: this.state.email,
        password: this.state.password
      })
      .then((res) => {
        if (!res.isAxiosError){
          this.props.closeModal()
        }
      })
      .catch(() => {})
    }
  }

  render() {

    return (
      <div className="session-form-container">
        <form 
          onSubmit={this.handleSubmit}
          className="session-form">
          
          {this.props.formType === 'Sign up' ? 
            <div>
              <input 
                placeholder="Name" 
                type="text"
                value={this.state.name}
                onChange={this.update('name')}
                >
              </input>
              <span>{this.props.errors.name}</span>
            </div>
            : null

          }
          <div>
            <input 
              placeholder="Email" 
              type="text"
              value={this.state.email}
              onChange={this.update('email')}
              >
            </input>
            <span>{this.props.errors.email}</span>
          </div>
          
          <div>
            <input 
              placeholder="Password" 
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
              >
            </input>
            <span>{this.props.errors.password}</span>
          </div>


          { this.props.formType === 'Sign up' ? 
          <div>
            <input 
              placeholder="Password" 
              type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              >
            </input>
            <span>{this.props.errors.password2}</span>
          </div>
           : null }
         
          <input 
            type="submit" 
            value={this.props.formType}
            className='submit-button session-button'
            onClick={(e) => e.stopPropagation()}
          />
          <span className='session-demo-span'>Or</span>
          <button
            className='demo-user session-button'
            onClick={e => this.demoLogIn(e)}>Try it Out</button>
            {this.props.errors.demo}
        </form>
      </div>
    )
  }

}

export default SessionForm