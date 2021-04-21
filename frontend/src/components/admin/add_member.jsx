import React from 'react';
import './add_member.css'

class CreateOrgForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(field) {
    return (
      e => {
        this.setState({[field]: e.currentTarget.value})
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    // this.props.formAction({
    //     name: this.state.name,
    //     public: publicbool,
    //     currentUser: this.props.currentUser
    //   })
    //   .then(() => {
        this.props.closeModal();
      //   })
      // .catch(() => {})
  }

  render() {

    return (
      <div className="add-member-container">
        <form 
          onSubmit={this.handleSubmit}
          className="add-member">
          
            <div>
              <input 
                placeholder="Email Address" 
                type="text"
                value={this.state.email}
                onChange={this.update('email')}
                >
              </input>
              <span>{this.props.errors.name}</span>
            </div>        
         
          <input 
            type="submit" 
            value={this.props.formType}
            onClick={(e) => e.stopPropagation()}
          />
          
        </form>
      </div>
    )
  }

}

export default CreateOrgForm