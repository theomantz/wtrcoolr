import React from 'react';
import './create_org_form.css'

class CreateOrgForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      public: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(field) {
    return (
      e => {
        console.log(e.currentTarget.value)
        this.setState({[field]: e.currentTarget.value})
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let publicbool = (this.state.public==='Public')
    this.props.formAction({
        name: this.state.name,
        public: publicbool,
        currentUser: this.props.currentUser
      })
      .then(() => {
        this.props.closeModal();
        this.props.history.push({pathname: '/dashboard'}) //change to org page
        })
      .catch(() => {})
  }

  render() {

    return (
      <div className="create-org_form-container">
        <form 
          onSubmit={this.handleSubmit}
          className="create-org_form">
          
            <div>
              <input 
                placeholder="Organization Name" 
                type="text"
                value={this.state.name}
                onChange={this.update('name')}
                >
              </input>
              <span>{this.props.errors.name}</span>
            </div>

          <div>
          <select onChange={this.update('public')}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
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